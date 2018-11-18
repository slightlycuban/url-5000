const links = require('../handlers/link');

module.exports = [{
  path: '/',
  method: 'POST',
  handler: links.create
}, {
  path: '/{hash}',
  method: 'GET',
  handler: links.get
}];
