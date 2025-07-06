const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config(); // Load .env variables

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/samacarrapide';

let db;

const connectDB = async () => {
  if (db) {
    return db;
  }
  try {
    const client = new MongoClient(MONGO_URI, {
      useNewUrlParser: true, // Deprecated but often in older examples
      useUnifiedTopology: true, // Deprecated but often in older examples
    });

    await client.connect();
    db = client.db(); // Get default database from URI or specify one: client.db('samacarrapide')
    console.log('MongoDB Connected...');
    return db;
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Exit process with failure
  }
};

const getDB = () => {
  if (!db) {
    throw new Error('DB not initialized. Call connectDB first.');
  }
  return db;
};

module.exports = { connectDB, getDB };
