const { SlashCommandBuilder, AttachmentBuilder } = require("discord.js");
const guildModel = require("../../models/GuildSchema");
const canvacord = require("canvacord");
const calculateLevelXp = require("../../utils/calcualteLevelXp");

module.exports = {
  run: async ({ interaction, client }) => {
    await interaction.deferReply({ ephemeral: true });

    try {
      const user = interaction.options.getUser("user");
      const userId = user.id;
      const guild = await guildModel
        .findOne({ guildId: interaction.guildId })
        .populate("levels");

      const allLevels = guild.levels;

      const userLevel = allLevels.find((level) => level.userId === userId);

      if (!userLevel)
        return await interaction.followUp({
          content: "The user currently have 0 level",
        });

      allLevels.sort((a, b) => {
        if (a.level === b.level) {
          return b.xp - a.xp;
        }
        return b.level - a.level;
      });

      let curRank = allLevels.findIndex((obj) => obj.userId === userId) + 1;
      const rank = new canvacord.Rank()
        .setAvatar(targetUser.user.displayAvatarURL({ size: 128 }))
        .setRank(curRank)
        .setLevel(level.level)
        .setCurrentXP(level.xp)
        .setRequiredXP(calculateLevelXp(level.level))
        .setStatus(targetUser.presence.status)
        .setProgressBar("#FFC300", "COLOR")
        .setUsername(targetUser.user.username);

      const data = await rank.build();
      const attachment = new AttachmentBuilder(data);

      interaction.editReply({ files: [attachment] });
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
