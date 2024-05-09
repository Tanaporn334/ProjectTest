const mongoose = require('mongoose');
const { Schema } = mongoose;
const ordersSchema = new mongoose.Schema({
    order_name: { type: String },
    amount: { type: Number },
    id_product: { type: String }
});

module.exports = mongoose.model('orders',ordersSchema)