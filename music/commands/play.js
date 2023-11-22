const moment = require("moment");

module.exports = {
  name: "play",
  aliases: ["p"],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    try {
      const string = args.join(" ");
      if (!string)
        return message.channel.send(
          `${client.emotes.error} | Please enter a song url or query to search.`
        );
      console.log("before play execute");
      console.log(message.member.voice.channel);
      client.distube.play(message.member.voice.channel, string, {
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
