const lab = exports.lab = require('lab').script();
const { experiment, before, test } = lab;
const { expect } = require('code');
const { JSDOM } = require('jsdom');

const server = require('../../src');

experiment('create', () => {
  before(async () => {
    await server.provision();
  });

  experiment('when I post a new url', () => {
    let response, window;
    before(async () => {
      response = await server.inject({
        method: 'POST',
        url: '/',
        payload: {
          url: 'http://mtrac.co'
        }
      });
      const dom = new JSDOM(response.payload);
      window = dom.window;
    });

    test('returns a 200 response', () => {
      expect(response.statusCode).to.equal(200);
    });

    test('has an "a" tag with a url in it', () => {
      const anchor = window.document.querySelector('a');
      expect(anchor).to.be.ok;
      expect(anchor.innerHTML).to.equal('#');
    });
  });
});
