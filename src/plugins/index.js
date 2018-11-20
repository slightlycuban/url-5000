const config = require('../config');
const Vision = require('vision');
const router = require('hapi-router');
const good = require('good');
const hapiError = require('hapi-error');

const plugins = [{
  plugin: good,
  options: config.log,
}, {
  plugin: Vision,
  options: {},
}, {
  plugin: router,
  options: { routes: 'src/routes/*.js' },
}, {
  plugin: hapiError
}];

module.exports = plugins;
