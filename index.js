//IMPORT

const { servicename, hetrixlink, token, guildid, channelid, messageid, chromepath, lang, autokiller, updateinterval } = require('./config.json');
const { Client, GatewayIntentBits, EmbedBuilder, DiscordAPIError } = require('discord.js');
const puppeteer = require('puppeteer-extra');

//LANGUAGE STRINGS
if(lang==="fr"){
    statusembeddesc="__Légende :__\n<:UP:1036089511064653854> Serveur en ligne\n<:MAINTENANCE:1036089510032838706>: Server en maintenance\n<:DOWN:1036089508187349073>: Serveur hors ligne"
    initembeddesc="Salut ! Je viens juste de remarquer que vous n'avez pas configuré l'id du message dans le fichier de configuration. Vous devez donc copier l'id de ce message et le coller dans la config."
    messagedeleted="Euh... Vous venez de supprimer le message de statut :C. Je vais donc m'arrêter de force pour que vous puissiez me reconfigurer ;)"
}
else if(lang==="en"){
    statusembeddesc="__Legend:__\n<:UP:1036089511064653854>: Server is up\n<:MAINTENANCE:1036089510032838706>: Server is on maintenance\n<:DOWN:1036089508187349073>: Server is down"
    initembeddesc="Hi! I just noticed that you have not set the message id in the configuration file. So I'm sending this message for you to copy the id of the message and paste it into the config."
    messagedeleted="Huuum... You deleted my status message :C. So I'm going to force myself to stop so that you can reconfigure me ;)"
}

//UPDATE FUNCTION
async function updatestatus(){
    console.log("I'm updating the embed :)")
    statusname=servicename+" Status"
    await hetrixscreen();
    await new Promise(resolve => setTimeout(resolve, 5000))
    statusembed = new EmbedBuilder()
        .setColor(0x555555)
        .setTitle(statusname)
        .setURL(hetrixlink)
        .setAuthor({ name: statusname, iconURL: client.guilds.cache.get(guildid).iconURL({ dynamic: true }), url: hetrixlink })
        .setDescription(statusembeddesc)    
        .setImage('attachment://screen.png')
        .setTimestamp()
    client.channels.cache.get(channelid).messages.fetch(messageid).then(msg => msg.edit({ embeds: [statusembed], files: ['./screen.png'] }))
}

//FUNCTION THAT TAKE A SCREEN OF HETRIX PAGE
async function hetrixscreen(){

    try {
        puppeteer.launch({ headless: true, executablePath: chromepath}).then(async browser => {
            const page = await browser.newPage()
            await page.setViewport({ width: 1280, height: 720 })
        
            console.log(`Getting a screen...`)
            await page.goto(hetrixlink)
            await page.waitForTimeout(2500)
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
    //MESSAGE ID INIT
    if (messageid===""){
        console.log("You don't set the message id... I send an init embed in the provided channel ;)")
        statusname=servicename+" Status"
        await new Promise(resolve => setTimeout(resolve, 3000))
        const initembed = new EmbedBuilder()
            .setColor(0x555555)
            .setTitle(statusname)
            .setURL(hetrixlink)
            .setAuthor({ name: statusname, iconURL: client.guilds.cache.get(guildid).iconURL({ dynamic: true }), url: hetrixlink })
            .setDescription(initembeddesc)
            await client.channels.cache.get(channelid).send({ embeds: [initembed] });
        console.log("You have to restart the bot if you have updated the config.json file.")
    }
    else if (messageid!==""){
        //FIRST RUN
        await updatestatus()
        //INFINITE RUN
        var statustask = setInterval (async function () {
            await updatestatus()
        }, updateinterval * 1000);
    }
});


//AUTO-KILLER

client.on("messageDelete", async (message) => {
    if (message.id === messageid) {
        if (autokiller === true) {
            await client.channels.cache.get(channelid).send(messagedeleted)
            await new Promise(resolve => setTimeout(resolve, 1500))
            client.destroy()
            console.log("Rest in peace, little bot...")
        } 
    }
})

//LOGIN
client.login(token);
