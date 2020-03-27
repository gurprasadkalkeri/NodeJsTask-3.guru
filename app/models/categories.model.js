const mongoose = require('mongoose');

const Category = mongoose.Schema({
    category_name: String,
})
module.exports = mongoose.model('categories', Category);