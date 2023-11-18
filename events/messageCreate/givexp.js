const { Client, Message } = require("discord.js");
const levelModel = require("../../models/LevelSchema");
const calculateLevelXp = require("../../utils/calcualteLevelXp");
const cooldown = new Set();
const guildModel = require("../../models/GuildSchema");

/**
 *
 * @param {Client} client
 * @param {Message} message
 */

function getRandomXp(min, max) {
  min = Math.ceil(min);
  max = Math.ceil(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = async (message, client) => {
  if (
    !message.inGuild() ||
    message.author.bot ||
    cooldown.has(message.author.id + message.guild.id)
  )
    return;

  try {
    const guild = await guildModel.findOne({ guildId: message.guildId });
    if (!guild.levelsEnabled) return;

    const guildName = client.guilds.cache.get(message.guildId).name;

    const logChannelId = guild.levelLogChannelId;

    let targetChannel = null;

    if (logChannelId !== null)
      targetChannel = message.guild.channels.cache.get(logChannelId);
    else targetChannel = message.guild.channels.cache.get(message.channelId);

    const xpToGive = getRandomXp(5, 15);

    const query = {
      userId: message.author.id,
      guildId: message.guild.id,
    };

    const level = await levelModel.findOne(query);

    if (level) {
      level.xp += xpToGive;
      if (level.xp > calculateLevelXp(level.level)) {
        level.xp = 0;
        level.level += 1;

        if (targetChannel) {
          await targetChannel.send(
            `${message.member} you have advanced to **level ${level.level}**. 🥳`
          );
        } else return;
      }
      await level.save().catch((e) => {
        console.log(e);
        return;
      });
      cooldown.add(message.author.id + message.guild.id);
      setTimeout(() => {
        cooldown.delete(message.author.id + message.guild.id);
      }, 30000);
    } else {
      const newLevel = new levelModel({
        userId: message.author.id,
        guildId: message.guild.id,
        xp: xpToGive,
        username: message.author.username,
        guildName,
      });
      const result = await newLevel.save().catch((e) => {
        console.log(e);
      });

      guild.levels.push(result._id);
      await guild.save();
    }
  } catch (error) {
    console.log(error);
  }
};
