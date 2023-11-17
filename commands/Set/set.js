const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const guildModel = require("../../models/GuildSchema");

module.exports = {
  run: async ({ interaction, client }) => {
    const subCommand = interaction.options.getSubcommand();
    await interaction.deferReply({ ephemeral: true });

    try {
      // ? ----------- SET AUTO ROLE ---------------------
      if (subCommand === "auto_role") {
        let rolePresent = false;
        const roleId = interaction.options.getRole("role").id;
        const curGuild = interaction.guild;
        const guild = await guildModel.findOne({
          guildId: interaction.guildId,
        });

        //  Check if guild present in database

        if (!guild)
          return await interaction.followUp({
            content:
              "Server not present in database, please kick the bot and invite it again.",
            ephemeral: true,
          });

        // Check if bot role is above the given role

        const roleToGive = curGuild.roles.cache.find(
          (role) => role.id === roleId
        );
        const botRolePosition =
          interaction.guild.members.me.roles.highest.position;

        if (botRolePosition <= roleToGive.position)
          return interaction.followUp(
            "Role not set\nReason: Specified role has same/higher position than my role"
          );

        // Setting role to database

        const guildWelcome = Object.fromEntries(guild.welcome);
        if (guildWelcome.roleId) rolePresent = true;
        guild.welcome = { ...guildWelcome, roleId };
        await guild.save();

        if (!rolePresent) {
          await interaction.followUp({
            content: "Autorole Enabled",
          });
        } else {
          await interaction.followUp({
            content: "Autorole Updated",
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
    ),

  //   MemberPermissions: [PermissionFlagsBits.KickMembers],
  //   BotPermissions: [PermissionFlagsBits.KickMembers],
};
