
require('dotenv').config()
const { parse, types } = require('mapofenv');
const { string, number } = types;

const mapping = {
  auth: {
    header: string('x-auth-token'),
    expiry: number(7 * 24 * 3600 * 1000),
  },

  mongo: {
    host: string('localhost'),
    port: number(27017),
    db: string('chat'),
  },

  secret: string('secret'),
};


const config = parse(mapping, {
  prefix: ['CHAT'],
});

module.exports = config;