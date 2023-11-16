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
          content: "You can't ban the server owner",
          ephemeral: true,
        });
      }

      const userHigestRole = targetUser.roles.highest.position;
      const requestUserRole = interaction.member.roles.highest.position;

      if (userHigestRole >= requestUserRole)
        return await interaction.followUp({
          content: "You cant ban a user with roles similar/higher than you",
        });

      await targetUser.ban({ reason });

      if (dm) {
        user.send(
          `You have been baned from ${interaction.guild.name} for ${reason}`
        );
      }
      await interaction.followUp({
        content: `User ${user} was baned\n${reason ? reason : ""}`,
      });
    } catch (error) {
      console.log(error);
    }
  },
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("ban a user from the server")
    .addUserOption((option) =>
      option
        .setName("target-user")
        .setDescription("user you want to ban")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("reason").setDescription("reason for baning")
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
};
