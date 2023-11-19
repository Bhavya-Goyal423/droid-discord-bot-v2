const { Constants } = require("discord.js");
const moment = require("moment");
const guildModel = require("../../models/GuildSchema");

module.exports = async (oldMember, newMember) => {
  try {
    const guild = await guildModel.findOne({ guildId: newMember.guild.id });
    if (!guild.logChannelId) return;
    const user = newMember.user;
    const addedRole = newMember.roles.cache.find(
      (role) => !oldMember.roles.cache.has(role.id)
    );
    const removedRole = oldMember.roles.cache.find(
      (role) => !newMember.roles.cache.has(role.id)
    );

    const logChannel = newMember.guild.channels.cache.get(guild.logChannelId);
    if (!logChannel) return;

    if (addedRole) {
      const embed = {
        color: 0x9400ff,
        author: {
          name: user.username,
          icon_url: user.displayAvatarURL({ size: 128 }),
        },
        description: `**${user} has been updated**`,
        fields: [
          {
            name: "**Roles added**",
            value: `:white_check_mark: ${addedRole?.name}`,
          },
        ],
        thumbnail: {
          url: user.displayAvatarURL({ size: 128 }),
        },
        footer: {
          text: `${newMember.guild.name} • ${moment(new Date()).format(
            "YYYY/MM/DD h:mm A"
          )}`,
        },
      };
      logChannel.send({ embeds: [embed] });
    } else if (removedRole) {
      const embed = {
        color: 0x9400ff,
        author: {
          name: user.username,
          icon_url: user.displayAvatarURL({ size: 128 }),
        },
        description: `**${user} has been updated**`,
        fields: [
          {
            name: "**Roles removed**",
            value: `:no_entry: ${removedRole?.name}`,
          },
        ],
        thumbnail: {
          url: user.displayAvatarURL({ size: 128 }),
        },
        footer: {
          text: `${newMember.guild.name} • ${moment(new Date()).format(
            "YYYY/MM/DD h:mm A"
          )}`,
        },
      };
      logChannel.send({ embeds: [embed] });
    }
  } catch (error) {
    console.log(error);
  }
};
