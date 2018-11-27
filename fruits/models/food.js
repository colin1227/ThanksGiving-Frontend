const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: String,
    servings: Number,
    image: String,
})

module.exports = mongoose.model('Foods', foodSchema )