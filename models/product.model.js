const mongoose = require('mongoose');
const { Schema } = mongoose;
const productsSchema = new mongoose.Schema({
    product_name: { type: String,unique: true, required: true },
    price: { type: Number },
    stock: { type: Number }
});

module.exports = mongoose.model('products',productsSchema)