const express = require('express');
const Course = require('../models/CourseModel.js');

const router = express.Router();

router.get('/', (req, res, next) => {
    if(req.query.id){
        Course.findById(req.query.id, (err, course) => {
            if (err) return next(err);
            res.json(course);
        })
    }else{
        Course.find((err, course) => {
            if (err) return next(err);
            res.json(course);
        })
    }
});


router.post('/', (req, res, next) => {
    Course.create(req.body, (err, post) => {
        if (err) return next(err);
        res.json(post);
    });
});

router.put('/:id', (req, res, next) => {
    Course.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
        if (err) return next(err);
        res.json(post);
    });
});

router.delete('/:id', (req, res, next) => {
    Course.findByIdAndRemove(req.params.id, req.body, (err, post) => {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;