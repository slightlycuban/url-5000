const env = process.env;

module.exports = {
  url: env.MONGO_URL || 'mongodb://localhost:27017',
  dbName: 'short',
  opts: {
    useNewUrlParser: true,
  },
};
