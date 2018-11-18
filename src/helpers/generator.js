const crypto = require('crypto');

module.exports = {
  /**
   * Create a hash in a 10-digit US phone number.
   * This really isn't secure, just easy to remember.
   * @param {string} toHash - text to hash
   * @returns {string} - phone number generated from hashed thing
   */
  phoneHash(toHash) {
    let hash = crypto.createHash('SHA256');
    hash.update(toHash);
    let hex = hash.digest('hex');
    return parseInt(hex, 16) % 10000000000;
  }
};
