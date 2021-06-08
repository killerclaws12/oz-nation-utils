module.exports = {
    name: 'reset',
    run : async(client, message, args) => {
        if(!message.member.hasPermission("MANAGE_NICKNAMES")) return message.channel.send('You do not have permission to use this command.')
    if(!message.guild.me.hasPermission("MANAGE_NICKNAMES")) return message.channel.send('I do not have the permission to execute this cmd.')
        const member = message.mentions.members.first();

        if(!member) return message.reply('Please specify a member!')



        try {
            member.setNickname(null)
        } catch (err) {
            message.reply('I do not have permission to reset ' + member.toString() + " nickname!")
        }
    }
}