'use strict';

module.exports.hello = (event, context, cb) => {
  cb(null, { message: 'Welcome to the Go Away Kitty Service!', event.body });
};
