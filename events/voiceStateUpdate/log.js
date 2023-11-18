const { EmbedBuilder } = require("discord.js");

module.exports = (oldState, newState, client) => {
  //   console.log(oldState.channel?.name);
  //   console.log(newState.channel?.name);
  if (oldState.channel?.name !== newState.channel?.name) {
    if (oldState.channel?.name === undefined && newState.channel?.name) {
      console.log(`User connected to ${newState.channel?.name}`);
    } else if (oldState.channel?.name && newState.channel?.name === undefined) {
      console.log(`user disconnted from ${oldState.channel?.name}`);
    } else if (oldState.channel?.name && newState.channel?.name) {
      console.log(
        `User switched from ${oldState.channel?.name} to ${newState.channel?.name}`
      );
    }
  }
};
