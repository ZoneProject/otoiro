import { Message, Client, Events, GatewayIntentBits } from 'discord.js'

import dotenv from 'dotenv'
dotenv.config();

const client:Client = new Client({
    intents: Object.values(GatewayIntentBits).reduce((a, b) => a | b)//GatewayIntents全定義
});

client.once(Events.ClientReady, (c: Client) => {
    console.log(`Ready! Logged in as ${c.user?.tag}`);
});

client.on(Events.MessageCreate, async (message: Message) => {
    if (message.author.bot) {
        return;
    }

    if (message.content.startsWith('!ping')) {
        message.reply('Pong!');
    }
});

client.login(process.env.TOKEN);