const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 30,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        maxlength: 30,
        required: true,
        trim: true
    },
    email: {
        type: String,
        maxlength: 50,
        trim: true,
        unique: 1,
        required: true
    },
    password: {
        type: String,
        minlength: 7,
        required: true,
        trim: true
    },
    token: {
        type: String,
    }
})

module.exports = mongoose.model("User", userSchema)