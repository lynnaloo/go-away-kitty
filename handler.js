'use strict';

const moment = require('moment-timezone');
const AWS = require('aws-sdk');
const sns = new AWS.SNS();
require('env.js')

module.exports.hello = (event, context, cb) => {
  cb(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};

/**
    Send Kitty detection data to the Amazon SNS Topic
 */
module.exports.reportKitty = (event, context, cb) => {
  const now = moment().tz('America/New_York').format('LLL');

  sns.publish({
    Message: JSON.stringify({ 'motion': true, 'timestamp': now}),
    TopicArn: process.env.AWS_SNS_TOPIC
  }, function (err, data) {
    if (err) {
      console.log(`Error publishing to topic ${process.env.AWS_SNS_TOPIC}: err.stack`);
      return cb(err, null);
    }
    console.log(data);
    return cb(null, 'Message published');
  });
};

/**
    Send a text when a message is sent to the Amazon SNS Topic
 */
module.exports.sendText = (event, context, cb) => {
  if (!event.Records) {
    console.log(`event: ${event}`);
    return cb(null, 'No SNS message found.');
  }

  const message = event.Records[0].Sns.Message;
  const motionData = JSON.parse(message);

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const toNumber = process.env.TO_NUMBER;
  const twilioNumber = process.env.TWILIO_FROM_NUMBER;
  const client = require('twilio')(accountSid, authToken);

  console.log(`message from SNS: ${message}`);

  //Send an SMS text message
  client.sendMessage({
      to: toNumber,
      from: twilioNumber,
      body: `A kitty was just seen at ${motionData.timestamp}`
  }, function (err, responseData) {
    if (err) {
      // throw an error
      console.log('uh oh', err);
      return cb(null, `This SMS message was not sent due to errors: #{err}`);
    }

    console.log(responseData.from); // outputs from number
    console.log(responseData.body); // outputs message
    return cb(null, message);
  });
};
