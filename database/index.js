const mongoose = require('mongoose');

const uri = 'mongodb://localhost/fec-productoverview';

let db;

(async () => {
  db = await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
})();

const disconnect = () => db.disconnect();

module.exports.disconnect = disconnect;
