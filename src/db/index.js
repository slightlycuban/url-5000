const { connect, disconnect } = require('./mongo');
const links = require('./links');

module.exports = {
  connect,
  disconnect,
  links,
};
