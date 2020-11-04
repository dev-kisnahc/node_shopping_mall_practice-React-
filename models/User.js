const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 30,
        required: true
    },
    lastname: {
        type: String,
        maxlength: 30,
        required: true
    },
    email: {
        type: String,
        maxlength: 50,
        unique: 1,
        required: true
    },
    password: {
        type: String,
        minlength: 7,
        required: true
    },
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

module.exports = mongoose.model("User", userSchema)