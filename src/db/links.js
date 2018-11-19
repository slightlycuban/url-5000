const { connect } = require('./mongo');

const linkCollection = 'links';

async function _getCollection() {
  const db = await connect();
  return db.collection(linkCollection);
}

async function _findOne(query) {
  const collection = await _getCollection();
  const links = await collection
    .find(query)
    .limit(1)
    .toArray();
  return links[0];
}

function getByHash(hash) {
  return _findOne({ hash });
}

function getByUrl(url) {
  return _findOne({ url });
}

async function createLink(url, hash) {
  // TODO: really need to add some validation here
  const collection = await _getCollection();
  return await collection.insertOne({ url, hash });
}

module.exports = {
  COLLECTION: linkCollection,
  getByHash,
  getByUrl,
  createLink,
};
