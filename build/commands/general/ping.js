"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const { SlashCommandBuilder } = require("@discordjs/builders");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Ping値を測定"),
    execute(interaction, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const apiPing = Date.now() - interaction.createdTimestamp; //ping取得
            yield interaction.reply({
                //ping送信
                embeds: [
                    new EmbedBuilder()
                        .setTitle(":ping_pong:Pong!")
                        .setDescription("Ping値を表示します。")
                        .addFields({
                        name: ":electric_plug:WebSocket Ping",
                        value: "`" + client.ws.ping + "ms`",
                    }, {
                        name: ":yarn:API Endpoint Ping",
                        value: "`" + apiPing + "ms`",
                    })
                        .setColor("#2f3136")
                        .setTimestamp(),
                ],
                components: [
                    //コマンド削除ボタン
                    new ActionRowBuilder().addComponents(new ButtonBuilder()
                        .setLabel("🗑️削除")
                        .setStyle(ButtonStyle.Danger)
                        .setCustomId("delete")),
                ],
            });
        });
    },
};
