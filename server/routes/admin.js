const express = require('express');
const passport = require('passport');
const Course = require('../models/CourseModel');
const sendEmail = require('../email/sendEmail')
const mongoose = require('mongoose');
const config = require('../config/config');

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
    const { text, text1, text2 } = req.body;
    sendEmail.newsletterPublisher(text, text1, text2);
})


module.exports = router;
