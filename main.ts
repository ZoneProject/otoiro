import { Message, Client, Events, GatewayIntentBits, EmbedBuilder } from 'discord.js'

import dotenv from 'dotenv'
dotenv.config();

const client:Client = new Client({
  intents: Object.values(GatewayIntentBits).filter((v): v is number => typeof v === 'number'),
});

client.once(Events.ClientReady, (client: Client) => {
    console.log(`Ready! Logged in as ${client.user?.tag}`);
});

client.on(Events.MessageCreate, async (message: Message) => {
    if (message.author.bot) {
        return;
    }

    if (message.content.startsWith('!')) {
        message.reply({
            embeds: [
                new EmbedBuilder()
                .setTitle("Sorry...")
                .setDescription("The traditional message commands has done it's service.\nPlease use 'Slash Commands' --the Discord's official command functions-- instead.\nThank you for your cooperation.")
                .setColor("#2f3136")
            ]
        })
        return;
    }
});

client.on(Events.InteractionCreate, async (interaction:/*ここの型定義どうすればええんや*/) => {
    if (interaction.channel?.type == "DM"){
        interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setTitle("Sorry...")
                .setDescription("you can't use commands at DM.")
                .setColor("#2f3136")
            ]
        })
    }
})

client.login(process.env.DISCORD_TOKEN);
