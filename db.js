const mongoose = require('mongoose');
require('dotenv').config();
// Define the mongo Db connection url
const mongoURL = process.env.MONGODB_URL_LOCAL;
// const mongoURL = process.env.MONGODB_URL;

// Setup mongodb connection
mongoose.connect(mongoURL)
    .then(() => {
        console.log("Connected to MongoDB server");
    })
    .catch((err) => {
        console.log("MongoDB connection error", err);
    });

// Get default connection
const db = mongoose.connection;

// Define event listeners
db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

// Export the database connection
module.exports = db;
