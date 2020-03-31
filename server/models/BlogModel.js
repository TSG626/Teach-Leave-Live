const mongoose = require('mongoose');

var {Schema, Number} = mongoose; 

const blogSchema = new Schema({
    title: {type: String, required: true},
    body: {type: String, required: true},
    authors: [{
        type: String,
        required: true
    }],
    date: {type: Date, default: Date.now},
    // replies: [
    //     {
    //         title: {type: String, required: true},
    //         body: {type: String, required: true},
    //         username: {type: String, required: true},
    //         date: {type: Date, default: Date.now},
    //         replies: [
    //         {
    //             title: {type: String, required: true},
    //             post: {type: String, required: true},
    //             username: {type: String, required: true},
    //             date: {type: Date, default: Date.now}
    //         }],
    //         default: []
    //     }
    // ]
});

const Blog = mongoose.model('Blog', blogSchema);
//Check out - https://mongoosejs.com/docs/guide.html#models
module.exports = Blog;