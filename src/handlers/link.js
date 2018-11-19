const { links } = require('../db');
const { phoneHash } = require('../helpers/generator');

/**
 * Take a string hash, and convert it to a regular number.
 * This will keep things lined up, and prevent erroneus input.
 *
 * @param {string} hash - the hash string taken from the request param
 * @returns {number} - the hash, stripped of non-numeric chars, as an int
 */
function parsePhoneHash(hash) {
  const phoneHash = hash.replace(/\D/g,'');
  return parseInt(phoneHash, 10);
}

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
    const phoneHash = parsePhoneHash(hash);
    const link = await links.getByHash(phoneHash);

    if (link) {
      return h.redirect(link.url);
    } else {
      return h.view('not_found', { hash })
        .code(404);
    }
  }
};
