import { Message, Client, Events, GatewayIntentBits } from 'discord.js'

import dotenv from 'dotenv'
dotenv.config();

const client:Client = new Client({
  intents: Object.values(GatewayIntentBits).filter((v): v is number => typeof v === 'number'),
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

client.login(process.env.DISCORD_TOKEN);
