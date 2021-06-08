const { Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
	name: 'create',

	run: async(client, message, args) => {
		if(!message.member.permissions.has('MANAGE_CHANNELS')) return message.channel.send('You do not have permission to use this command.')

		const channelNameQuery = args.join(" ")
		if(!channelNameQuery) return message.reply('Please specify a channel name next time.')

		message.guild.channels.create(channelNameQuery).then((ch) => {
			message.channel.send(`Click ${ch} to look at the new created channel.`)
		})
	}
}