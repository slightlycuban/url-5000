/*jshint expr: true */
const Code = require('code');
const Lab = require('lab');
const expect = Code.expect;
const lab = exports.lab = Lab.script();

const generator = require('../../src/helpers/generator');

lab.experiment('Generator', () => {
  lab.experiment('phoneHash', () => {
    var url = 'http://mtrac.co/';
    var phoneNumber;

    lab.before((done) => {
      phoneNumber = generator.phoneHash(url);
      done();
    });

    lab.test('creates a phone-like hash of the url', (done) => {
      expect(phoneNumber).to.equal(4027526144);
      done();
    });
  });
});
