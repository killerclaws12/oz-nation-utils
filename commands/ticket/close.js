const { Message, Client, MessageAttachment } = require('discord.js')
const fs = require('fs')

module.exports = {
	name: 'close',

	run: async(client, message) => {
		if(message.channel.parentID !== '850565772387549204') return message.reply('You can only use this command if you are in a ticket.')
		const transcriptChannel = message.guild.channels.cache.get('843649559837147147')
		message.channel.send('Deleting in 5 seconds.')
		setTimeout(() => {
			message.channel.delete().then(async ch => {
				client.ticketTranscipt.findOne({ Channel : ch.id}, async(err, data) => {
					if(err) throw err
					if(data) {
						fs.writeFileSync(`../${ch.id}.txt`, data.Content.join("\n\n"))
						transcriptChannel.send(`${message.guild.members.cache.get(ch.name).user.username}'s ticket has been closed.`)
						await transcriptChannel.send(new MessageAttachment(fs.createReadStream(`../${ch.id}.txt`)))
						client.ticketTranscipt.findOneAndDelete({ Channel: ch.id})
					}
				})
			})
		}, 5000)
	}
}