module.exports = {
  create(_, reply) {
    return reply.view('short', { url: '#' });
  }
};
