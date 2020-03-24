const express = require('express'); 
const passport = require('passport');
const Course = require('../models/CourseModel');

const router = express.Router();

//Checks if admin
router.use('/', (req, res, next) => {
    if(req.user.admin === true){
        next();
    }else{
        res.status(401).send({message: 'User is not an admin.'});
    }
});

module.exports = router;
