const { SlashCommandBuilder, AttachmentBuilder } = require("discord.js");
const levelModel = require("../../models/LevelSchema");

module.exports = {
  run: async ({ interaction, client }) => {
    await interaction.deferReply({ ephemeral: true });

    try {
      await levelModel.updateMany(
        { guildId: interaction.guildId },
        { level: 1, xp: 0 }
      );
      interaction.followUp({
        content: "Levels reset ✅",
      });
    } catch (error) {
      console.log(error);
      interaction.followUp({
        content: "Internal server error",
        ephemeral: true,
      });
    }
  },
  data: new SlashCommandBuilder()
    .setName("reset")
    .setDescription("enable the levels for the server")
    .addSubcommand((subcommand) =>
      subcommand.setName("level").setDescription("reset all user levels")
    ),
};
