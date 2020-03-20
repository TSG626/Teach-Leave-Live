const express = require('express'); 
const passport = require('passport');
const Course = require('../models/CourseModel'),
courseController = require('../controllers/course');

const router = express.Router();

//Checks if admin
router.use('/', (req, res, next) => {
    if(req.user.admin === true){
        next();
    }else{
        res.status(401).send({message: 'User is not an admin.'});
    }
});

router.get('/course/', (req, res) => {
    Course.find({}).then(courses => {
        res.send(courses);
    }).catch(err => {
        res.send(err);
    })
})

router.post('/course/create/', courseController.create);
router.post('/course/:id/', courseController.update);
router.delete('/course/:id/', courseController.remove);

module.exports = router;
