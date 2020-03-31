const express = require('express');
const passport = require('passport');
const Course = require('../models/CourseModel');
const User = require('../models/UserModel')

const router = express.Router();

//Checks if admin
router.use('/', (req, res, next) => {
    if(req.user.admin === true){
        next();
    }else{
        res.status(401).send({message: 'User is not an admin.'});
    }
});

//makes user admin
router.post('/makeAdmin', async (req, res, next) => {
    User.findOneAndUpdate(
        { 'email': req.body.email },
        { 'admin': req.body.admin },
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

module.exports = router;
