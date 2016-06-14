/*jshint expr: true */
const Code = require('code');
const Lab = require('lab');
const expect = Code.expect;
const lab = exports.lab = Lab.script();
const jsdom = require('jsdom');

const server = require('../../src');

lab.experiment('home', () => {
  var response;

  lab.before((done) => {
    server.inject({
      method: 'GET',
      url: '/'
    }).then((res) => {
      response = res;
      done();
    }).catch(done);
  });

  lab.test('returns a 200 response', (done) => {
    expect(response).to.be.ok;
    expect(response.statusCode).to.equal(200);
    done();
  });

  lab.test('has an h1 with the title "Short"', (done) => {
    jsdom.env(response.payload, (err, window) => {
      expect(err).to.equal(null);
      expect(window).to.be.ok;
      var title = window.document.querySelector('h1');
      expect(title).to.be.ok;
      expect(title.innerHTML).to.equal('Short');
      done();
    });
  });
});
