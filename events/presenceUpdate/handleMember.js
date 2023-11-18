const nodemailer = require("nodemailer");

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const twilioclient = require("twilio")(accountSid, authToken);

module.exports = (oldPresence, newPresence, client) => {
  if (
    newPresence.userId === "816661375861915648" &&
    newPresence.status !== "offline"
  ) {
    console.log("available");
    // twilioclient.messages
    //   .create({
    //     body: "Gargi is now available on discord.",
    //     from: "+17605374841",
    //     to: "+919599639538",
    //   })
    //   .then((message) => console.log(message.sid))
    //   .catch((error) => console.log(error));

    // twilioclient.calls
    //   .create({
    //     url: "http://demo.twilio.com/docs/voice.xml",
    //     to: "+919599639538",
    //     from: "+17605374841",
    //   })
    //   .then((call) => console.log(call.sid))
    //   .catch((error) => console.log(error));
  }
};
