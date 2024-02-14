const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.DB_URI;

const connectToMongo = async () => {
    try {
        // console.log("--",mongoURI)
        await mongoose.connect(mongoURI, {
            // Remove the useNewUrlParser and useUnifiedTopology options
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
};

module.exports = connectToMongo;
