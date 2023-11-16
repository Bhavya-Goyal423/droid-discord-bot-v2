const GuildModel = require("../../models/GuildScehma");

module.exports = async (guild, client) => {
  const ownerId = guild.ownerId;
  const ownerDetails = await guild.members.fetch(ownerId);
  const { id, username, globalName, discriminator } = ownerDetails.user;

  try {
    await GuildModel.create({
      guildId: guild.id,
      name: guild.name,
      user: { id, username, globalName, discriminator },
    });
  } catch (error) {
    console.log(error);
  }
};
