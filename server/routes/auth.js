const express = require('express'); 
const bcrypt = require('bcrypt'); 
const passport = require('passport'); 
const User = require('../models/UserModel.js');

const router = express.Router();

//TODO: Figure out how to make these work with react server
const loginPage = null;
const registerPage = null;

//Filters unauthed users to /login
function checkAuthenticated (req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

//Filters authed users to home page
function checkNotAuthenticated (req, res, next){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    next();
}

//Handles signup
const registerHandler = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            username: req.body.username, 
            email: req.body.email,
            password: hashedPassword
        });
        console.log(user);
        user.save();
        res.redirect('/login');
    } catch {
        res.redirect('/register');
    }
}

//Temp login page
router.get('/login', checkNotAuthenticated, (req, res) => {
    res.send('loginPage');
});

//Login post request handles by passport
router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
}));

//Temp registration page
router.get('/register', checkNotAuthenticated, (req, res) => {
    res.send('registerPage');
});

//Signup
router.post('/register', checkNotAuthenticated, registerHandler);

//Authed users may access other routes of the site including homepage.
router.use('/', checkAuthenticated);

module.exports = router;