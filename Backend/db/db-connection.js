const mongoose = require("mongoose");

const connectDB = async (url)=>{
    try {
        await mongoose.connect(url);
        console.log("CONNECTED")
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;