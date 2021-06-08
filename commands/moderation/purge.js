module.exports = {
    name: 'purge',
    aliases: ['clear'],
    run : async(client, message, args) => {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('You do not have the perms to use this command.')
        if(!args[0]) return message.channel.send('Please specify an amount to delete (1-100)')
        if(isNaN(args[0])) return message.channel.send('Please only state numbers.')
        if(parseInt(args[0]) > 99) return message.channel.send('The max amount of numbers you can delete is 100.')
        
            await message.channel.bulkDelete(parseInt(args[0]) + 1)
                .catch(err => console.log(err))
            message.channel.send(`Deleted ${args[0]} messages!`).then(m => m.delete({ timeout: 5000}))
    }
}