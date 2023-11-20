module.exports = {
  name: "leave",
  run: async (client, message) => {
    try {
      client.distube.voices.leave(message);
    } catch (error) {
      console.log(error);
    }
  },
};
