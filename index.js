const mineflayer = require('mineflayer');
const mineflayerViewer = require('prismarine-viewer').mineflayer

const bot = mineflayer.createBot({
    host: '78.47.210.89',
    port: 25577,
    version: '1.12.2',
    username: 'IJustFortiLive2',
})

bot.once('spawn', () => {
    bot.chat('Привет мир!')
    bot.loadPlugin(require("mineflayer-autoclicker"))

    mineflayerViewer(bot, {
        port: 3007,
        firstPerson: false,
        viewDistance: '5'
    })
})

bot.on('chat', (username, message) => {
    console.log(username + " " + message)
})

bot.on('chat', async (username, message) => {
    // if (username !== bot.username) return
    if (message.includes('sleep')) {
        const bed = bot.findBlock({
            matching: block => {
                return bot.isABed(block)
            }
        })

        if (bed) {
            try {
                await bot.sleep(bed)
            } catch (e) {
                console.log(e.message)
            }
        } else {
            bot.chat('Поблизости нет кровати')
        }
    } else if (message.includes('wakeup')) {
        await bot.wake()
    }
})

bot.on('chat', (username, message) => {
    if (message.includes('leave')) {
        bot.quit()
    }
})

bot.on('chat', async (username, message) => {
    if (message.includes('drop')) {
        for (const item of bot.inventory.items()) {
            await bot.tossStack(item)
        }
    }
})

bot.on('chat', async (username, message) => {
    if (message.includes('startclicker')) {
        bot.autoclicker.start()
    } else if (message.includes('stopclicker')) {
        bot.autoclicker.stop()
    }

})
