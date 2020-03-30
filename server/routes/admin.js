const express = require('express');
const passport = require('passport');
const Course = require('../models/CourseModel');
const sendEmail = require('../email/sendEmail')

const router = express.Router();

//Checks if admin
router.use('/', (req, res, next) => {
    if (req.user.admin === true) {
        next();
    } else {
        res.status(401).send({ message: 'User is not an admin.' });
    }
});

router.post('/newsletter/', (req, res, next) => {
    const {title, body, link} = req.body;
    sendEmail.newsletterPublisher(title, body, link);
})


module.exports = router;
