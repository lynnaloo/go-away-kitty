'use strict';

const TextMessage = require('../lib/textMessage');
const ImageAnalysis = require('../lib/imageAnalysis');
const imageAnalysis = new ImageAnalysis(process.env.VISUAL_RECOGNITION_API_KEY);

/**
    Send a text when a message is sent to IoT
 */
function sendText(params) {
  console.log(`message from IoT: ${JSON.stringify(params)}`);

  const textMessage = new TextMessage({
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    toNumber: process.env.TO_NUMBER,
    twilioNumber: process.env.TWILIO_FROM_NUMBER
  });

  // if there's an image, check to see if it's a cat
  if (params.image) {

    const imageParams = {
      url: params.image.url
    };
    return imageAnalysis.isCatImage(imageParams)
    .then((isCat) => {

      // if it's not a cat, then don't text
      if (isCat) {
        event.cat = true;
        return textMessage.sendMessage(event)
        .then((response) => {
          console.log('This is a CAT! Text message sent successfully!');
          return cb(null, response);
        });
      }

      // don't text if it's not a cat, return the message
      return event;
    })
    .catch((err) => {
      return new Error(err);
    });
  }

  // just return message
  return event;
}

module.exports.sendText = sendText;
