'use strict';

const VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');

function imageLabels(params) {
  const imageUrl = params.url || 'https://raw.githubusercontent.com/lynnaloo/mowgli.ninja/master/mowgli-1.JPG';

  const visualRecognition = new VisualRecognitionV3({
    api_key: process.env.VISUAL_RECOGNITION_API_KEY,
    version_date: VisualRecognitionV3.VERSION_DATE_2016_05_20
  });

  const imageParams = {
    url: imageUrl
  };

  console.log(`Beginning analysis of ${imageUrl}`);
  return visualRecognition.classify(imageParams, (err, res) => {
    if (err) {
      console.log(err);
      return err;
    } else {
      console.log(`Analysis complete of ${imageUrl}`);
      console.log(JSON.stringify(res, null, 2));
      return { payload: JSON.stringify(res, null, 2) };
    }
  });
}

exports.imageLabels = imageLabels;
