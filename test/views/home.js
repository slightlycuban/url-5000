const { expect } = require('code');
const lab = exports.lab = require('lab').script();
const jsdom = require('jsdom');

const { experiment, before, test } = lab;

const server = require('../../src');

experiment.skip('home', () => {
  var response;

  before(() => {
    return server.inject({
      method: 'GET',
      url: '/'
    }).then((res) => {
      response = res;
    });
  });

  test('returns a 200 response', () => {
    expect(response).to.be.ok;
    expect(response.statusCode).to.equal(200);
  });

  test('has an h1 with the title "Short"', () => {
    jsdom.env(response.payload, (err, window) => {
      expect(err).to.equal(null);
      expect(window).to.be.ok;
      var title = window.document.querySelector('h1');
      expect(title).to.be.ok;
      expect(title.innerHTML).to.equal('Short');
    });
  });
});
