require('dotenv').config();

const mongoose = require('mongoose');

const connectDb = () => {
  const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_DOCKER_PORT, MONGODB_DATABASE } = process.env;

  const options = {
    useNewUrlParser: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    connectTimeoutMS: 10000
  };

  const url = `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@db:${MONGODB_DOCKER_PORT}/${MONGODB_DATABASE}?authSource=admin`;

  return mongoose.connect(url, options).then(function () {
    console.log('MongoDB is connected');
  });
};

module.exports = connectDb;
