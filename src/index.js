const Hapi = require('hapi');
const config = require('./config');

const server = Hapi.server(config.server);

module.exports = server;
