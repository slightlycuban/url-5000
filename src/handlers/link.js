'use strict';

module.exports = {
  create(request, reply) {
    reply.view('short', { url: '#' });
  }
};
