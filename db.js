require('dotenv').config()
const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        console.log(process.env.DATABASE_URL);
        await mongoose.connect(process.env.DATABASE_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        console.log("Connected to DB")
    } catch (err) {
        console.error("An error occurred while connecting to the DB:", err.message)
    }
}

module.exports = connectDB;
