const mongoose = require('mongoose');

require('dotenv').config();
const uri = process.env.ATLAS_URI;

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log('connected to db');
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = InitiateMongoServer;
