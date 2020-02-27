const mongoose = require('mongoose');

var {Schema, Number} = mongoose; 

const userSchema = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
});

const User = mongoose.model('User', userSchema);
//Check out - https://mongoosejs.com/docs/guide.html#models
module.exports = User;