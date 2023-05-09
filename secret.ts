import { dotenv } from "./deps.ts"
import { Deno } from "discordeno/types/_dnt.shims.js"

if (Deno.env.get("PRODUCTION") !== "TRUE") {
    dotenv.configSync({
        export: true,
        path: "./.env.local",
    })
}

export const Secret = {
    DISCORD_TOKEN: Deno.env.get("DISCORD_TOKEN")!,
    GUILD_ID: Deno.env.get("GUILD_ID")!
}