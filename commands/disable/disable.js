const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const guildModel = require("../../models/GuildSchema");

module.exports = {
  run: async ({ interaction, client }) => {
    await interaction.deferReply({ ephemeral: true });
    const subCommand = interaction.options.getSubcommand();
    const guild = await guildModel.findOne({ guildId: interaction.guildId });
    const guildWelcome = Object.fromEntries(guild.welcome);

    // * ------------- Disable welcome ---------------------------

    if (subCommand === "welcome") {
      guild.welcome = { ...guildWelcome, channelId: null, message: null };
      await guild.save();
      return interaction.followUp({ content: "Disabled welcome ✅" });
    }

    // * ------------- Disable autorole ---------------------------

    if (subCommand === "auto_role") {
      guild.welcome = { ...guildWelcome, roleId: null };
      await guild.save();
      return interaction.followUp({ content: "Disabled Auto Role ✅" });
    }

    // * ------------- Disable autorole ---------------------------

    if (subCommand === "levels") {
      guild.levelsEnabled = false;
      guild.levelLogChannelId = null;
      await guild.save();
      return interaction.followUp({ content: "Levels disabled ✅" });
    }
  },
  data: new SlashCommandBuilder()
    .setName("disable")
    .setDescription("disables a specific thing")
    .addSubcommand((subCommand) =>
      subCommand
        .setName("welcome")
        .setDescription(
          "disables the welcome message and disassociate the channel"
        )
    )
    .addSubcommand((subCommand) =>
      subCommand.setName("auto_role").setDescription("disables the autorole")
    )
    .addSubcommand((subCommand) =>
      subCommand
        .setName("levels")
        .setDescription("disable the level system for the server")
    ),

  MemberPermissions: [
    PermissionFlagsBits.ManageChannels,
    PermissionFlagsBits.ManageRoles,
  ],
  BotPermissions: [
    PermissionFlagsBits.ManageChannels,
    PermissionFlagsBits.ManageRoles,
  ],
};
