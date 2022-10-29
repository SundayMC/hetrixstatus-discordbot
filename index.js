// node -e "console.log(require('puppeteer').executablePath())"

const { servicename, hetrixlink, token, guildid, channelid, messageid, chromepath } = require('./config.json');
const { Client, GatewayIntentBits, EmbedBuilder, DiscordAPIError } = require('discord.js');
const puppeteer = require('puppeteer-extra');

async function updatestatus(){
    console.log("I'm updating the embed :)")
    statusname=servicename+" Status"
    await hetrixscreen();
    statusembed = new EmbedBuilder()
        .setColor(0x555555)
        .setTitle(statusname)
        .setURL(hetrixlink)
        .setAuthor({ name: statusname, iconURL: client.guilds.cache.get(guildid).iconURL({ dynamic: true }), url: hetrixlink })
        .setDescription("<:UP:1035626450327453716>: Server is up / <:MAINTENANCE:1035626448536485928>: Server is on maintenance / <:DOWN:1035626447269797908>: Server is down")    
        .setImage('attachment://screen.png')
        .setTimestamp()
    client.channels.cache.get(channelid).messages.fetch(messageid).then(msg => msg.edit({ embeds: [statusembed], files: ['./screen.png'] }))
    console.log("Done!")
}

async function hetrixscreen(){

    try {
        puppeteer.launch({ headless: true, executablePath: chromepath}).then(async browser => {
            const page = await browser.newPage()
            await page.setViewport({ width: 1280, height: 720 })
        
            console.log(`Getting a screen...`)
            await page.goto(hetrixlink)
            await page.waitForTimeout(3000)
            await page.screenshot({ path: 'screen.png', fullPage: true })
        
            await browser.close()

            console.log("Done!")
        })
        
    }

    catch {
        console.log("Your hetrix status page link is incorrect...")
    }

}

const client = new Client({ intents: [GatewayIntentBits.AutoModerationConfiguration, GatewayIntentBits.AutoModerationExecution, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildBans, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildScheduledEvents, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent] });

client.on("ready", async () => {
    console.log("Bot is up!")
    if (messageid===""){
        console.log("You don't set the message id... I send an init embed in the provided channel ;)")
        statusname=servicename+" Status"
        await new Promise(resolve => setTimeout(resolve, 3000))
        const initembed = new EmbedBuilder()
            .setColor(0x555555)
            .setTitle(statusname)
            .setURL(hetrixlink)
            .setAuthor({ name: statusname, iconURL: client.guilds.cache.get(guildid).iconURL({ dynamic: true }), url: hetrixlink })
            .setDescription("Hi! I just noticed that you have not set the message id in the configuration file. So I'm sending this message for you to copy the id of the message and paste it into the config.")
            await client.channels.cache.get(channelid).send({ embeds: [initembed] });
        console.log("You have to restart the bot if you have updated the config.json file.")
    }
    else if (messageid!==""){
        await updatestatus()
        var statustask = setInterval (async function () {
            await updatestatus()
        }, 120 * 1000);
    }
});

client.on("messageDelete", async (message) => {
    if (message.id === messageid) {
        await client.channels.cache.get(channelid).send("Huuum... You deleted my status message :C. So I'm going to force myself to stop so that you can reconfigure me")
        await new Promise(resolve => setTimeout(resolve, 1500))
        client.destroy()
        console.log("Rest in peace, little bot...")
    }
})

client.login(token);