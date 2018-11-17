//const mongo = require('hapi-mongojs');
const config = require('../config');
const Vision = require('vision');
const router = require('hapi-router');
const good = require('good');

const plugins = [{
  plugin: good,
  options: config.log,
}, {
  plugin: Vision,
  options: {},
//}, {
//  plugin: mongo,
//  options: config.mongo,
}, {
  plugin: router,
  options: { routes: 'src/routes/*.js' },
}];

module.exports = plugins;
