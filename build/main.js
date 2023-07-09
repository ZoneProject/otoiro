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
const { Message, Client, Events, GatewayIntentBits, EmbedBuilder, BaseInteraction, } = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();
const fs = require("fs");
const client = new Client({
    intents: Object.values(GatewayIntentBits).filter((v) => typeof v === "number"),
});
client.once(Events.ClientReady, (client) => {
    var _a;
    console.log(`Ready! Logged in as ${(_a = client.user) === null || _a === void 0 ? void 0 : _a.tag}`);
});
client.on(Events.MessageCreate, (message) => __awaiter(void 0, void 0, void 0, function* () {
    if (message.author.bot) {
        return;
    }
    if (message.content.startsWith("!")) {
        yield message.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle("Sorry...")
                    .setDescription("The traditional message commands has done it's service.\nPlease use 'Slash Commands' --the Discord's official command functions-- instead.\nThank you for your cooperation.")
                    .setColor("#2f3136"),
            ],
        });
        return;
    }
}));
client.on(Events.InteractionCreate, (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (((_a = interaction.channel) === null || _a === void 0 ? void 0 : _a.type) == "DM") {
        yield interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle("Sorry...")
                    .setDescription("you can't use commands at DM.")
                    .setColor("#2f3136"),
            ],
        });
    }
}));
client.login(process.env.DISCORD_TOKEN);
