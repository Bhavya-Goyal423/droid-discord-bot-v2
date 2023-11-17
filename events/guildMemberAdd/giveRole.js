const GuildModel = require("../../models/GuildSchema");

module.exports = async (member, client) => {
  try {
    const guild = await GuildModel.findOne({ guildId: member.guild.id });
    const { roleId, channelId, message } = Object.fromEntries(guild.welcome);

    if (channelId && message) {
      const channel = client.channels.cache.get(channelId);
      if (!channel) return;

      const regex = /\{c-(\d+)\}/g;
      const welcomeMessage = message
        .replace("{user}", member)
        .replace(regex, (match, channelId) => `<#${channelId}>`);

      channel.send(welcomeMessage);
    }

    // const curGuild = await client.guilds.fetch("1126632477952311296");
    // const member = await curGuild.members.fetch("648828025915441152");

    if (roleId) {
      const rolePosition = member.guild.roles.cache.find(
        (role) => role.id === roleId
      ).position;
      const botRolePosition = curGuild.members.me.roles.highest.position;

      return;
      member.roles.add(roleId);
    }
    return;
  } catch (error) {
    console.log(error);
  }
};
