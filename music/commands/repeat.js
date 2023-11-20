module.exports = {
  name: "repeat",
  aliases: ["loop", "rp"],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    try {
      const queue = client.distube.getQueue(message);
      if (!queue)
        return message.channel.send(
          `${client.emotes.error} | There is nothing playing!`
        );

      mode = queue.setRepeatMode(1);

      message.channel.send(`${client.emotes.repeat} | Repeating current song`);
    } catch (error) {
      console.log(error);
    }
  },
};
