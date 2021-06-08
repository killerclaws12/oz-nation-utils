const { Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
	name: 'announce',

	run: async(client, message, args) => {
		if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply('You do not have the permission to use this command.')

			let mention

			if(!args.length) return message.channel.send('.announce <#channel> <message> <ping>')

			const channel = message.mentions.channels.first()
			if(!channel) return message.channel.send('Please state a channel to send the message to.')

			if(!args[1]) return message.reply('Please specify a message to announce.')

				if(args.some((val) => val.toLowerCase() === '.ping')) {
					for (let i = 0; i < args.length; i++) {
						if(args[1].toLowercase() === '.ping') args.splice(i, 1)
					
				}
			mention = true 
	} else mention = false

	if(mention === true) channel.send('@everyone')

		channel.send(
			new MessageEmbed()
			.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
			.setDescription(args.join(" "))
			.setTimestamp()
			.setColor("GREEN")
			)
	message.delete()
	}
}