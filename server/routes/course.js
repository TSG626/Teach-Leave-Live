const express = require('express');
const Course = require('../models/CourseModel.js');
const User = require('../models/UserModel');


const router = express.Router();

router.get("/subjects/", (req, res, next) => {
  Course.find({}, function (err, courses) {
    var subjects = [];
    courses.forEach((course) => {
      if (
        course.subject &&
        (subjects.length === 0 || !subjects.includes(course.subject))
      ) {
        subjects.push(course.subject);
      }
    });
    res.json(subjects);
  });
});

router.get('/getAllCourses', async (req, res) => {
    Course.find({}, function(err, data) {
        if(err)
            return err;
        return res.json(data);
    })
})

router.get("/", (req, res, next) => {
  if (req.query.id) {
    Course.findById(req.query.id, (err, course) => {
      if (err) return next(err);
      res.json(course);
    });
  } else if (req.query.subject) {
    Course.find(
      {
        subject: req.query.subject,
      },
      "id title description",
      (err, courses) => {
        if (err) return next(err);
        res.json(courses);
      }
    );
  } else {
    Course.find({})
      .populate("authors")
      .exec((err, courses) => {
        if (err) return next(err);
        res.json(courses);
      });
  }
});

router.post("/", (req, res, next) => {
  var course = new Course({ ...req.body });
  course
    .save()
    .then((course) => {
      res.json(course);
    })
    .catch((err) => {
      return next(err);
    });
});

router.put("/:id", (req, res, next) => {
  Course.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.delete("/:id", (req, res, next) => {
  Course.findByIdAndRemove(req.params.id, req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
