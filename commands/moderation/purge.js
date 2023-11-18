const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  run: async ({ interaction, client }) => {
    if (!interaction.inGuild())
      return interaction.reply(
        "This command can only be executed while in guild"
      );

    await interaction.deferReply({ ephemeral: true });

    try {
      const number = interaction.options.getInteger("count");
      const deletedMsg = await interaction.channel.bulkDelete(number);
      const embed = new EmbedBuilder()
        .setColor("Blurple")
        .setDescription(`Deleted messages ✅`);
      interaction.followUp({ embeds: [embed] });
    } catch (error) {
      console.log(error);
      if (error.message === "Missing Permissions") {
        return interaction.followUp({
          content: "I don't have permission to do that action in this channel",
        });
      } else if (
        error.message ===
        "You can only bulk delete messages that are under 14 days old."
      ) {
        return interaction.followUp({
          content:
            "You can only bulk delete messages that are under 14 days old.",
        });
      }
      interaction.followUp({
        content: "Internal server error",
        ephemeral: true,
      });
    }
  },
  data: new SlashCommandBuilder()
    .setName("purge")
    .setDescription("deletes the messages from the server")
    .addIntegerOption((option) =>
      option
        .setName("count")
        .setDescription("Number of messages to delete.Limit 100")
        .setMinValue(1)
        .setMaxValue(100)
        .setRequired(true)
    ),
  MemberPermissions: [PermissionFlagsBits.ManageMessages],
  BotPermissions: [PermissionFlagsBits.ManageMessages],
};
