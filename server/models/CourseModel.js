const mongoose = require('mongoose');

var {Schema, Number} = mongoose;

const courseSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    author: [{
        type: String,
        required: true
    }],
    description: {
        type: String,
        required: true
    },
    free: {
        type: Boolean,
        required: true,
        default: true
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    modules: [Object],
    last_updated: {
        type: Date,
        default: Date.now
    },
    published: {
        type: Boolean,
        default: false
    }
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
