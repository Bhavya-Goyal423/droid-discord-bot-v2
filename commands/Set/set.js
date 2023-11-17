const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const guildModel = require("../../models/GuildSchema");

module.exports = {
  run: async ({ interaction, client }) => {
    const subCommand = interaction.options.getSubcommand();
    await interaction.deferReply({ ephemeral: true });
    const curGuild = interaction.guild;
    const guild = await guildModel.findOne({
      guildId: interaction.guildId,
    });
    const guildWelcome = Object.fromEntries(guild.welcome);

    // * Check if guild present in database

    if (!guild)
      return await interaction.followUp({
        content:
          "Server not present in database, please kick the bot and invite it again.",
        ephemeral: true,
      });

    try {
      // * --------------------- Role Command -----------------------------
      if (subCommand === "auto_role") {
        let rolePresent = false;
        const roleId = interaction.options.getRole("role").id;

        // * Check if bot role is above the given role

        const roleToGive = curGuild.roles.cache.find(
          (role) => role.id === roleId
        );
        const botRolePosition =
          interaction.guild.members.me.roles.highest.position;

        if (botRolePosition <= roleToGive.position)
          return interaction.followUp(
            "Role not set\nReason: Specified role has same/higher position than my role"
          );

        // * Setting role to database

        if (guildWelcome.roleId) rolePresent = true;
        guild.welcome = { ...guildWelcome, roleId };
        await guild.save();

        if (!rolePresent) {
          await interaction.followUp({
            content: "Autorole Enabled ✅",
          });
        } else {
          await interaction.followUp({
            content: "Autorole Updated ✅",
          });
        }
      }

      // * --------------------- Channel Command -----------------------------

      if (subCommand === "channel") {
        const channelId = interaction.options.getChannel("channel-id").id;
        let isChannelPresent = false;

        // * Setting channel to database

        if (guildWelcome.channelId) isChannelPresent = true;
        guild.welcome = { ...guildWelcome, channelId };
        await guild.save();

        if (!isChannelPresent) {
          await interaction.followUp({
            content: "Channel Set ✅",
          });
        } else {
          await interaction.followUp({
            content: "Channel Updated ✅",
          });
        }
      }

      // * --------------------- Message Command -----------------------------

      if (subCommand === "message") {
        const message = interaction.options.getString("message");
        let isMessagePresent = false;

        // * Setting message to database

        if (guildWelcome.message) isMessagePresent = true;
        guild.welcome = { ...guildWelcome, message };
        await guild.save();

        if (!isMessagePresent) {
          await interaction.followUp({
            content: "Message Set ✅",
          });
        } else {
          await interaction.followUp({
            content: "Message Updated ✅",
          });
        }
      }
    } catch (error) {
      console.log(error);
      await interaction.followUp({ content: "Internal server error" });
    }
  },
  data: new SlashCommandBuilder()
    .setName("set")
    .setDescription("set a specific thing")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("auto_role")
        .setDescription("gives a role whenever a user joins the server")
        .addRoleOption((option) =>
          option
            .setName("role")
            .setDescription("role you want give")
            .setRequired(true)
        )
    )
    .addSubcommandGroup((subCommandGroup) =>
      subCommandGroup
        .setName("welcome")
        .setDescription("set welcome data")
        .addSubcommand((subCommand) =>
          subCommand
            .setName("channel")
            .setDescription("channel to welcome user")
            .addChannelOption((option) =>
              option
                .setName("channel-id")
                .setDescription("welcome user channel")
                .setRequired(true)
            )
        )
        .addSubcommand((subCommand) =>
          subCommand
            .setName("message")
            .setDescription("message sent on user welcome")
            .addStringOption((option) =>
              option
                .setName("message")
                .setDescription("message sent whenever a user joins server")
                .setRequired(true)
            )
        )
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
