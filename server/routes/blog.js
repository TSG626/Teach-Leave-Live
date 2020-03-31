const express = require('express');
const Blog = require('../models/BlogModel.js');

const router = express.Router();

// router.get('/comments/', (req, res, next) => {
//     Course.find({}, function(err, courses) {
//         var subjects = [];
//         courses.forEach((course) => {
//             if(course.subject && (subjects.length === 0 || !subjects.includes(course.subject))){
//                 subjects.push(course.subject);
//             }
//         })
//         res.json(subjects);  
//       });
// });

router.get('/', (req, res, next) => {
    if(req.query.id){
        Blog.findById(req.query.id, (err, blog) => {
            if (err) return next(err);
            res.json(blog);
        })
    // }else if(req.query.subject){
    //     Course.find({
    //         'subject': req.query.subject
    //     }, 'id title description', (err, courses) => {
    //         if(err) return next(err);
    //         res.json(courses)
    //     })
    }else{
        Blog.find({}, 'id title description', (err, blogs) => {
            if (err) return next(err);
            res.json(blogs);
        })
    }
});


router.post('/', (req, res, next) => {
    Blog.create(req.body, (err, post) => {
        if (err) return next(err);
        res.json(post);
    });
});

router.put('/:id', (req, res, next) => {
    Blog.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
        if (err) return next(err);
        res.json(post);
    });
});

router.delete('/:id', (req, res, next) => {
    Blog.findByIdAndRemove(req.params.id, req.body, (err, post) => {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;
