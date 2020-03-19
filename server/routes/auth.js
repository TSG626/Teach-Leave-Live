const express = require('express'),
    passport = require('passport'),
    validator = require('validator'),
    config = require('../config/config'),
    user = require('../models/UserModel'),
    jwt = require('jsonwebtoken');

const router = express.Router();

//Filters unauthed users to /login
function checkAuthenticated (req, res, next) {
    // (req, res, next);
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
            message: 'You have successfully signed up! An email should be sent to verify your email'
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
    passport.authenticate('local-login', (err, user) => {
        if (err) {
            if (err.name === 'IncorrectCredentialsError') {
                return res.status(400).json({
                    success: false,
                    message: err.message
                });
            }
            else if (err.name === 'Unverified Email') {
                return res.status(400).json({
                    success: false,
                    message: err.message
                })
            }
            else{
                return res.status(400).json({
                    success: false,
                    message: 'Could not process the form.'
                });
            }
        }
        req.logIn(user, () => {
            const token = jwt.sign({id: user.id}, config.secret, {expiresIn: 60 * 60 * 24 * 1});
            return res.json({
                auth: true,
                success: true,
                message: 'You have successfully logged in!',
                token,
            });    
        });
    })(req, res, next);
});

//Signup
router.post('/register', checkNotAuthenticated, registerHandler);
//confirm email
router.get('/confirmEmail', (req, res) => {
    user.updateOne({key_for_verify:req.query.key}, {$set: {email_verified: true}}, (err, user) => {
        if (err) {
            console.log(err);
            res.status(400).json({message: err});
        }
        else if (user.n == 0) {
            res.send('<script type="text/javascript">alert("Not verified"); window.location="/";</script>');
        }
        else {
            res.send('<script type="text/javascript">alert("Successfully verified"); window.location="/";</script>');
        }
    })
});
//Authed users may access other routes of the site including homepage.
router.use('/', (req, res, next) => {
    passport.authenticate('jwt', {session: false}, (err, user) => {
        if(err){
            return res.status(401).json({message: 'error'});
        }else{
            req.user = user;
            next();
        }
    })(req, res, next);
});

module.exports = router;