const LocalStrategy = require('passport-local').Strategy,
    passport = require('passport'),
    bcrypt = require('bcrypt'),
    User = require('../models/UserModel.js'),
    jwt = require('jsonwebtoken'),
    config = require('./config');

function getUserById (id) {
    return (User.findById(id));    
}

const authenticateUser = (req, email, password, done) => {
    const userData = {
        email: email.trim(),
        password: password.trim()
    };

    return User.findOne({ email: userData.email }, async (err, user) => {
        if (err) { return done(err); }
    
        if (!user) {
            const error = new Error('Incorrect email or password');
            error.name = 'IncorrectCredentialsError';
            return done(error);
        }

        try {
            if (await bcrypt.compare(password, user.password)){
                const token = jwt.sign({
                    sub: user._id
                }, config.secret);
                const data = {
                    username: user.username,
                    email: user.email,
                };
        
                return done(null, token, data);
            }else{
                const error = new Error('Incorrect email or password');
                error.name = 'IncorrectCredentialsError';
                return done(null, error);
            }
        } catch (error) {
            return done(error);
        }
    });
}

const createUser = async (req, email, password, done) => {
    const userData = {
        email: email.trim(),
        password: password.trim(),
        username: req.body.username.trim()
    };
    const error = new Error('');
    await User.findOne({ email: userData.email }).then((user) => {
        if(user){
            error.message = 'Email';
        }
    });
    await User.findOne({ username: userData.username }).then((user) => {
        if(user){
            error.message = error.message + ', Username';
        }
    });
    if(error.message != ''){
        error.name = 'Conflict';
        return done(error);
    }
    try {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const user = new User({
            username: userData.username, 
            email: userData.email,
            password: hashedPassword
        });
        user.save((err) => {
            if(err){
                return done(err);
            }else{
                return done(null);
            }
        });
    } catch (err) {
        return done(err);
    }
}

module.exports.init = () => {
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passwordField: false,
        passReqToCallback: true,
    }, authenticateUser));
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passwordField: false,
        passReqToCallback: true,
    }, createUser));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id));
    })
}