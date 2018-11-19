const lab = exports.lab = require('lab').script();
const { experiment, before, after, test } = lab;
const { expect } = require('code');
const { JSDOM } = require('jsdom');
const sinon = require('sinon').createSandbox();

const server = require('../../src');
const { links } = require('../../src/db');

experiment('create', () => {
  before(async () => {
    await server.provision();
  });

  after(() => {
    sinon.restore();
  });

  experiment('when I post a new url', () => {
    const mtracHash = 811125760;
    const mtracUrl = 'http://mtrac.co';
    let response, window;
    before(async () => {
      sinon.stub(links, 'createLink');
      response = await server.inject({
        method: 'POST',
        url: '/',
        payload: {
          url: mtracUrl
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
        sinon.stub(links, 'getByHash').resolves({
          url: mtracUrl,
          hash: mtracHash
        });
        response = await server.inject({
          method: 'GET',
          url: `/${mtracHash}`,
        });
      });

      test('should do a redirect', () => {
        expect(response.statusCode).to.equal(302);
      });

      test('should lookup the link by has', () => {
        sinon.assert.calledWith(links.getByHash, mtracHash);
      });
    });
  });
});
