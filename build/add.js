"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const { REST, Routes } = require("discord.js");
const config = require("./config.js");
const fs_1 = __importDefault(require("fs"));
require("dotenv").config(); //環境変数:Replitの方はこの行を消してください
const commands = [];
const commandFiles = fs_1.default
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  //GlobalCommandをJSON化
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}
const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN);
(() =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      console.log(`${commands.length}個のコマンドを読み込み中`);
      const data = yield rest.put(
        //GlobalCommandを読み込み
        Routes.applicationCommands(config.clientId),
        { body: commands }
      );
      console.log(`[GlobalCommand]${data.length}個のコマンドを読み込み完了`);
    } catch (error) {
      console.error(error); //エラーの場合はエラーログを出力
    }
  }))();

