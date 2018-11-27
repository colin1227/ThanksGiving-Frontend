const mongoose = require('mongoose');
const Food = require('../models/food');

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

module.exports = mongoose.model('Users', userSchema);