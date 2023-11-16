const GuildModel = require("../../models/GuildSchema");
const LevelModel = require("../../models/LevelSchema");

module.exports = async (guild, client) => {
  try {
    await GuildModel.findOneAndDelete({ guildId: guild.id });
    await Level.deleteMany({ guildId: guild.id });
    console.log(`Guild ${guild.name} removed from DB`);
  } catch (error) {
    console.log(error);
  }
};
