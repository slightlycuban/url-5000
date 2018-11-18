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
    const mtracHash = 811125760;
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
      expect(anchor.innerHTML).to.equal(`http://localhost:3000/${mtracHash}`);
    });

    experiment('and then get said url', () => {
      before(async () => {
        response = await server.inject({
          method: 'GET',
          url: `/${mtracHash}`,
        });
      });

      test('should do a redirect', () => {
        expect(response.statusCode).to.equal(302);
      });
    });
  });
});
