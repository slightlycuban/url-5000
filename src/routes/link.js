const links = require('../handlers/link');

module.exports = [{
  path: '/',
  method: 'POST',
  handler: links.create
}];
