const moment = require("moment");

module.exports = async (oldState, newState, client) => {
  try {
    const oldVc = oldState.channel?.name;
    const newVc = newState.channel?.name;

    const user = newState.guild.members.cache.get(oldState.id);
    const logChannel = newState.guild.channels.cache.get("1173686145012469762");

    let messageString = "";

    if (oldVc !== newVc) {
      if (oldVc === undefined && newVc) {
        const embed = {
          color: 0x9ade7b,
          author: {
            name: user.user.username,
            icon_url: user.user.displayAvatarURL({ size: 128 }),
          },
          description: `**${user} joined voice channel \`${newVc}\`**`,
          footer: {
            text: `${user.guild.name} • ${moment(new Date()).format(
              "YYYY/MM/DD h:mm A"
            )}`,
          },
        };
        logChannel.send({ embeds: [embed] });
      } else if (oldVc && newVc === undefined) {
        const embed = {
          color: 0xd80032,
          author: {
            name: user.user.username,
            icon_url: user.user.displayAvatarURL({ size: 128 }),
          },
          description: `**${user} left voice channel \`${oldVc}\`**`,
          footer: {
            text: `${user.guild.name} • ${moment(new Date()).format(
              "YYYY/MM/DD h:mm A"
            )}`,
          },
        };
        logChannel.send({ embeds: [embed] });
      } else if (oldVc && newVc) {
        const embed = {
          color: 0xffcf96,
          author: {
            name: user.user.username,
            icon_url: user.user.displayAvatarURL({ size: 128 }),
          },
          description: `**${user} swtiched voice channel \`${oldVc}\` => \`${newVc}\`**`,
          footer: {
            text: `${user.guild.name} • ${moment(new Date()).format(
              "YYYY/MM/DD h:mm A"
            )}`,
          },
        };
        logChannel.send({ embeds: [embed] });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
