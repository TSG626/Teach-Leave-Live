const mongoose = require('mongoose');

var {Schema, Number} = mongoose; 

const userSchema = new Schema({
    username: {
        type: String, 
        required: true,
        unique: true
    },
    email: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    admin: {
        type: Boolean, 
        default: false
    },
    firstname: {
        type: String, 
        required: true
    },
    lastname: {
        type: String, 
        required: true
    },
    reference: {
        type: String, 
        required: false
    },
    email_verified: {
        type: Boolean,
        default: false
    },
    key_for_verify: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);
//Check out - https://mongoosejs.com/docs/guide.html#models
module.exports = User;