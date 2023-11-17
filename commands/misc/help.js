const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  run: async ({ interaction, client }) => {
    const commandName = interaction.options.getString("command");
    await interaction.deferReply({ ephemeral: true });
    let message = "";
    try {
      // * Descirption of kick command
      if (commandName === "kick") {
        message += `\`\`\`Command : /set welcome channel\nParameters : <channel-id> (Required)\nUsage : /set welcome channel <channel-id>\nDescription : Sets a channel to send a welcome message whenever a user joins the server.\nNote : This command is useless without welcome message as there will be no message to send in the channel, to set welcome message use /set welcome message. To know more use /help.\`\`\``;
        await interaction.followUp({ content: message });
        message = "";

        return;
      }
    } catch (error) {
      console.log(error);
    }
  },
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("brief description of a command")
    .addStringOption((option) =>
      option
        .setName("command")
        .setDescription("command you want help for")
        .addChoices(
          { name: "kick", value: "kick" },
          { name: "ban", value: "ban" },
          { name: "set welcome message", value: "welmsg" },
          { name: "set welcome channel", value: "welchnl" },
          { name: "set auto role", value: "autorole" }
        )
        .setRequired(true)
    ),
};
