import { dotenv } from "./deps.ts"
import { Deno } from "./main.js"


await dotenv.config({
    export: true,
    path: "./.env.local",
});
  
const config = Deno.env.toObject();
  
export const Secret = {
    DISCORD_TOKEN: config["DISCORD_TOKEN"],
    GUILD_ID: config["GUILD_ID"]
};