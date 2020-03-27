const express = require('express'),
    jwt = require('jsonwebtoken'),
    Course = require('../models/CourseModel.js');

const router = express.Router();

// Create course
const create = (req, res) => {};

// Read course
const read = (req, res) => {
    Course.findById(req.params.id, (err, course) => {
        if (err) return next(err);
        res.send(course);
    });
};

// Update course
const update = (req, res) => {
    Course.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, course) => {
        if(err) return next(err);
        res.send('Course updated.');
    })
};

//Delete course
const remove = (req, res) => {
    Course.findByIdAndDelete(req.params.id, () => {
        if(err) return next(err);
        res.send('Deleted successfully!');
    });
};

router.get('/:id', read);
router.post('/create', create);
router.put('/:id/update', update);
router.delete('/:id/delete', remove);

module.exports = router;