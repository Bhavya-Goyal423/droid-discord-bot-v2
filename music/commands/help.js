const Discord = require("discord.js");

module.exports = {
  name: "help",
  aliases: ["h", "cmd", "command"],
  run: async (client, message) => {
    try {
      message.channel.send({
        embeds: [
          new Discord.EmbedBuilder()
            .setTitle("Commands")
            .setDescription(
              client.commands.map((cmd) => `\`${cmd.name}\``).join(", ")
            ),
          // .setColor('BLURPLE')
        ],
      });
    } catch (error) {
      console.log(error);
    }
  },
};
