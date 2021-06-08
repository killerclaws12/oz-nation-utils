const { Client, Message, MessageEmbed} = require('discord.js')
const { inspect } = require('util')
module.exports ={
    name: "eval",
    run: async(client, message, args) => {
        if(message.author.id !== '620708924093628436') return

        const code = args.join(" ")
        if(!code) return message.reply('Please provide some code to eval.')

        try {
            const result = await eval(code)
            let output = result
            if(typeof result !== 'string') {
                output = inspect(result)
            }

            message.channel.send(output, {code: 'js'})
        } catch (err) {
            console.log(error)
            message.channel.send('Contact the dev now because this is a error.')
        }
    }
}