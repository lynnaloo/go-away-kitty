'use strict';

const assert = require('assert');
const TextMessage = require('../lib/textMessage');
const _ = require('lodash');

describe('image-analysis', () => {
  describe('instantiation', () => {
    it('make new imageAnalysis', () => {
      const text = new TextMessage({
        accountSid: '1234',
        authToken: '1234',
        toNumber: '1234567',
        twilioNumber: '4567890'
      });

      assert(text.client);
      assert(text.toNumber);
      assert(text.twilioNumber);
      assert(_.isFunction(text.sendMessage));
    });
  });
});
