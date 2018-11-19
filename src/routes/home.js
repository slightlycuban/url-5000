const fs = require('fs');

const favicon = `${__dirname}/../templates/favicon.ico`;

module.exports = [{
  path: '/',
  method: 'GET',
  handler: {
    view: 'index'
  }
}, {
  path: '/favicon.ico',
  method: 'GET',
  handler: (_, h) => {
    return h.response(fs.createReadStream(favicon))
      .code(200)
      .type('image/x-icon');
  }
}];
