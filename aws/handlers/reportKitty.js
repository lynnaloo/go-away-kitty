'use strict';

const AWS = require('aws-sdk');
const sns = new AWS.SNS();
const moment = require('moment-timezone');
const now = moment().tz('America/New_York').format('LLL');

/**
    Send Kitty detection data to the Amazon SNS Topic
 */
module.exports.reportKitty = (event, context, cb) => {
  sns.publish({
    Message: JSON.stringify({ 'motion': true, 'timestamp': now, 'cat': true}),
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
