module.exports = {
    name: 'addrole',
    run: async(client, message, args) => {
        if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send('You do not have permission to use this command.')

        const target = message.mentions.members.first()
        if(!target) return message.channel.send('No member specified.')
        const role = message.mentions.roles.first()
        if(!role) return message.channel.send('No role specified')

        await target.roles.add(role)
        message.channel.send(`${target.user.username} has recieved ${role} role.`)
    }
}