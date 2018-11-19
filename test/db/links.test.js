const lab = exports.lab = require('lab').script();
const { experiment, before, after, test } = lab;
const { expect } = require('code');

const { connect, links } = require('../../src/db');

experiment('links db', () => {
  after(async () => {
    const db = await connect();
    await db.dropCollection(links.COLLECTION);
  });

  experiment('creating a link', () => {
    const exampleUrl = 'example.com';
    const exampleHash = 8005554444;
    let created;
    before(async () => {
      created = await links.createLink(exampleUrl, exampleHash);
    });

    test('creates a single link', () => {
      expect(created).to.be.ok;
      expect(created.insertedCount).to.equal(1);
    });

    experiment('and then getting link by hash', () => {
      let hashLink;
      before(async () => {
        hashLink = await links.getByHash(exampleHash);
      });

      test('finds a single link', () => {
        expect(hashLink).to.be.ok;
        expect(hashLink.url).to.equal(exampleUrl);
      });
    });

    experiment('and then getting link by hash', () => {
      let urlLink;
      before(async () => {
        urlLink = await links.getByUrl(exampleUrl);
      });

      test('finds a single hash for that link', () => {
        expect(urlLink).to.be.ok;
        expect(urlLink.hash).to.equal(exampleHash);
      });
    });
  });
});
