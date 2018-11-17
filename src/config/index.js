const log = require('./log');
const mongo = require('./mongo');

const port = process.env.PORT || '3000';
const host = process.env.HOST || 'localhost';

const server = {
  host,
  port,
  debug: {
    request: ['error']
  },
};

const config = {
  log,
  mongo,
  server,
};

module.exports = config;
