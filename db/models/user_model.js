const mongoose = require("mongoose");
const userSchema = require("../schemas/user_schema");

module.exports = mongoose.model('users', userSchema);