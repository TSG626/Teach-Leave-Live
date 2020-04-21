const express = require("express");
const Blog = require("../models/BlogModel.js");

const router = express.Router();

router.get("/", (req, res, next) => {
  if (req.user.status === 1 || req.user.status === 0) {
    //admin
    if (req.query.id) {
      Blog.findById(req.query.id)
        .populate("authors comments.postedBy comments.replies.postedBy")
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
      Blog.findById(req.query.id)
        .populate("authors", "firstname lastname username status")
        .populate(
          "comments.postedBy",
          "firstname avatar lastname username status"
        )
        .populate(
          "comments.replies.postedBy",
          "firstname lastname username avatar status"
        )
        .then((blog) => {
          console.log(blog.comments);
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

router.post("/:bid/comment/", (req, res, next) => {
  Blog.findByIdAndUpdate(
    req.params.bid,
    { $push: { comments: { ...req.body } } },
    (err, post) => {
      if (err) return next(err);
      res.json(post);
    }
  );
});

router.delete("/:bid/comment/:cid", (req, res, next) => {
  const { bid, cid } = req.params;
  Blog.findById(bid)
    .then((blog) => {
      comment = blog.comments.id(cid);
      comment.remove();
      blog.save();
    })
    .then((blog) => {
      res.status(200).json(blog);
    });
});

router.post("/:bid/comment/:cid", (req, res, next) => {
  const { bid, cid } = req.params;
  Blog.update(
    { _id: bid, "comments._id": cid },
    { $push: { "comments.$.replies": req.body } },
    { upsert: true },
    function (err, blog) {
      res.status(200).json(blog);
    }
  );
});

router.delete("/:bid/comment/:cid/reply/:rid/", (req, res, next) => {
  const { bid, cid, rid } = req.params;
  console.log(req.params);
  Blog.findById(bid)
    .then((blog) => {
      comment = blog.comments.id(cid);
      reply = comment.replies.id(rid);
      if (
        req.user.status === 0 ||
        req.user.status === 1 ||
        req.user._id === blog.postedBy._id
      ) {
        reply.remove();
        blog.save();
      } else {
        res.status(401).send({ message: "Unauthorized action" });
      }
    })
    .then((blog) => {
      res.status(200).json(blog);
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
