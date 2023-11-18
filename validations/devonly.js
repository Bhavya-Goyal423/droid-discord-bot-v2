module.exports = ({ interaction, commandObj, _, client }) => {
  if (!interaction.inGuild())
    return interaction.reply("The command can only be run in guilds");
  if (commandObj.devOnly) {
    if (interaction.member.id !== "211032990195777537") {
      interaction.reply("The command is for developers only");
      return true;
    }
  }
};
