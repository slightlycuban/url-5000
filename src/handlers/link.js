const { phoneHash } = require('../helpers/generator');

module.exports = {
  create(request, reply) {
    const { protocol } = request.server.info;
    const { host } = request.info;
    const targetUrl = request.payload.url;
    const hash = phoneHash(targetUrl);
    return reply.view('short', { url: `${protocol}://${host}/${hash}`});
  }
};
