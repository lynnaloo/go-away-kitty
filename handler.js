'use strict';

module.exports.hello = (event, context, cb) => {
  cb(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};

module.exports.processImage = (event, context, cb) => {
  cb(null, { message: 'Image processed!', event });
};

module.exports.sendText = (event, context, cb) => {
  require('env.js') // this is hacky way to get envs in here

  if (!event.Records) {
    return cb(null, 'No SNS message found.');
  }

  const message = event.Records[0].Sns.Message;
  console.log('Message from SNS:', message);

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const toNumber = process.env.TO_NUMBER;
  const twilioNumber = process.env.TWILIO_FROM_NUMBER;

  const client = require('twilio')(accountSid, authToken);

  //Send an SMS text message
  client.sendMessage({
      to: toNumber,
      from: twilioNumber,
      body: `A kitty was just seen at ${message.timestamp}`
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
