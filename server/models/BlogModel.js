const mongoose = require('mongoose');

var {Schema, Number} = mongoose; 

const blogSchema = new Schema({
    // username: {type: String, required: true},
    // email: {type: String, required: true},
    // password: {type: String, required: true},
});

const Blog = mongoose.model('Blog', blogSchema);
//Check out - https://mongoosejs.com/docs/guide.html#models
module.exports = Blog;