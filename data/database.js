const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;

const mongodbUri = process.env.MONGODB_URI;
let database;

const initDb = (callback) => {
    if (database) {
      console.log('Db is already initialized!');
      return callback(null, database);
    }
    MongoClient.connect(process.env.MONGODB_URI)
      .then((client) => {
        database = client;
        callback(null, database);
      })
      .catch((err) => {
        callback(err);
      });
};

const getDatabase = () => {
    if(!database){
        throw error('Database not initialized');
    } 
    return database;
};

module.exports = {
    initDb,
    getDatabase
}