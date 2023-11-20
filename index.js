require("dotenv/config");

const moment = require("moment");
const { Client, IntentsBitField } = require("discord.js");
const { default: mongoose } = require("mongoose");
const path = require("path");
const { CommandKit } = require("commandkit");
const { DisTube } = require("distube");
const { DeezerPlugin } = require("@distube/deezer");
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const { YtDlpPlugin } = require("@distube/yt-dlp");
const updateFieldInScehma = require("./utils/updateFieldsInSchema");
const guildModel = require("./models/GuildSchema");

const fs = require("fs");
const config = require("./config.json");
const Discord = require("discord.js");

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

new CommandKit({
  client,
  commandsPath: path.join(__dirname, "commands"),
  eventsPath: path.join(__dirname, "events"),
  validationsPath: path.join(__dirname, "validations"),
  bulkRegister: true,
});

client.distube = new DisTube(client, {
  leaveOnStop: false,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
  emptyCooldown: 1,
  youtubeCookie: [
    {
      domain: ".youtube.com",
      expirationDate: 1731997143.248322,
      hostOnly: false,
      httpOnly: true,
      name: "__Secure-1PSIDTS",
      path: "/",
      sameSite: "unspecified",
      secure: true,
      session: false,
      storeId: "0",
      value:
        "sidts-CjIBNiGH7je2-4Sciog5grWnqYzhFU_nAOfZf-_1sUDN7d7W0hT3mIGoYztPeAr7eKd3ThAA",
      id: 1,
    },
    {
      domain: ".youtube.com",
      expirationDate: 1734883183.103567,
      hostOnly: false,
      httpOnly: false,
      name: "__Secure-3PAPISID",
      path: "/",
      sameSite: "no_restriction",
      secure: true,
      session: false,
      storeId: "0",
      value: "c1b_QO96umQq-Ejo/AGhrhGl3BDgczphhs",
      id: 2,
    },
    {
      domain: ".youtube.com",
      expirationDate: 1734883183.103578,
      hostOnly: false,
      httpOnly: true,
      name: "__Secure-3PSID",
      path: "/",
      sameSite: "no_restriction",
      secure: true,
      session: false,
      storeId: "0",
      value:
        "dQgynOZB6_Oy2eEO3HxdfWdQ-_o_KP9in83bNB_6D9gpb7txQldeOpeDByrTqFWXFnJK3w.",
      id: 3,
    },
    {
      domain: ".youtube.com",
      expirationDate: 1731997237.135088,
      hostOnly: false,
      httpOnly: true,
      name: "__Secure-3PSIDCC",
      path: "/",
      sameSite: "no_restriction",
      secure: true,
      session: false,
      storeId: "0",
      value:
        "ACA-OxPZDFfb6y-x1KnYBFJUd6cBohJUgpqHDAVERFnRxzW9eLF5VsEZe7Nsz0I2taV-4jd0nOk",
      id: 4,
    },
    {
      domain: ".youtube.com",
      expirationDate: 1731997143.248391,
      hostOnly: false,
      httpOnly: true,
      name: "__Secure-3PSIDTS",
      path: "/",
      sameSite: "no_restriction",
      secure: true,
      session: false,
      storeId: "0",
      value:
        "sidts-CjIBNiGH7je2-4Sciog5grWnqYzhFU_nAOfZf-_1sUDN7d7W0hT3mIGoYztPeAr7eKd3ThAA",
      id: 5,
    },
    {
      domain: ".youtube.com",
      expirationDate: 1734883187.602852,
      hostOnly: false,
      httpOnly: true,
      name: "LOGIN_INFO",
      path: "/",
      sameSite: "no_restriction",
      secure: true,
      session: false,
      storeId: "0",
      value:
        "AFmmF2swRQIgYjjsnEfHK0jZ_YxzYttq2EbExEJMkQTSZTsTlqpDJIcCIQDcmO_2KjZIwqpHEYI-RWZ1AWXniE9eT1XWGdCn73aJQQ:QUQ3MjNmeVkwYWs4YnpZY1FxcHFiOEczTzJOb0l2eU8tMWFSX29CdjhxMTBLX3FwUWdQd2NCTE5DYUkwTXg5SDhBU2FmcDA3eDduN0RtVk11cEFiWGtjM2swODVDd25yaFI5TFFzX19qQ25OV3lDZEduUmZVX1VYZzBoQVJ4XzQyRGcya1lUV05mcDUxRDlvZzl6N3IzenFWd3NmdmNNWGVR",
      id: 6,
    },
    {
      domain: ".youtube.com",
      expirationDate: 1735021232.96768,
      hostOnly: false,
      httpOnly: false,
      name: "PREF",
      path: "/",
      sameSite: "unspecified",
      secure: true,
      session: false,
      storeId: "0",
      value: "f6=40000000&tz=Asia.Calcutta&f5=30000&f7=100",
      id: 7,
    },
    {
      domain: ".youtube.com",
      expirationDate: 1711433881.145766,
      hostOnly: false,
      httpOnly: true,
      name: "VISITOR_INFO1_LIVE",
      path: "/",
      sameSite: "no_restriction",
      secure: true,
      session: false,
      storeId: "0",
      value: "JY9JY-WLASg",
      id: 8,
    },
    {
      domain: ".youtube.com",
      expirationDate: 1711434113.330623,
      hostOnly: false,
      httpOnly: true,
      name: "VISITOR_PRIVACY_METADATA",
      path: "/",
      sameSite: "lax",
      secure: true,
      session: false,
      storeId: "0",
      value: "CgJJThICGgA%3D",
      id: 9,
    },
    {
      domain: ".youtube.com",
      hostOnly: false,
      httpOnly: true,
      name: "YSC",
      path: "/",
      sameSite: "no_restriction",
      secure: true,
      session: true,
      storeId: "0",
      value: "XE6jmBxJ5LY",
      id: 10,
    },
  ],
  plugins: [
    new DeezerPlugin(),
    new SpotifyPlugin({ emitEventsAfterFetching: true }),
    new SoundCloudPlugin(),
    new YtDlpPlugin({ update: true }),
  ],
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.emotes = config.emoji;

fs.readdir("./music/commands/", (err, files) => {
  if (err) return console.log("Could not find any commands!");
  const jsFiles = files.filter((f) => f.split(".").pop() === "js");
  if (jsFiles.length <= 0) return console.log("Could not find any commands!");
  jsFiles.forEach((file) => {
    const cmd = require(`./music/commands/${file}`);
    console.log(`Loaded ${file}`);
    client.commands.set(cmd.name, cmd);
    if (cmd.aliases)
      cmd.aliases.forEach((alias) => client.aliases.set(alias, cmd.name));
  });
});

client.distube
  .on("playSong", (queue, song) => {
    const embed = {
      color: 0x7752fe,
      title: song.name,
      url: song.url,
      author: {
        name: song.user.username,
        icon_url: song.user.displayAvatarURL({ size: 128 }),
      },
      thumbnail: {
        url: song.thumbnail,
      },
      description: `${client.emotes.play} | Playing \`${song.name}\` - \`${song.formattedDuration}\``,
      footer: {
        text: `${queue.textChannel.guild.name} • ${moment(new Date()).format(
          "YYYY/MM/DD h:mm A"
        )}`,
      },
    };
    queue.textChannel.send({ embeds: [embed] });
  })
  .on("addSong", (queue, song) => {
    const embed = {
      color: 0x7752fe,
      title: song.name,
      url: song.url,
      author: {
        name: song.user.username,
        icon_url: song.user.displayAvatarURL({ size: 128 }),
      },
      thumbnail: {
        url: song.thumbnail,
      },
      description: `${client.emotes.success} | Added \`${song.name}\` - \`${song.formattedDuration}\` to the queue`,
      footer: {
        text: `${queue.textChannel.guild.name} • ${moment(new Date()).format(
          "YYYY/MM/DD h:mm A"
        )}`,
      },
    };

    queue.textChannel.send({ embeds: [embed] });
  })
  .on("addList", (queue, playlist) =>
    queue.textChannel.send(
      `${client.emotes.success} | Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue`
    )
  )
  .on("error", (channel, e) => {
    if (channel)
      channel.textChannel.send(
        `${client.emotes.error} | An error encountered: ${e
          .toString()
          .slice(0, 1974)}`
      );
    else console.error(e);
  })
  .on("empty", (channel) => {
    const embed = {
      color: 0x7752fe,
      description: `Voice channel is empty! Leaving the channel...`,
      footer: {
        text: `${queue.textChannel.guild.name} • ${moment(new Date()).format(
          "YYYY/MM/DD h:mm A"
        )}`,
      },
    };
    channel.textChannel.send({ embeds: [embed] });
  })
  .on("searchNoResult", (message, query) => {
    const embed = {
      color: 0x7752fe,
      description: `${client.emotes.error} | No result found for \`${query}\`!`,
      footer: {
        text: `${queue.textChannel.guild.name} • ${moment(new Date()).format(
          "YYYY/MM/DD h:mm A"
        )}`,
      },
    };
    message.channel.send({ embeds: [embed] });
  })
  .on("finish", (queue) => {
    const embed = {
      color: 0x7752fe,
      description: `No more songs to play`,
      footer: {
        text: `${queue.textChannel.guild.name} • ${moment(new Date()).format(
          "YYYY/MM/DD h:mm A"
        )}`,
      },
    };
    query.textChannel.send({ embeds: [embed] });
  });

(async () => {
  await mongoose.connect(process.env.DATABASE_URI);
  console.log("Connected to Database");
})();

client.login(process.env.TOKEN);
