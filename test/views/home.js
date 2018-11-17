const { expect } = require('code');
const lab = exports.lab = require('lab').script();
const jsdom = require('jsdom');

const { experiment, before, test } = lab;

const server = require('../../src');

experiment('home', () => {
  let response;

  before(async () => {
    await server.provision();
    response = await server.inject({
      method: 'GET',
      url: '/'
    });
  });

  test('returns a 200 response', () => {
    expect(response.statusCode).to.equal(200);
  });

  test.skip('has an h1 with the title "Short"', () => {
    jsdom.env(response.payload, (err, window) => {
      expect(err).to.equal(null);
      expect(window).to.be.ok;
      var title = window.document.querySelector('h1');
      expect(title).to.be.ok;
      expect(title.innerHTML).to.equal('Short');
    });
  });
});
