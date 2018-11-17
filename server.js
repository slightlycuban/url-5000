const server = require('./src');
const plugins = require('./src/plugins');
const handlebars = require('handlebars');

async function start() {

  await server.register(plugins);

  server.views({
    engines: {
      html: handlebars
    },
    relativeTo: __dirname,
    path: './templates',
    layout: true,
    layoutPath: './templates/layouts'
  });

  try {
    await server.start();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  console.info('Server running at:', server.info.uri);
}

start();
