const links = require('../handlers/link');

module.exports = [{
  path: '/link',
  method: 'POST',
  handler: links.create
}, {
  path: '/{hash}',
  method: 'GET',
  handler: links.get
}];
