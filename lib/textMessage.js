'use strict';

const Twilio = require('twilio');

class TextMessage {
  constructor(twilioConfig) {
    this.client = Twilio(twilioConfig.accountSid, twilioConfig.authToken);
    this.toNumber = twilioConfig.toNumber;
    this.twilioNumber = twilioConfig.twilioNumber;
  }

  sendMessage(message) {
    const motionData = message || {};
    return new Promise((reject, resolve) => {
      return this.client.sendMessage({
          to: this.toNumber,
          from: this.twilioNumber,
          body: `A kitty was just seen at ${motionData.timestamp}`
      }, function (err, responseData) {
        if (err) {
          // throw an error
          console.log('uh oh', err);
          return reject(null, 'This SMS message was not sent due to errors: #{err}');
        }

        console.log(responseData.from); // outputs from number
        console.log(responseData.body); // outputs message
        return resolve(null, message);
      });
    });
  }
}

module.exports = TextMessage;
