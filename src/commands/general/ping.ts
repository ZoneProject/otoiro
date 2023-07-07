import { BaseInteraction } from "discord.js";

const { SlashCommandBuilder } = require("@discordjs/builders");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Ping値を測定"),

  async execute(
    interaction: {
      createdTimestamp: number;
      reply: (arg0: {
        //ping送信
        embeds: any[];
        components: any[];
      }) => any;
    },
    client: typeof Client
  ) {
    const apiPing = Date.now() - interaction.createdTimestamp; //ping取得
    await interaction.reply({
      //ping送信
      embeds: [
        new EmbedBuilder()
          .setTitle(":ping_pong:Pong!")
          .setDescription("Ping値を表示します。")
          .addFields(
            {
              name: ":electric_plug:WebSocket Ping",
              value: "`" + client.ws.ping + "ms`",
            },
            {
              name: ":yarn:API Endpoint Ping",
              value: "`" + apiPing + "ms`",
            }
          )
          .setColor("#2f3136")
          .setTimestamp(),
      ],
      components: [
        //コマンド削除ボタン
        new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setLabel("🗑️削除")
            .setStyle(ButtonStyle.Danger)
            .setCustomId("delete")
        ),
      ],
    });
  },
};
