const { MongoClient } = require('mongodb');

const config = require('../config');

let _client;
async function connect() {
  const { url, opts, dbName } = config.mongo;
  if (!_client) {
    const mongoClient = new MongoClient(url, opts);
    _client = await mongoClient.connect();
  }

  return _client.db(dbName);
}

function disconnect() {
  if (_client) {
    _client.close();
  }
}

module.exports = {
  connect,
  disconnect,
};
