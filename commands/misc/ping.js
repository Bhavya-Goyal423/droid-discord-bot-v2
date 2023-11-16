const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  run: async ({ interaction, client }) => {
    if (!interaction.inGuild())
      return interaction.reply(
        "This command can only be executed while in guild"
      );
    await interaction.deferReply({ ephemeral: true });
    return interaction.editReply("Pongo");
  },
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong."),
};
