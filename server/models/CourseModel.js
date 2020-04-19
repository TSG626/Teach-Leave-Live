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
  //For ordering courses within subjects
  subject_index: Number,
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
  last_updated: {
    type: Date,
    default: Date.now,
  },
  published: {
    type: Boolean,
    default: false,
  },
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
