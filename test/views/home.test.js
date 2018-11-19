const lab = exports.lab = require('lab').script();
const { experiment, before, test } = lab;
const { expect } = require('code');
const { JSDOM } = require('jsdom');

const server = require('../../src');

experiment('home', () => {
  before(async () => {
    await server.provision();
  });

  experiment('when I get the homepage', () => {
    let response, window;

    before(async () => {
      response = await server.inject({
        method: 'GET',
        url: '/'
      });
      const dom = new JSDOM(response.payload);
      window = dom.window;
    });

    test('returns a 200 response', () => {
      expect(response.statusCode).to.equal(200);
    });

    test('has an h1 with the title "Short"', () => {
      const title = window.document.querySelector('h1');
      expect(title).to.be.ok;
      expect(title.innerHTML).to.equal('Short');
    });

    test('has an input named "url"', () => {
      const input = window.document.querySelector('input[name="url"]');
      expect(input).to.not.be.null;
      expect(input.value).to.exist;
    });
  });
});
