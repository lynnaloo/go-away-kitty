'use strict';

require('../env.js');
const ImageAnalysis = require('../lib/imageAnalysis');
const imageAnalysis = new ImageAnalysis(process.env.VISUAL_RECOGNITION_API_KEY);

function imageLabels(params) {
  const imageUrl = params.url || 'https://raw.githubusercontent.com/lynnaloo/mowgli.ninja/master/mowgli-1.JPG';
  console.log(imageUrl);

  const imageParams = {
    url: imageUrl
  };

  return imageAnalysis.getImageLabels(imageParams)
  .then((labels) => {
    return { Analysis: labels}
  })
  .catch((error) => {
    console.log('Error executing action:', error);
    return error;
  });
}

exports.imageLabels = imageLabels;
