const express = require("express");
const Blog = require("../models/BlogModel.js");

const router = express.Router();

router.get("/", (req, res, next) => {
  if (req.user.status === 1 || req.user.status === 0) {
    //admin
    if (req.query.id) {
      Blog.findById(req.query.id)
        .populate("authors")
        .exec((err, blogs) => {
          if (err) return next(err);
          res.json(blogs);
        });
    } else if (req.query.subject) {
      Blog.find({
        subject: req.query.subject,
      })
        .populate("authors")
        .exec((err, blogs) => {
          if (err) return next(err);
          res.json(blogs);
        });
    } else {
      Blog.find({})
        .populate("authors")
        .exec((err, blogs) => {
          if (err) return next(err);
          res.json(blogs);
        });
    }
  } else {
    //user
    if (req.query.id) {
      Blog.findById(req.query.id, "")
        .populate("authors", "firstname lastname username status")
        .populate("comments.postedBy", "firstname lastname username status")
        .populate(
          "comments.replies.postedBy",
          "firstname lastname username status"
        )
        .then((blog) => {
          if (blog.published) {
            res.json(blog);
          } else {
            res.status(401).send({ message: "Blog not published" });
          }
        })
        .catch((err) => {
          return next(err);
        });
    } else {
      Blog.find({ published: true }, "title description authors date_published")
        .populate("authors", "firstname lastname username status")
        .then((blogs) => {
          res.json(blogs);
        })
        .catch((err) => {
          if (err) return next(err);
        });
    }
  }
});

router.post("/", (req, res, next) => {
  let blog = new Blog({
    title: req.body.title,
    description: req.body.description,
    authors: req.body.authors,
  });
  blog.save((err) => {
    if (err) {
      console.log(err);
    }
  });
});

router.put("/:id", (req, res, next) => {
  Blog.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.delete("/:id", (req, res, next) => {
  Blog.findByIdAndRemove(req.params.id, req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
