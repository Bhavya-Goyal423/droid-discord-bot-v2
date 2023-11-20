const { Client, Message } = require("discord.js");

/**
 *
 * @param {Client} client
 * @param {Message} message
 */

module.exports = async (message, client) => {
  if (
    !message.inGuild() ||
    message.author.bot ||
    !message.content.toLowerCase().startsWith("!d")
  )
    return;

  const prefix = "!d";
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (!message.content.toLowerCase().startsWith("!d")) return;

  try {
    if (command === "play") {
      client.Distube.play(message.member.voice.channel, args.join(" "), {
        member: message.member,
        textChannel: message.channel,
        message,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
