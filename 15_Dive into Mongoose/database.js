const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CLI);
        console.log("Database connected!");
    }
    catch (err) {
        console.log("Database is not connected!")
    }
}

module.exports = connectDB;