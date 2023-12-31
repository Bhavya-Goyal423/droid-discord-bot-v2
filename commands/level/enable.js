const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const guildModel = require("../../models/GuildSchema");

module.exports = {
  run: async ({ interaction, client }) => {
    await interaction.deferReply({ ephemeral: true });

    try {
      const channelId = interaction.options.getChannel("channel-id")?.id;
      const guild = await guildModel.findOne({ guildId: interaction.guildId });

      if (guild.levelsEnabled) {
        return await interaction.followUp({
          content:
            "Levels already enabled for you server if you want to change the log channel user /set level logChannel",
        });
      }

      if (channelId) {
        guild.levelLogChannelId = channelId;
        guild.levelsEnabled = true;
        await guild.save();
        return interaction.followUp({ content: "Enabled Levels ✅" });
      } else {
        guild.levelsEnabled = true;
        await guild.save();
        return interaction.followUp({ content: "Enabled Levels ✅" });
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
    .setDescription("enable the level system for the server")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("levels")
        .setDescription("enable the level system for the server")
        .addChannelOption((option) =>
          option
            .setName("channel-id")
            .setDescription("channel to log the levels")
        )
    ),

  MemberPermissions: [PermissionFlagsBits.ManageGuild],
  BotPermissions: [PermissionFlagsBits.ManageGuild],
};
