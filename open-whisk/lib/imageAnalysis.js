'use strict';

const _ = require('lodash');
const VisualRecognition = require('watson-developer-cloud/visual-recognition/v3');

class ImageAnalysis {
  constructor(key) {
    this.key = key;
  }

  getImageLabels(imageParams) {
    const visualRecognition = new VisualRecognition({
      api_key: this.key,
      version_date: VisualRecognition.VERSION_DATE_2016_05_20
    });

    return new Promise((resolve, reject) => {
      return visualRecognition.classify(imageParams, (err, res) => {
        if (err) {
          console.log(err);
          return reject(new Error(err));
        } else {
          const classes = _.get(res, 'images[0].classifiers[0].classes', []);
          console.log('Analysis:', classes);
          return resolve(classes);
        }
      });
    });
  }

  // Check to see if "cat" is included in the labels
  findCat(classes) {
    const catScore = _.find(classes, ['class', 'cat']);
    console.log('Cat Score:', catScore ? catScore : 'None');
    return catScore;
  }

  isCatImage(imageParams) {
    return this.getImageLabels(imageParams)
    .then((labels) => {
      return !!this.findCat(labels);
    });
  }
}

module.exports = ImageAnalysis;
