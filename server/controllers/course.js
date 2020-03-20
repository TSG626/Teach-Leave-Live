const Course = require('../models/CourseModel.js');

// Create course
const create = (req, res) => {
    const course = new Course({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        free: req.body.free,
        price: req.body.price,
    });
    course.save((err) => {
        if(err) res.status(400).send(err);
    })
};

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

module.exports = {create, read, update, remove};