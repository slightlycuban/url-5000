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
  register: require('hapi-router'),
  options: { routes: 'routes/*.js' }
}, {
  register: require('good'),
  options: logConfig
}], (err) => {
  if (err) { throw err; }

	server.start(() => {
		console.log('Server running at:', server.info.uri);
	});
});
