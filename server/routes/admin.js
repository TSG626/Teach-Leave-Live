const express = require('express');
const passport = require('passport');
const Course = require('../models/CourseModel');
const User = require('../models/UserModel')
const sendEmail = require('../email/sendEmail')
const mongoose = require('mongoose');
const config = require('../config/config');

const router = express.Router();

//Checks if admin or owner
router.use('/', (req, res, next) => {
    if (req.user.status === 1 || req.user.status === 0) {
        next();
    } else {
        res.status(401).send({ message: 'User is not an admin.' });
    }
});

//change status level
router.post('/changeStatus', async (req, res, next) => {
    User.findOneAndUpdate(
        { 'email': req.body.email },
        { 'status': req.body.status },
        {returnNewDocument: true}).then((user) => {
            return res.status(200).json({
                success: true,
            });
        }
    );
})

//get list of all users
router.get('/getAllUsers', async (req, res) => {
    User.find({}, function(err, data) {
        if(err)
            return err;
        return res.json(data);
    })
})

//delete user
router.post('/deleteUser', async (req, res, next) => {
    User.remove({'username': req.body.username}).then((user) => {
        return res.status(200).json({
            success: true,
        });
    })
})
router.post('/newsletter/', (req, res, next) => {
    const { text, text1, text2 } = req.body;
    sendEmail.newsletterPublisher(text, text1, text2);
})


module.exports = router;
