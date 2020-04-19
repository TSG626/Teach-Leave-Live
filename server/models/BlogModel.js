const mongoose = require("mongoose");

var { Schema, Number } = mongoose;

const blogSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  body: {},
  authors: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  date_updated: { type: Date, default: Date.now },
  date_published: { type: Date, default: Date.now },
  published: {
    type: Boolean,
    default: false,
  },
  comments: [
    {
      body: { type: String, required: true },
      postedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      date: { type: Date, default: Date.now },
      replies: [
        {
          body: { type: String, required: true },
          postedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
          },
          date: { type: Date, default: Date.now },
          default: [],
        },
      ],
      default: [],
    },
  ],
});

const Blog = mongoose.model("Blog", blogSchema);
//Check out - https://mongoosejs.com/docs/guide.html#models
module.exports = Blog;
