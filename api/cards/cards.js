const mongoose = require('mongoose');
const { Schema } = mongoose;

const cardModel = mongoose.model('cards', new Schema({ 
    type: String,
    text: String,
    title: String,
}));

module.exports = { cardModel };
