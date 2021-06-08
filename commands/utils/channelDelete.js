const { Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
	name: 'delete',

	run: async(client, message, args) => {
		if(!message.member.permissions.has('MANAGE_CHANNELS')) return message.channel.send('You do not have permission to use this command.')

		const channelTarget = message.mentions.channels.first() || message.channel

	channelTarget.delete()
	.then(ch => {
		message.author.send(`Channel has been deleted!`)
	})
	}
}