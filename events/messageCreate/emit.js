const GuildModel = require("../../models/GuildSchema");

module.exports = async (message, client) => {
  if (message.content === "emit") {
    client.emit("guildMemberAdd");
  }
};
