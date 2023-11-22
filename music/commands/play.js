const moment = require("moment");

module.exports = {
  name: "play",
  aliases: ["p"],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    try {
      const query = args.join(" ");
      console.log(query, typeof query);
      if (!query)
        return message.channel.send(
          `${client.emotes.error} | Please enter a song url or query to search.`
        );
      console.log("before play execute");
      console.log("member channel");
      console.log(message.member.voice.channel);
      client.distube.play(message.member.voice.channel, "tu tu hai vahi", {
        member: message.member,
        textChannel: message.channel,
        message,
      });
      console.log("after play execute");
    } catch (error) {
      console.log("error thrown from here");
      console.log(error);
    }
  },
};
