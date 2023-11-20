module.exports = async (oldMessage, newMessage, client) => {
  if (oldMessage.author.bot) return;
  if (oldMessage.content.toLowerCase().startsWith("!")) return;
  try {
    const channelId = newMessage.channelId;
    const oldMsg = oldMessage.content;
    const newMsg = newMessage.content;

    const channel = newMessage.guild.channels.cache.get(channelId);
    channel.send(
      `Message send in ${channel} by ${newMessage.author} has been edited.\nOld - ${oldMsg}\nNew - ${newMsg}`
    );
  } catch (error) {
    console.log(error);
  }
};
