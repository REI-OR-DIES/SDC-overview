const mongoose = require('mongoose');

const uri = process.env.MONGODBURL || 'mongodb://localhost/sdc-overview';

let db;

(async () => {
  try {
    db = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (e) {
    console.log(e);
  }
})();

const disconnect = () => db.disconnect();

module.exports.disconnect = disconnect;
