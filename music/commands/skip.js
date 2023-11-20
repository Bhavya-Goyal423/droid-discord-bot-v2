const moment = require("moment");

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
      if (e.message === "There is no up next song") {
        const embed = {
          color: 0x7752fe,
          description: `${client.emotes.error} No songs in queue to skip`,
          footer: {
            text: `${message.guild.name} • ${moment(new Date()).format(
              "YYYY/MM/DD h:mm A"
            )}`,
          },
        };
        message.channel.send({ embeds: [embed] });
        return;
      }
      console.log(e);
    }
  },
};
