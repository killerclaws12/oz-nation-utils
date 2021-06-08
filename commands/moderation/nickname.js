module.exports = {
    name: 'nick',
    run : async(client, message, args) => {
        if(!message.member.hasPermission("MANAGE_NICKNAMES")) return message.channel.send('You do not have permission to use this command.')
    if(!message.guild.me.hasPermission("MANAGE_NICKNAMES")) return message.channel.send('I do not have the permission to execute this cmd.')
        const member = message.mentions.members.first();

        if(!member) return message.reply('Please specify a member!')

        const arguments = args.slice(1).join(" ")

        if(!arguments) return message.reply('Please specify a nickname!')

        try {
            member.setNickname(arguments)
        } catch (err) {
            message.reply('I do not have permission to set ' + member.toString() + " nickname!")
        }
    }
}