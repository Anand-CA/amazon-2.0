const mongoClient = require("mongodb").MongoClient;
const state = {
  db: null,
};

module.exports.connect = function (done) {
  const url =
    "mongodb+srv://test:test123@cluster0.kif5r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  const dbname = "amazon";

  mongoClient.connect(url, { useUnifiedTopology: true }, (err, data) => {
    if (err) return done(err);
    state.db = data.db(dbname);
    done();
  });
};

module.exports.get = () => {
  return state.db;
};
