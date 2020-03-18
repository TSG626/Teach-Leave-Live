const mongoose = require('mongoose');

var {Schema, Number} = mongoose; 

const courseSchema = new Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    description: {type: String, required: true},
    free: {type: Boolean, required: true, default: false},
    modules: [Object],
    last_updated: {type: Date, default: Date.now},
    published: {type: Boolean, default: false},
    students: [Object],
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;