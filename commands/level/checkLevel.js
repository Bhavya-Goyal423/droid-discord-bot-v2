const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const guildModel = require("../../models/GuildSchema");

module.exports = {
  run: async ({ interaction, client }) => {
    await interaction.deferReply({ ephemeral: true });

    try {
      const userId = interaction.options.getUser("user").id;
      const guild = await guildModel
        .findOne({ guildId: interaction.guildId })
        .populate("levels");
    } catch (error) {
      console.log(error);
      interaction.followUp({
        content: "Internal server error",
        ephemeral: true,
      });
    }
  },
  data: new SlashCommandBuilder()
    .setName("level")
    .setDescription("enable the levels for the server")
    .addUserOption((option) =>
      option.setName("user").setDescription("user you want to check level of")
    ),
};
