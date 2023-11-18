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

      const targetUser = await interaction.guild.members.fetch(userId);

      const rank = new canvacord.Rank()
        .setAvatar(targetUser.user.displayAvatarURL({ size: 128 }))
        .setRank(curRank)
        .setLevel(userLevel.level)
        .setCurrentXP(userLevel.xp)
        .setRequiredXP(calculateLevelXp(userLevel.level))
        .setStatus(
          targetUser?.presence?.status ? targetUser.presence.status : "offline"
        )
        .setProgressBar("#FFC300", "COLOR")
        .setUsername(targetUser.user.username)
        .setBackground(
          "IMAGE",
          "https://images.unsplash.com/photo-1513297887119-d46091b24bfa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        )
        .setOverlay("#00222222");

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
    .setDescription("check the level for a user")
    .addUserOption((option) =>
      option.setName("user").setDescription("user you want to check level of")
    ),
};
