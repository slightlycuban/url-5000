const Hapi = require('hapi');
const config = require('./config');
const plugins = require('./plugins');

const server = Hapi.server(config.server);

let ready = false;
async function provision() {
  if (!ready) {
    await server.register(plugins);
    server.views(config.views);
    ready = true;
  }
}

module.exports = server;
module.exports.provision = provision;
