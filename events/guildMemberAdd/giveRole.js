const GuildModel = require("../../models/GuildSchema");

module.exports = async (member, client) => {
  try {
    const guild = await GuildModel.findOne({ guildId: member.guild.id });
    const { roleId, channelId, message } = Object.fromEntries(guild.welcome);

    // * Sends a welcome message if welcome message and channel is assigned

    if (channelId && message) {
      const channel = client.channels.cache.get(channelId);
      if (!channel) return;

      const welcomeMessage = message.replace("{user}", member);

      channel.send(welcomeMessage);
    }

    console.log(member.guild.id === "1126632477952311296");

    const curGuild = await client.guilds.fetch(member.guild.id);
    const guildOwner = await curGuild.members.fetch(curGuild.ownerId);

    // * Assigns a auto role if its defined

    if (roleId) {
      const rolePosition = member.guild.roles.cache.find(
        (role) => role.id === roleId
      ).position;
      const botRolePosition = curGuild.members.me.roles.highest.position;

      if (botRolePosition <= rolePosition) {
        guildOwner.send(
          "Cannot assign auto role as it is lower than my role, if this is on purpose use /diable auto_role"
        );
        return;
      }

      member.roles.add(roleId);
    }
    return;
  } catch (error) {
    console.log(error);
  }
};
