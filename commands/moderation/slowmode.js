const { Message, Client, MessageEmbed} = require('discord.js')
const ms = require('ms')

module.exports = {
    name: 'sm',

    run: async(client, message, args) => {
        if(!message.member.hasPermission('MANAGE_CHANNELS')) return 
        if(!args[0]) {
            message.channel.setRateLimitPerUser(0)
            return message.channel.send('The slowmode has been removed!')
        }

        const raw = args[0]
        const milliseconds = ms(raw)

        if(isNaN(milliseconds)) return message.reply('This is now a valid time')

        if(milliseconds < 1000) return message.reply('The minimum slowmode is 1 second.')

        message.channel.setRateLimitPerUser(milliseconds / 1000)
        message.channel.send(`
        The slowmode for this channel has been set to ${ms(milliseconds),{long: true}}`)
    }
}