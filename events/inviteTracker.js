const client = require('../index.js')

const { promisify } = require('util')

const wait = promisify(setTimeout)

let invites

const id = '752408753160323114'

client.on('ready' async() => {
	await wait(2000)

	client.guilds.cache.get(id).fetchInvites().then(inv => {
		invites = inv
	})
})

client.on('guildMemberAdd', async(member) => {
	if(member.guild.id !== id) return

		member.guild.fetchInvites().then(gInvites => {
			const invite = gInvites.find((inv) => invites.get(inv.code).uses < inv.uses)

			const channel = member.guild.channels.cache.get('825114962514935878')

			channel.send(`${member} was invited by ${invite.invter} and the invite code was ${invite.code}`)
		})
})