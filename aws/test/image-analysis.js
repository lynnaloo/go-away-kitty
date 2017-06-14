'use strict';

const assert = require('assert');
const ImageAnalysis = require('../lib/imageAnalysis');
const _ = require('lodash');

describe('image-analysis', () => {
  describe('instantiation', () => {
    it('make new imageAnalysis', () => {
      const analysis = new ImageAnalysis();

      assert(_.isFunction(analysis.getImageLabels));
      assert(_.isFunction(analysis.findCat));
      assert(_.isFunction(analysis.isCatImage));
    });

    it('test findCat', () => {
      const analysis = new ImageAnalysis();

      assert(analysis.findCat([{ Confidence: 99, Name: 'Cat'}]));
      assert(_.isUndefined(analysis.findCat([{ Confidence: 99, Name: 'People'}])));
    });
  });
});
