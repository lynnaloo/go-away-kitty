'use strict';

const _ = require('lodash');
const AWS = require('aws-sdk');
const rek = new AWS.Rekognition();

class ImageAnalysis {

  getImageLabels(s3Config) {
    const params = {
      Image: {
        S3Object: {
          Bucket: s3Config.bucket,
          Name: s3Config.imageName
        }
      },
      MaxLabels: 15,
      MinConfidence: 55
    };
    return new Promise((resolve, reject) => {
      rek.detectLabels(params, (err, data) => {
        if (err) {
          console.log(err, err.stack);
          return reject(new Error(err));
        }
        console.log('Analysis labels:', data.Labels);
        return resolve(data.Labels);
      });
    });
  }

  // Check to see if "Cat" is included in the labels
  findCat(labels) {
    return _.find(labels, ['Name', 'Cat']);
  }

  isCatImage(s3Config) {
    return this.getImageLabels(s3Config)
    .then((labels) => {
      return !!this.findCat(labels);
    });
  }
}

module.exports = ImageAnalysis;
