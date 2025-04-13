const mongoose = require("mongoose");
require('dotenv').config()


const connectDB = async () => { 
    try {
        await mongoose.connect(process.env.DATABASE,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log("MongoDb database got connected successfully")
    } catch (error) {
        console.error("Database Connection error", error)
        process.exit(1);
    }
}

module.exports = connectDB


