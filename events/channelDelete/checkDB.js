const guildModel = require("../../models/GuildSchema");

module.exports = async (channel, client) => {
  try {
    const channelId = channel.id;
    const guild = await guildModel.findOne({ guildId: channel.guildId });
    const guildWelcome = Object.fromEntries(guild.welcome);
    const welcomeChannelId = guildWelcome.channelId;
    const logChannelId = guild.levelLogChannelId;

    const owner = channel.guild.members.cache.get(channel.guild.ownerId);

    if (welcomeChannelId === channelId) {
      guild.welcome = { ...guildWelcome, channelId: null };
      await guild.save();
      owner.send(
        `The channel deleted (${channel.name}) was assigned for welcome message and now has been set to null,to assign channel again use /set welcome channel`
      );
    }
    if (logChannelId === channelId) {
      guild.levelLogChannelId = null;
      await guild.save();
      owner.send(
        `The channel deleted (${channel.name}) was assigned for logging levels and now has been set to null,to assign channel again use /set level log_channel`
      );
    }
  } catch (error) {
    console.log(error);
  }
};
