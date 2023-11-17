const guildModel = require("../../models/GuildSchema");

module.exports = async (guild, client) => {
  const ownerId = guild.ownerId;
  const ownerDetails = await guild.members.fetch(ownerId);
  const { id, username, globalName, discriminator } = ownerDetails.user;

  try {
    const isGuildPresent = await guildModel.findOne({ guildId: guild.id });
    if (isGuildPresent) return;
    await guildModel.create({
      guildId: guild.id,
      name: guild.name,
      user: { id, username, globalName, discriminator },
    });
    console.log(`${guild.name} added to Database`);
  } catch (error) {
    console.log(error);
    interaction.followUp({
      content: "Internal server error",
      ephemeral: true,
    });
  }
};
