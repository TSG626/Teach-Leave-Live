const mongoose = require("mongoose");

var { Schema, Number } = mongoose;

const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  authors: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  description: {
    type: String,
    required: true,
  },
  free: {
    type: Boolean,
    required: true,
    default: true,
  },
  published: {
    type: Boolean,
    default: false,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  subject: {
    type: String,
    required: true,
    default: "Miscellaneous",
  },
  modules: [
    {
      type: Object,
      required: true,
      default: {
        sections: [
          {
            title: String,
            content: {},
          },
        ],
      },
    },
  ],
  date_updated: {
    type: Date,
    default: Date.now,
  },
  date_published: {
    type: Date,
    default: Date.now,
  },
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
