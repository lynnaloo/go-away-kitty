'use strict';

const TextMessage = require('../lib/textMessage');
const ImageAnalysis = require('../lib/imageAnalysis');
const imageAnalysis = new ImageAnalysis();

/**
    Send a text when a message is sent to Amazon IoT
 */
module.exports.sendText = (event, context, cb) => {
  console.log(`message from IoT: ${JSON.stringify(event)}`);

  const textMessage = new TextMessage({
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    toNumber: process.env.TO_NUMBER,
    twilioNumber: process.env.TWILIO_FROM_NUMBER
  });

  // if there's an image, check to see if it's a cat
  if (event.s3) {
    console.log('Starting image analysis');
    return imageAnalysis.isCatImage(event.s3)
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
      return cb(null, event);
    })
    .catch((err) => {
      return cb(null, err);
    });
  }

  // no S3 image, just return message
  return cb(null, event);
};
