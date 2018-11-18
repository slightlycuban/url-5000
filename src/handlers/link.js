const { phoneHash } = require('../helpers/generator');

module.exports = {
  create(request, h) {
    const { protocol } = request.server.info;
    const { host } = request.info;
    const targetUrl = request.payload.url;
    const hash = phoneHash(targetUrl);
    return h.view('short', { url: `${protocol}://${host}/${hash}`});
  },

  get(_, h) {
    return h.redirect('http://example.com/');
  }
};
