const {Collection, Client, Discord} = require('discord.js')
const fs = require('fs')
const client = new Client({
    disableEveryone: true
})
const mongoose = require('mongoose')

mongoose.connect('mongodbmongodb+srv://admin:admin@cluster0.qro2b.mongodb.net/Data', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then(console.log('Connected to the Database successfully!'))

// Schema

client.ticketTranscipt = mongoose.model('trasnscripts',
    new mongoose.Schema({
        Channel: String,
        Content: Array
    })
)


const config = require('./config.json')
const prefix = config.prefix
const token = config.token
const { GiveawaysManager } = require('discord-giveaways')
client.ticketCategory =  '850565772387549204'
client.commands = new Collection();
client.aliases = new Collection();
client.giveaways = new GiveawaysManager(client, {
    storage : './giveaway.json',
    updateCountdownEvery: 5000,
    embedColor: '#FF0000',
    reaction: '🎉'
})
module.exports = client
client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
}); 
client.on('ready', () => {
    const arrayOfStatus = [
        `with code`,
        `${client.user.tag} bot!`,
        `.ticket to open up a ticket for support`,
        `Developed by Mr.Claws#0103`,
        `with the gang`
    ]

    let index = 0
    setInterval(() => {
        if(index === arrayOfStatus.length) index = 0
            const status = arrayOfStatus[index]
            console.log(status)
            client.user.setActivity(status)
            index++
    }, 5000)
    console.log(`${client.user.username} ✅`)
})
client.on('message', async message =>{
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;
    if(!message.guild) return;
    if(!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd.length == 0 ) return;
    let command = client.commands.get(cmd)
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    if(command) command.run(client, message, args) 
})

client.on('message', async(message) => {
    if(message.channel.parentID !== '850565772387549204') return
    client.ticketTranscipt.findOne({ Channel : message.channel.id}, async(err, data) => {
        if(err) throw error
            if(data) {
                console.log('There is data.')
                data.Content.push(`${message.author.tag} : ${message.content}`)
            } else {
                console.log('There is no data')
                data = new client.ticketTranscipt({ Channel : message.channel.id, Content: `${message.author.tag} : ${message.content}`})
            }
            await data.save()
            .catch(err => console.log(err))
            console.log('Data is now saved.')
    })
})

client.login(token)
