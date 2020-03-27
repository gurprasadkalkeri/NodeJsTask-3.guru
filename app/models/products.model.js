const mongoose = require('mongoose');

const Product = mongoose.Schema({
    category_id: String,
    product_name: String,
    product_price: Number,
});
module.exports = mongoose.model('products', Product);