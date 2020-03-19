const express = require('express'),
    jwt = require('jsonwebtoken'),
    Blog = require('../models/BlogModel.js');

const router = express.Router();

// Create blog
const create = (req, res) => {};

// Read blog
const read = (req, res) => {
    Blog.findById(req.params.id, (err, blog) => {
        if (err) return next(err);
        res.send(blog);
    });
};

// Update blog
const update = (req, res) => {
    Blog.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, course) => {
        if(err) return next(err);
        res.send('Blog updated.');
    })
};

//Delete blog
const remove = (req, res) => {
    Blog.findByIdAndDelete(req.params.id, () => {
        if(err) return next(err);
        res.send('Deleted successfully!');
    });
};

router.get('/:id', read);
router.post('/create', create);
router.put('/:id/update', update);
router.delete('/:id/delete', remove);

module.exports = router;