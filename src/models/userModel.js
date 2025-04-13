const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    fname: {
        type: String
    },
    sname: {
        type: String
    },
    username: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model("User", userSchema)