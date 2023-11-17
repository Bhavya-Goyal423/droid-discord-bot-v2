const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  run: async ({ interaction, client }) => {
    if (!interaction.inGuild())
      return interaction.reply(
        "This command can only be executed while in guild"
      );

    await interaction.deferReply({ ephemeral: true });

    try {
      const user = interaction.options.getUser("target-user");
      const reason = interaction.options.getString("reason");
      const dm = interaction.options.getString("dm") === "true" ? true : false;

      const targetUser = interaction.guild.members.cache.get(user.id);

      if (!targetUser) {
        return await interaction.followUp({
          content: "The user doesn't exist in the server",
          ephemeral: true,
        });
      }

      if (user.id === interaction.guild.onwerId) {
        return await interaction.followUp({
          content: "You can't kick the server owner",
          ephemeral: true,
        });
      }

      const userHigestRole = targetUser.roles.highest.position;
      const requestUserRole = interaction.member.roles.highest.position;

      if (userHigestRole >= requestUserRole)
        return await interaction.followUp({
          content: "You cant kick a user with roles similar/higher than you",
        });

      await targetUser.kick({ reason });

      console.log(dm);
      if (dm) {
        user.send(
          `You have been kicked from ${interaction.guild.name} for ${reason}`
        );
      }
      await interaction.followUp({
        content: `User ${user} was kicked\n${reason ? reason : ""}`,
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
    .setName("kick")
    .setDescription("kicks a user from the server")
    .addUserOption((option) =>
      option
        .setName("target-user")
        .setDescription("user you want to kick")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("reason").setDescription("reason for kicking")
    )
    .addStringOption((option) =>
      option
        .setName("dm")
        .setDescription("dm the reason to user")
        .addChoices(
          { name: "No", value: "false" },
          { name: "Yes", value: "true" }
        )
    ),
  MemberPermissions: [PermissionFlagsBits.KickMembers],
  BotPermissions: [PermissionFlagsBits.KickMembers],
};
