'use strict';

const Twilio = require('twilio');

class TextMessage {
  constructor(twilioConfig) {
    this.config = twilioConfig;
    this.toNumber = twilioConfig.toNumber;
    this.twilioNumber = twilioConfig.twilioNumber;
  }

  sendMessage(message) {
    const motionData = message || {};
    const client = Twilio(this.config.accountSid, this.config.authToken);

    return new Promise((resolve, reject) => {
      const smsParams = {
        to: this.toNumber,
        from: this.twilioNumber,
        body: `A cat was seen at ${motionData.timestamp}. See the cat here: ${motionData.url}`
      };

      client.sendMessage(smsParams, (err, responseData) => {
        if (err) {
          console.log('This SMS message was not sent due to errors:', err);
          return reject(new Error('This SMS message was not sent due to errors: #{err}'));
        }
        return resolve('The SMS message was sent successfully!');
      });
    });
  }
}

module.exports = TextMessage;
