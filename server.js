const server = require('./src');
const plugins = require('./src/plugins');
const config = require('./src/config');

async function start() {

  await server.register(plugins);

  server.views(config.views);

  try {
    await server.start();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  console.info('Server running at:', server.info.uri);
}

start();
