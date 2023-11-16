require("dotenv/config");

const { Client, IntentsBitField } = require("discord.js");
const { CommandHandler } = require("djs-commander");
const path = require("path");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildPresences,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildVoiceStates,
  ],
});

new CommandHandler({
  client,
  commandsPath: path.join(__dirname, "commands"),
  eventsPath: path.join(__dirname, "events"),
  //   testServer:process.env.TEST_SERVER
});

client.login(process.env.TOKEN);
