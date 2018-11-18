const { links } = require('../db');
const { phoneHash } = require('../helpers/generator');

module.exports = {
  async create(request, h) {
    const targetUrl = request.payload.url;
    let hash;
    const link = await links.getByUrl(targetUrl);
    if (link) {
      hash = link.hash;
    } else {
      hash = phoneHash(targetUrl);
      await links.createLink(targetUrl, hash);
    }

    const { protocol } = request.server.info;
    const { host } = request.info;
    const url =  `${protocol}://${host}/${hash}`;
    return h.view('short', { url });
  },

  async get(request, h) {
    const { hash } = request.params;
    const link = await links.getByHash(hash);

    if (link) {
      return h.redirect(link.url);
    } else {
      return h.view('not_found', { hash })
        .code(404);
    }
  }
};
