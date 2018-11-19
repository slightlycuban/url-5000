const { expect } = require('code');
const lab = exports.lab = require('lab').script();
const { experiment, before, test } = lab;

const generator = require('../../src/helpers/generator');

experiment('Generator', () => {
  experiment('phoneHash', () => {
    let url = 'http://mtrac.co/';
    let phoneNumber;

    before(() => {
      phoneNumber = generator.phoneHash(url);
    });

    test('creates a phone-like hash of the url', () => {
      expect(phoneNumber).to.equal(4027526144);
    });
  });
});
