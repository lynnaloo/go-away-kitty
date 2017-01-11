'use strict';

const TextMessage = require('../lib/textMessage');
const ImageAnalysis = require('../lib/imageAnalysis');
const imageAnalysis = new ImageAnalysis();

/**
    Send a text when a message is sent to the Amazon SNS Topic
 */
module.exports.sendText = (event, context, cb) => {
  if (!event.Records) {
    console.log(`event: ${event}`);
    return cb(null, 'No SNS message found.');
  }

  const message = event.Records[0].Sns.Message;
  console.log(`message from SNS: ${JSON.stringify(message)}`);

  const textMessage = new TextMessage({
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    toNumber: process.env.TO_NUMBER,
    twilioNumber: process.env.TWILIO_FROM_NUMBER
  });

  // if there's an image, check to see if it's a cat
  if (message.s3) {
    return imageAnalysis.isCatImage(message.s3)
    .then((isCat) => {
      // if it's not a cat, then don't text
      if (isCat) {
        message.cat = true;
        return textMessage.sendMessage(message)
        .then((message) => {
          return cb(null, message);
        });
      }
      return cb(null, message);
    })
    .catch((err) => {
      console.log('Error executing Lambda', err);
      return cb(null, err);
    });

  }

  return textMessage.sendMessage(message)
  .then((message) => {
    return cb(null, message);
  })
  .catch((err) => {
    console.log('Error executing Lambda', err);
    return cb(null, err);
  });
};
