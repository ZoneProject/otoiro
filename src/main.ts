const {
  Message,
  Client,
  Events,
  GatewayIntentBits,
  EmbedBuilder,
  BaseInteraction,
} = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();
const fs = require("fs");

const client: typeof Client = new Client({
  intents: Object.values(GatewayIntentBits).filter(
    (v): v is number => typeof v === "number"
  ),
});

client.once(Events.ClientReady, (client: typeof Client) => {
  console.log(`Ready! Logged in as ${client.user?.tag}`);
});

client.on(Events.MessageCreate, async (message: typeof Message) => {
  if (message.author.bot) {
    return;
  }
  if (message.content.startsWith("!")) {
    await message.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("Sorry...")
          .setDescription(
            "The traditional message commands has done it's service.\nPlease use 'Slash Commands' --the Discord's official command functions-- instead.\nThank you for your cooperation."
          )
          .setColor("#2f3136"),
      ],
    });
    return;
  }
});

client.on(
  Events.InteractionCreate,
  async (interaction: typeof BaseInteraction) => {
    if (interaction.channel?.type == "DM") {
      await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("Sorry...")
            .setDescription("you can't use commands at DM.")
            .setColor("#2f3136"),
        ],
      });
    }
  }
);

client.login(process.env.DISCORD_TOKEN);

