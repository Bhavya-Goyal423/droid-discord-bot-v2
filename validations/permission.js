const { PermissionFlagsBits } = require("discord.js");
const { BotPermissions } = require("../commands/moderation/ban");

module.exports = (interaction, commandObj, _, client) => {
  if (!interaction.inGuild())
    return interaction.reply("The command can only be run in guilds");
  const member = interaction.guild.members.cache.get(interaction.member.id);
  const bot = interaction.guild.members.cache.get(client.user.id);

  let memberHavePermissions = true;
  let botHavePermissions = true;

  try {
    // * Checking if members have enough permissions

    if (
      commandObj.MemberPermissions &&
      commandObj.MemberPermissions.length > 0
    ) {
      for (const permission of commandObj.MemberPermissions) {
        if (!member.permissions.has(permission)) {
          memberHavePermissions = false;
          interaction.reply({
            content: "You dont have enough permissions",
            ephemeral: true,
          });
          return true;
        }
      }
    }

    // * Checking if bot have enough permissions

    if (commandObj.BotPermissions && commandObj.BotPermissions.length > 0) {
      for (const permission of commandObj.BotPermissions) {
        if (!bot.permissions.has(permission)) {
          botHavePermissions = false;
          interaction.reply({
            content: "I dont have enough permissions",
            ephemeral: true,
          });
          return true;
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};
