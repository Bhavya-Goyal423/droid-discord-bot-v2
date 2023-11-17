const guildModel = require("../../models/GuildSchema");
const levelModel = require("../../models/LevelSchema");

module.exports = async (guild, client) => {
  try {
    await guildModel.findOneAndDelete({ guildId: guild.id });
    await levelModel.deleteMany({ guildId: guild.id });
    console.log(`Guild ${guild.name} removed from DB`);
  } catch (error) {
    console.log(error);
    interaction.followUp({
      content: "Internal server error",
      ephemeral: true,
    });
  }
};
