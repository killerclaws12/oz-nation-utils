const Discord = require('discord.js')
const ms = require('ms')

module.exports = {
	name: 'mute',
	run : async(client, message, args) => {
		if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('You do not have permission to use this command.')
			const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
			const time = args[1]
			if(!Member) return message.channel.send('No member stated.')
			

				const role = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'muted')
			if(!role) {
				try {
					message.channel.send('Muted role is not found in the server so I will make one for you.')

					let muterole = await message.guild.roles.create({
						data: {
							name: 'muted',
							permissions: []
						}
					})
					message.guild.channels.cache.filter(c => c.type === 'text').forEach(async (channel, id) => {
						await channel.createOverwrite(muterole, {
							SEND_MESSAGES: false,
							ADD_REACTIONS: false,
						})
					})
					message.channel.send('Mute role has sucessfully been created with the right permissions.')
				} catch(error) {	
					console.log(error)
				}
			}
			let role2 = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted')
			if(Member.roles.cache.has(role2.id)) return message.channel.send(`${Member.displayName} has already been muted.`)
				await Member.roles.add(role2)
			message.channel.send(`${Member.displayName} is now muted.`)

			message.delete()
	 }
}
