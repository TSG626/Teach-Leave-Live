const mongoose = require('mongoose');

var {Schema, Number} = mongoose;

const passwordResetSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    passwordResetCode: {
        type: String,
        required: false
    },
    passwordResetAttempts: {
        type: Number,
        required: false
    },
});

const PasswordReset = mongoose.model('PasswordReset', passwordResetSchema);
//Check out - https://mongoosejs.com/docs/guide.html#models
module.exports = PasswordReset;