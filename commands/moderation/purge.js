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
      console.log(number);
      const deletedMsg = await interaction.channel.bulkDelete(number);
      console.log(deletedMsg);
      const embed = new EmbedBuilder()
        .setColor("Blurple")
        .setDescription(`Deleted messages ✅`);
      interaction.followUp({ embeds: [embed] });
    } catch (error) {
      console.log(error.message);
      console.log(error);
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
        .setDescription("number of messages to delete.Limit 1000")
        .setMinValue(1)
        .setMaxValue(100)
        .setRequired(true)
    ),
  MemberPermissions: [PermissionFlagsBits.ManageMessages],
  BotPermissions: [PermissionFlagsBits.ManageMessages],
  deleted: true,
};
