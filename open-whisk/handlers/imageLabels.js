'use strict';

require('../env.js');
const ImageAnalysis = require('../lib/imageAnalysis');
const imageAnalysis = new ImageAnalysis(process.env.VISUAL_RECOGNITION_API_KEY);

function imageLabels(params) {
  console.log(`Message from IoT: ${JSON.stringify(params)}`);

  return imageAnalysis.getImageLabels(params)
  .then((labels) => {
    return { Analysis: labels};
  })
  .catch((error) => {
    console.log('Error executing action:', error);
    return new Error(error);
  });
}

exports.imageLabels = imageLabels;
