const client = require('../index')

client.on('ready', () => {
    console.log(`${client.user.username} has logged in and now is working!`)

    const arrayOfStatus = [
        `${client.users.cache.size} users!`,
        `${client.user.tag} bot!`,
        `.ticket to open up a ticket for support`,
        `Developed by Mr.Claws#0103`
    ]

    let index = 0
    setInterval(() => {
        if(index === arrayOfStatus.length) index = 0
            const status = arrayOfStatus[index]
            console.log(status)
            client.user.setActivity(status)
            index++
    }, 5000)
})