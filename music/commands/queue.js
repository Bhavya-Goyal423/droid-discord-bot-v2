module.exports = {
  name: "queue",
  aliases: ["q"],
  run: async (client, message) => {
    try {
      const queue = client.distube.getQueue(message);
      if (queue.songs.length > 10) {
        message.channel.send("Queue length too much");
        return;
      }
      if (!queue)
        return message.channel.send(
          `${client.emotes.error} | There is nothing playing!`
        );
      const q = queue.songs
        .map(
          (song, i) =>
            `${i === 0 ? "Playing:" : `${i}.`} ${song.name} - \`${
              song.formattedDuration
            }\``
        )
        .join("\n");
      message.channel.send(`${client.emotes.queue} | **Server Queue**\n${q}`);
    } catch (error) {
      console.log(error);
    }
  },
};
