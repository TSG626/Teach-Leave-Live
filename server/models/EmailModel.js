const mongoose = require('mongoose');

var {Schema, Number} = mongoose;

const emailSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
});

const Email = mongoose.model('Email', emailSchema);
module.exports = Email;
