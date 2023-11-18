const levelModel = require("../../models/LevelSchema");
const guildModel = require("../../models/GuildSchema");

module.exports = async (member, client) => {
  try {
    let levelId = null;
    const guild = await guildModel
      .findOne({ guildId: member.guild.id })
      .populate("levels");
    const allLevels = guild.levels;
    const memberLevel = allLevels.find((level) => level.userId === member.id);

    if (memberLevel) {
      levelId = memberLevel._id;

      guild.levels = allLevels.filter((level) => level.userId !== member.id);
      await guild.save();
      await levelModel.findOneAndDelete({ _id: levelId });
    }
  } catch (error) {
    console.log(error);
  }
};
