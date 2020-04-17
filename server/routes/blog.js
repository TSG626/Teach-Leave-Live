const express = require('express');
const Blog = require('../models/BlogModel.js');

const router = express.Router();

/*---------- FIXME: Keep or remove? ----------*/
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
    Blog.find({}, (err, blogs) => {
        if (err) return console.log(err);
        res.json(blogs);
    }).sort({date: -1})
});


router.post('/', (req, res, next) => {
    let blog = new Blog({
        title: req.body.title,
        description: req.body.description,
        authors: req.body.authors,
    });
    blog.save((err)=>{
        if(err)
        {
            console.log(err);
        }
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