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
    !message.content.toLowerCase().startsWith("!")
  )
    return;

  const prefix = "!";
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  const voice = message.guild.channels.cache.get("1126632478417899573");

  try {
    if (command === "play") {
      try {
        client.Distube.play(message.member.voice.channel, args.join(" "), {
          member: message.member,
          textChannel: message.channel,
          message,
        });
      } catch (error) {
        console.log("ERRRORR");
        console.log(error);
      }
    } else if (command === "queue") {
      const queue = client.Distube.getQueue(message);
      if (!queue) {
        message.channel.send("No songs in queue");
        return;
      }
      const q = queue.songs
        .map(
          (song, i) =>
            `${i === 0 ? "Playing:" : `${i}.`} ${song.name} - \`${
              song.formattedDuration
            }\``
        )
        .join("\n");
      message.channel.send(`**Server Queue**\n${q}`);
    } else if (command === "skip") {
      const queue = client.Distube.getQueue(message);
      if (queue.songs.length <= 1) {
        return message.channel.send(
          "There is nothing in the queue to play right now"
        );
      }
      const song = await queue.skip();
      message.channel.send(`Skipped!`);
    } else if (command === "leave") {
      console.log("in leave");
      client.Distube.voices.leave(message);
      console.log("after leave");
    }
  } catch (error) {
    console.log("ERRRORR");
    console.log(error);
  }
};
