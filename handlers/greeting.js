'use strict';

module.exports.hello = (event, context, cb) => {
  const data = JSON.parse(event.body);
  cb(null, { message: 'Welcome to the Go Away Kitty Service!', data: data });
};
