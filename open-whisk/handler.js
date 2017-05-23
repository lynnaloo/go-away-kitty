'use strict';

function imageLabels(params) {
  const imageUrl = params.url || 'https://raw.githubusercontent.com/lynnaloo/mowgli.ninja/master/mowgli-1.JPG';
  return { payload: imageUrl };
}

exports.imageLabels = imageLabels;
