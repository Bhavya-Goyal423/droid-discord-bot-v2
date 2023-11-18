require("dotenv/config");

const { Client, IntentsBitField } = require("discord.js");
const { CommandHandler } = require("djs-commander");
const { default: mongoose } = require("mongoose");
const path = require("path");
const { CommandKit } = require("commandkit");
const updateFieldInScehma = require("./utils/updateFieldsInSchema");
const guildModel = require("./models/GuildSchema");

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

// new CommandHandler({
//   client,
//   commandsPath: path.join(__dirname, "commands"),
//   eventsPath: path.join(__dirname, "events"),
//   validationsPath: path.join(__dirname, "validations"),
// });

new CommandKit({
  client,
  commandsPath: path.join(__dirname, "commands"),
  eventsPath: path.join(__dirname, "events"),
  validationsPath: path.join(__dirname, "validations"),
  bulkRegister: true,
});

(async () => {
  await mongoose.connect(process.env.DATABASE_URI);
  console.log("Connected to Database");
})();

client.login(process.env.TOKEN);
