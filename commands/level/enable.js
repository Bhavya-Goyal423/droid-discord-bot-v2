const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const guildModel = require("../../models/GuildSchema");

module.exports = {
  run: async ({ interaction, client }) => {
    await interaction.deferReply({ ephemeral: true });

    try {
      const channelId = interaction.getChannel("channel-id")?.id;

      if (channelId) {
        await guildModel.findOneAndUpdate(
          { guildId: interaction.guildId },
          { levelLogChannelId: channelId, levelsEnabled: true }
        );
      } else {
        await guildModel.findOneAndUpdate(
          { guildId: interaction.guildId },
          { levelsEnabled: true }
        );
      }
    } catch (error) {
      console.log(error);
      interaction.followUp({
        content: "Internal server error",
        ephemeral: true,
      });
    }
  },
  data: new SlashCommandBuilder()
    .setName("enable")
    .setDescription("enable the levels for the server")
    .addChannelOption((option) =>
      option.setName("channel-id").setDescription("channel to log the levels")
    ),
  MemberPermissions: [PermissionFlagsBits.KickMembers],
  BotPermissions: [PermissionFlagsBits.KickMembers],
};
