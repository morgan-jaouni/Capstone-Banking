const mongoose = require('mongoose');




const userSchema = new mongoose.Schema({
    name:  { type: String, required: true, },
    username:  { type: String, required: true},
    password:  { type: String, required: true },
    email:  { type: String, required: true },
    money:  { type: Number, required: true , default: 10000},
    image_url:  { type: String },
});

const User = module.exports = mongoose.model('User', userSchema);

