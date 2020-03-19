const mongoose = require('mongoose');

var {Schema, Number} = mongoose; 

const blogSchema = new Schema({
    title: {type: String, required: true},
    post: {type: String, required: true},
    username: {type: String, required: true},
    date: {
        day: {type: Number, required: true},
        month: {type: Number, required: true},
        year: {type: Number, required: true},
        //required: true
    },
    replies: [
        {
            title: {type: String, required: true},
            post: {type: String, required: true},
            username: {type: String, required: true},
            date: {
                day: {type: Number, required: true},
                month: {type: Number, required: true},
                year: {type: Number, required: true},
                //required: true
            },
            replies: [
            {
                title: {type: String, required: true},
                post: {type: String, required: true},
                username: {type: String, required: true},
                date: {
                    day: {type: Number, required: true},
                    month: {type: Number, required: true},
                    year: {type: Number, required: true},
                    //required: true
                },
            }]
        }
    ]
});

const Blog = mongoose.model('Blog', blogSchema);
//Check out - https://mongoosejs.com/docs/guide.html#models
module.exports = Blog;