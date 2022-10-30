# HetrixStatus DiscordBot
## **🇬🇧** English:
### This Discord bot allows you to get a better embed than the one offered by the official HetrixTools webhook. It first takes a screenshot of your status page with Puppeteer and then sends it in an embed.
**Dependencies:**
* discord.js (14.6.0)
* puppeteer (19.2.0)
* puppeteer-core (19.2.0)
* puppeteer-extra (3.3.4)

**Use:**
Configuration :
The configuration is in the form:
```json
{
"servicename:"", //The name of your service
"hetrixlink":"", //The link to your HetrixTools status page

"token": "", //The token of your bot
"guildid": "", //The id of the server where the message will be sent
"channelid": "", //The id of the channel where the message will be sent
"messageid": "", //(To be filled in the second startup)

"chromepath": "", //(To be filled in at second startup)

"lang": "en", //The language of the bot (fr or en)
"updateinterval": 120, //The update interval of the message (in seconds)
"autokiller": true //Anti-crash security option
}
```
Where it is not contraindicated, you should fill in all fields at the first start.
Next, you should copy the id of the message that will be sent in the specified channel and paste it into the messageid field.
Finally, you need to fill in the ``chromepath'' field. *Tip: In your code folder, run the command: ``node -e "console.log(require('puppeteer').executablePath())"`` to get this path*.

And that's it!
For any further requests, open an issue.

## **🇫🇷** Français :
### Ce bot Discord vous permet de générer un meilleur embed que celui proposé par le webhook officiel d'HetrixTools. Il récupère tout d'abord une capture d'écran de votre page de statut grâce à Puppeteer puis l'envoie dans un embed.

**Dépendances :**
* discord.js (14.6.0)
* puppeteer (19.2.0)
* puppeteer-core (19.2.0)
* puppeteer-extra (3.3.4)

**Utilisation :**
Configuration :
La configuration se présente sous la forme :
```json
{
"servicename":"", //Le nom de votre service
"hetrixlink":"", //Le lien de votre page de statut HetrixTools

"token": "", //Le token de votre bot
"guildid": "", //L'id du serveur où le message sera envoyé
"channelid": "", //L'id du salon où le message sera envoyé
"messageid": "", //(A remplir au second démarrage)

"chromepath": "", //(A remplir au second démarrage)

"lang": "en", //La langue du bot (fr ou en)
"updateinterval": 120, //L'intervalle de mise à jour du message (en secondes)
"autokiller": true //Option de sécurité "anti-crash"
}
```
Là où ce n'est pas contre-indiqué, vous devez remplir tous les champs dès le premier démarrage.
Ensuite, vous devez copier l'id du message qui sera envoyé dans le channel spécifié et le coller dans le champ ``messageid``.
Enfin, vous devez remplir le champ ``chromepath``. *Astuce : Dans le dossier de votre code, effectuez la commande : ``node -e "console.log(require('puppeteer').executablePath())"`` pour obtenir ce chemin d'accès*.

Et voilà, c'est enfin fini !

Pour toutes demandes supplémentaire, ouvrez une issue.
