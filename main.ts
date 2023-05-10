import { createBot, Intents, startBot, CreateSlashApplicationCommand, InteractionResponseTypes } from "./deps.ts"
import { Secret } from "./secret.ts"

const bot = createBot({
    token: Secret.DISCORD_TOKEN,
    intents: Intents.Guilds | Intents.GuildMessages | Intents.MessageContent,
    events: {
        ready: (_bot, payload) => {
            console.log(`${payload.user.username} is ready!`)
        },
    },
})

const commandArray: CreateSlashApplicationCommand = [
    {
        name: "neko",
        description: "にゃーんと返します"
    },
    {
        name: "ping",
        description: "Ping値を返します"
    }
]

await bot.helpers.upsertGlobalApplicationCommands(commandArray)

bot.events.messageCreate = (b, message) => {
    if (message.content === "!neko") {
        b.helpers.sendMessage(message.channelId, {
            content: "にゃーん",
        })
    }
}

bot.events.interactionCreate = (b, interaction) => {
    switch (interaction.data?.name) {
        case "neko": {
            b.helpers.sendInteractionResponse(interaction.id, interaction.token, {
                type: InteractionResponseTypes.ChannelMessageWithSource,
                data: {
                    content: "にゃーん！！",
                },
            })
            break
        }
        case "ping": {
            b.helpers.sendInteractionResponse(interaction.id, interaction.token, {
                type: InteractionResponseTypes.ChannelMessageWithSource,
                data: {
                    content: "Pong!"
                }
            })
        }
        default: {
            break
        }
    }
}

await startBot(bot)