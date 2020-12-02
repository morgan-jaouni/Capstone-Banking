const mongoose = require('mongoose');
const User = require('./User');


const tranSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    amount: {
        type: Number,
      },
      
}, {timestamps: true});




const Tran = module.exports = mongoose.model('Tran', tranSchema);