const mongoose = require('mongoose');
const { Schema } = mongoose;
const registerSchema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String },
    approve: { type: Boolean  }
});

module.exports = mongoose.model('register',registerSchema)