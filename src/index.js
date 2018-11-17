'use strict';

const Hapi = require('hapi');
const mongo = require('hapi-mongojs');
const config = require('./config');

const server = Hapi.server(config.server);

const plugins = [{
  register: require('good'),
  options: config.log,
}, {
  register: require('vision')
}, {
  register: mongo,
  options: config.mongo
}, {
  register: require('hapi-router'),
  options: { routes: 'src/routes/*.js' }
}];

server.register(plugins, (err) => {
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

});

module.exports = server;
