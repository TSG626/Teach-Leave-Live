const express = require('express'); 
const bcrypt = require('bcrypt'); 
const passport = require('passport'); 
const User = require('../models/UserModel.js');
const validator = require('validator');

const router = express.Router();

//TODO: Figure out how to make these work with react server
const loginPage = null;
const registerPage = null;

//Filters unauthed users to /login
function checkAuthenticated (req, res, next) {
    if(req.isAuthenticated()){
        console.log("User is authorized");
        return next();
    }
    res.redirect('/api/login');
}

//Filters authed users to home page
function checkNotAuthenticated (req, res, next){
    if(req.isAuthenticated()){
        return res.redirect('/api/');
    }
    next();
}

function validateSignupForm(body) {
    const errors = {};
    let isFormValid = true;
    let message = '';

    if (!body || typeof body.email !== 'string' || !validator.isEmail(body.email)) {
        isFormValid = false;
        errors.email = 'Please provide a correct email address.';
    }

    if (!body || typeof body.password !== 'string' || body.password.trim().length < 8) {
        isFormValid = false;
        errors.password = 'Password must have at least 8 characters.';
    }

    if (!body || typeof body.username !== 'string' || body.username.trim().length === 0) {
        isFormValid = false;
        errors.username = 'Please provide your username.';
    }

    if (!isFormValid) {
        message = 'Check the form for errors.';
    }

    return {
        success: isFormValid,
        message,
        errors
    };
}

//Handles signup
const registerHandler = (req, res, next) => {
    const validationResult = validateSignupForm(req.body);
    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        });
    }
    return passport.authenticate('local-signup', (err) => {
        if (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                // the 11000 Mongo code is for a duplication email error
                // the 409 HTTP status code is for conflict error
                return res.status(409).json({
                    success: false,
                    message: 'Check the form for errors.',
                    errors: {
                        email: 'This email is already taken.'
                    }
                });
            }

            return res.status(400).json({
                success: false,
                message: 'Could not process the form.'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'You have successfully signed up! Now you should be able to log in.'
        });
    })(req, res, next);
};
  
function validateLoginForm(body) {
    const errors = {};
    let isFormValid = true;
    let message = '';

    if (!body || typeof body.email !== 'string' || body.email.trim().length === 0) {
        isFormValid = false;
        errors.email = 'Please provide your email address.';
    }

    if (!body || typeof body.password !== 'string' || body.password.trim().length === 0) {
        isFormValid = false;
        errors.password = 'Please provide your password.';
    }

    if (!isFormValid) {
        message = 'Check the form for errors.';
    }

    return {
        success: isFormValid,
        message,
        errors
    };
}

//Temp login page
router.get('/login', checkNotAuthenticated, (req, res) => {
    res.send('loginPage');
});

router.get('/user', 
    checkAuthenticated, 
    (req, res) => {
        console.log(req.user);
        res.statusCode = 200;
    }
);

//Login post request handles by passport
router.post('/login', (req, res, next) => {
    const validationResult = validateLoginForm(req.body);
    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        });
    }

    return passport.authenticate('local-login', (err, token, userData) => {
        if (err) {
            if (err.name === 'IncorrectCredentialsError') {
                return res.status(400).json({
                    success: false,
                    message: err.message
                });
            }

            return res.status(400).json({
                success: false,
                message: 'Could not process the form.'
            });
        }

        return res.json({
            success: true,
            message: 'You have successfully logged in!',
            token,
            user: userData
        });
    })(req, res, next);
});

//Temp registration page
router.get('/register', checkNotAuthenticated, (req, res) => {
    res.send('registerPage');
});

//Signup
router.post('/register', checkNotAuthenticated, registerHandler);

//Authed users may access other routes of the site including homepage.
router.use('/', checkAuthenticated);

module.exports = router;