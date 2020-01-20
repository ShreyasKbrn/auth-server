const mongoose = require("mongoose");
const Validator = require("validator");

let userSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        validate : function (value) {
            return Validator.isEmail(value);
        }
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: 'https://image.flaticon.com/icons/png/512/21/21294.png'
    }
});

module.exports = userSchema;