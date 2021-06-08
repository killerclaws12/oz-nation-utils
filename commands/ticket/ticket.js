const { Client, Message } = require('discord.js')

module.exports = {
	name: 'ticket',

	run: async(client, message) => {
		const ch = message.guild.channels.cache.find(ch => ch.name === message.author.id)
		if(ch) return message.channel.send('You already have a ticket opened at this time!')
		message.guild.channels.create(`${message.author.id}`, {
			type: 'text',
			parent: '850565772387549204',
			permissionOverwrites: [
			{
				id: message.guild.id,
				deny: ['VIEW_CHANNEL']
			},
			{
				id: message.author.id,
				allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ADD_REACTIONS', 'ATTACH_FILES']
			}
			]
		}).then(async channel => {
			message.reply(`Click <#${channel.id}> to view your ticket that you have made.`)
			channel.send(`${message.author}, welcome to your ticket. One of the <@787102353031168041> members will contact you shortly.`)
		})
		message.delete()
	}
}