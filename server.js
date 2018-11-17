const server = require('./src');

async function start() {

  try {
    await server.provision();
    await server.start();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  console.info('Server running at:', server.info.uri);
}

start();
