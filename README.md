# HetrixStatus DiscordBot
![](https://repository-images.githubusercontent.com/559248481/d7387b39-4858-4784-aac1-2b3f1f379fa3)
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
![](https://i.ibb.co/0XB4xQY/configjsonen.png)

Where it is not contraindicated, you should fill in all fields at the first start.
Next, you should copy the id of the message that will be sent in the specified channel and paste it into the messageid field.
Finally, you need to fill in the ``chromepath`` field. *Tip: In your code folder, run the command: ``node -e "console.log(require('puppeteer').executablePath())"`` to get this path*.

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
![](https://i.ibb.co/Czmsfj5/configjsonfr.png)

Là où ce n'est pas contre-indiqué, vous devez remplir tous les champs dès le premier démarrage.
Ensuite, vous devez copier l'id du message qui sera envoyé dans le channel spécifié et le coller dans le champ ``messageid``.
Enfin, vous devez remplir le champ ``chromepath``. *Astuce : Dans le dossier de votre code, effectuez la commande : ``node -e "console.log(require('puppeteer').executablePath())"`` pour obtenir ce chemin d'accès*.

Et voilà, c'est enfin fini !

Pour toutes demandes supplémentaire, ouvrez une issue.
