const Hapi = require('hapi');
const config = require('./config');
const plugins = require('./plugins');

const server = Hapi.server(config.server);

async function provision() {
  await server.register(plugins);

  server.views(config.views);
}

module.exports = server;
module.exports.provision = provision;
