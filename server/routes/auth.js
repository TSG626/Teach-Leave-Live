const express = require('express');
const passport = require('passport');
const validator = require('validator');
User = require('../models/UserModel.js');
bcrypt = require('bcrypt');

const router = express.Router();

//Filters unauthed users to /login
function checkAuthenticated (req, res, next) {
    if(req.isAuthenticated()){
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
            if (err.name === 'Conflict') {
                // the 11000 Mongo code is for a duplication email error
                // the 409 HTTP status code is for conflict error
                const errors = {}
                if(err.message.includes('Email')){
                    errors.email = 'This email is already taken.';
                }
                if(err.message.includes('Username')){
                    errors.username = 'This username is already taken.';
                }
                return res.status(409).json({
                    success: false,
                    message: 'Check the form for errors.',
                    errors: errors
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

router.get('/user',
    checkAuthenticated,
    (req, res) => {
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

function validateEmail(body) {
    const errors = {};
    let isFormValid = true;
    let message = '';

    if (!body || typeof body.email !== 'string' || body.email.trim().length === 0) {
        isFormValid = false;
        errors.form = 'Please provide your email address.';
    }

    if (!body.email.includes('@')) {
        isFormValid = false;
        errors.form = 'Please provide a valid email address.';
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

function validateCode(body) {
    const errors = {};
    let authCode = '123456';
    let isFormValid = true;
    let message = '';

    if (!body || typeof body.code !== 'string' || body.code.trim().length === 0) {
        isFormValid = false;
        errors.form = 'Please enter your code.';
    } else if (body.code.trim().length !== 6) {
        isFormValid = false;
        errors.form = 'Code must be 6-digits.';
    } else if (body.code.trim() !== authCode) {
        isFormValid = false;
        errors.form = 'Invalid code.';
    }

    return {
        success: isFormValid,
        message,
        errors
    };
}

const updatePasswordHandler = async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        //console.log(User.findOne({email: req.body.email.trim()}).password);
        User.findOneAndUpdate(
          { email: req.body.email.trim() },
          { password: hashedPassword },
        );
    } catch (err) {
        console.log(err);
        return done(err);
    }
};

router.post('/forgotpassword', (req, res, next) => {
    let validationResult;
    if (req.body.mode === 'email') {
        validationResult = validateEmail(req.body);
    }
    else if (req.body.mode === 'code') {
        validationResult = validateCode(req.body);
    }
    else if (req.body.mode === 'password') {
        validationResult = validateNewPassword(req.body);
    }

    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        });
    } else {
        return res.json({
            success: true,
            message: ''
        });
    }
});

//Update password
router.post('/updatepassword', updatePasswordHandler);

//Signup
router.post('/register', checkNotAuthenticated, registerHandler);

//Authed users may access other routes of the site including homepage.
router.use('/', checkAuthenticated);

module.exports = router;
