const moment = require("moment");
const guildModel = require("../../models/GuildSchema");

module.exports = async (oldMember, newMember) => {
  try {
    console.log(oldMember);
    console.log(newMember);
  } catch (error) {
    console.log(error);
  }
};
