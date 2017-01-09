'use strict';

const TextMessage = require('../lib/textMessage');

/**
    Send a text when a message is sent to the Amazon SNS Topic
 */
module.exports.sendText = (event, context, cb) => {
  if (!event.Records) {
    console.log(`event: ${event}`);
    return cb(null, 'No SNS message found.');
  }

  const message = event.Records[0].Sns.Message;
  const textMessage = new TextMessage({
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    toNumber: process.env.TO_NUMBER,
    twilioNumber: process.env.TWILIO_FROM_NUMBER
  });

  console.log(`message from SNS: ${JSON.stringify(message)}`);

  return textMessage.sendMessage(message)
  .then((message) => {
    return cb(null, message);
  })
  .catch((err) => {
    return cb(null, err);
  });
};
