module.exports = {
  name: "skip",
  inVoiceChannel: true,
  run: async (client, message) => {
    try {
      const queue = client.distube.getQueue(message);
      if (!queue)
        return message.channel.send(
          `${client.emotes.error} | There is nothing in the queue right now!`
        );
      const song = await queue.skip();
      message.channel.send(`${client.emotes.success} | Skipped!`);
    } catch (e) {
      message.channel.send(`${client.emotes.error} | ${e}`);
    }
  },
};
