'use strict';

require('../env.js');
const _ = require('lodash');
const TextMessage = require('../lib/textMessage');
const ImageAnalysis = require('../lib/imageAnalysis');
const imageAnalysis = new ImageAnalysis(process.env.VISUAL_RECOGNITION_API_KEY);

/**
    Send a text if a detection sent from the IoT Platform is identified
    as a cat.
    Example detection:
    {
      "message": {
        "timestamp": "June 11, 2017 8:26 PM",
        "url": "https://s3.amazonaws.com/kitty-detections/cat-123.jpg",
        "motion": true
      }
    }
 */
function sendText(params) {
  const message = params.message ? JSON.parse(params.message) : {};
  const detection = _.pick(message, ['motion', 'url', 'timestamp']);
  console.log(`Message from IoT: ${JSON.stringify(detection)}`);

  const textMessage = new TextMessage({
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    toNumber: process.env.TO_NUMBER,
    twilioNumber: process.env.TWILIO_FROM_NUMBER
  });

  // if there's an image, check to see if it's a cat
  return imageAnalysis.isCatImage(detection)
  .then((isCat) => {
    // if it's not a cat, then don't text
    if (isCat) {
      detection.cat = true;
      return textMessage.sendMessage(detection)
      .then((response) => {
        console.log('detection:', detection);
        return { message: detection };
      });
    }
    return { message: detection };
  })
  .catch((err) => {
    return new Error(err);
  });
}

module.exports.sendText = sendText;
