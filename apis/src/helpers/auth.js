
const config = require('../config');
const jwt = require('jsonwebtoken');


exports.encode = function (payload, options = {}) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, config.get('secret'), {
      expiresIn: config.get('auth.expiry') / 1000,
      ...options,
    }, (err, token) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(token);
    });
  });
}


exports.decode = function (token, options = {}) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.get('secret'), {
      ...options,
    }, (err, payload) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(payload);
    });
  });
}

