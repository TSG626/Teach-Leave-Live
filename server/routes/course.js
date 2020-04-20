const express = require("express");
const Course = require("../models/CourseModel.js");
const User = require("../models/UserModel");

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

router.get("/", (req, res, next) => {
  if (req.user.status === 1 || req.user.status === 0) {
    //admin
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
  } else {
    //user
    if (req.query.id) {
      Course.findById(req.query.id)
        .populate("authors", "firstname lastname username")
        .then((course) => {
          if (
            req.user.courses.includes(req.query.id) || req.user.cart.includes(req.query.id) || 
            (Object.values(course.authors).length !== 0 && Object.values(course.authors).keys("_id").includes(req.user._id))
          ) {
            if (course.published) {
              res.json(course);
            } else {
              res.status(401).send({ message: "Course not published" });
            }
          } else {
            res.status(401).send({ message: "User does not own this course." });
          }
        })
        .catch((err) => {
          return next(err);
        });
    } else {
      Course.find(
        { published: true },
        "title description free cost subject authors price modules published"
      )
        .populate("authors", "firstname lastname username status")
        .then((courses) => {
          res.json(courses);
        })
        .catch((err) => {
          if (err) return next(err);
        });
    }
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
