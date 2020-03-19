const mongoose = require('mongoose');

var {Schema, Number} = mongoose; 

const courseSchema = new Schema({
    // username: {type: String, required: true},
    // email: {type: String, required: true},
    // password: {type: String, required: true},
});

const Course = mongoose.model('Course', courseSchema);
//Check out - https://mongoosejs.com/docs/guide.html#models
module.exports = Course;