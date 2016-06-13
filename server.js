'use strict';

const Hapi = require('hapi');
const logConfig = require('./config/log');

const server = new Hapi.Server({
  debug: {
    request: ['error']
  }
});

server.connection({ port: 3000 });

server.register([{
  register: require('good'),
  options: logConfig
}, {
  register: require('vision')
}, {
  register: require('hapi-router'),
  options: { routes: 'routes/*.js' }
}], (err) => {
  if (err) { throw err; }

  server.views({
    engines: {
      html: require('handlebars')
    },
    relativeTo: __dirname,
    path: './templates',
    layout: true,
    layoutPath: './templates/layouts'
  });

	server.start(() => {
		console.log('Server running at:', server.info.uri);
	});
});
