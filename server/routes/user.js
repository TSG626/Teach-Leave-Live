const express = require("express");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const User = require("../models/UserModel.js");
const config = require("../config/config");
const mongoose = require("mongoose");
const path = require("path");

const router = express.Router();

const connection = mongoose.createConnection(config.db.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let gfs;
connection.once("open", () => {
  // init stream
  gfs = Grid(connection.db, mongoose.mongo);
  gfs.collection("avatars");
});

const storage = new GridFsStorage({
  url: config.db.uri,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  file: (req, file) => {
    const filename =
      `${req.user.username}` +
      "-" +
      Date.now() +
      path.extname(file.originalname);
    const fileInfo = {
      filename: filename,
      bucketName: "avatars",
    };
    return fileInfo;
  },
});

const upload = multer({ storage });

router.post("/avatar/", upload.single("avatar"), (req, res) => {
  req.user.avatar = `/api/user/avatar/${req.file.filename}`;
  req.user.save();
  res.status(201).json({ file: req.file });
});

router.get("/avatar/:username/", (req, res) => {
  var regex = new RegExp(req.params.username, "i");
  gfs.files.findOne({ filename: { $regex: regex } }, (err, file) => {
    if (err) {
      return res.status(404).json({
        ...err,
      });
    }
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "No files exist",
      });
    }
    if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
      const readStream = gfs.createReadStream(file.filename);
      readStream.pipe(res);
    } else {
      res.status(404).json({ err: "not an image" });
    }
  });
});

router.delete("/avatar/:username/", (req, res) => {
  var regex = new RegExp(req.params.username, "i");
  gfs.files.findOne({ username: { $regex: regex } }, (err, file) => {
    gfs.files.remove({ _id: file._id, root: "avatars" }, (err, gridStore) => {
      if (err) {
        return res.status(404).json({ err: err });
      }
      res.status(200).json({ success: true });
    });
  });
});

router.get("/", (req, res, next) => {
  if (req.query.id) {
    User.findById(req.query.id, (err, user) => {
      if (err) return next(err);
      res.json(user);
    });
  } else if (req.query.username) {
    User.find(
      {
        username: req.query.username,
      },
      (err, user) => {
        if (err) return next(err);
        res.json(user);
      }
    );
  } else {
    if (req.user) {
      const {
        username,
        email,
        firstname,
        lastname,
        status,
        avatar,
        _id,
      } = req.user;
      res.status(200).send(
        JSON.stringify({
          username: username,
          email: email,
          firstname: firstname,
          lastname: lastname,
          status: status,
          avatar: avatar,
          _id: _id,
        })
      );
    } else {
      res.status(400).json({ message: "Not logged in." });
    }
  }
});

router.post("/", (req, res, next) => {
  User.create(req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.put("/:id", (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.delete("/:id", (req, res, next) => {
  User.findByIdAndRemove(req.params.id, req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
