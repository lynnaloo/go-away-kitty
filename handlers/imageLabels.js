'use strict';

const ImageAnalysis = require('../lib/imageAnalysis');
const imageAnalysis = new ImageAnalysis();

/**
  Analyse an image on S3 using bucket and image name
 */
module.exports.imageLabels = (event, context, cb) => {
  const data = JSON.parse(event.body);

  const s3Config = {
    bucket: data.bucket,
    imageName: data.imageName
  };

  return imageAnalysis.getImageLabels(s3Config)
  .then((labels) => {
    const response = {
      statusCode: 200,
      body: JSON.stringify({Labels: labels})
    };
    cb(null, response);
  })
  .catch((error) => {
    console.log('Error executing Lambda function:', error);
    cb(null, error);
  });
};
