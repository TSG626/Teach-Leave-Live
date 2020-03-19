const LocalStrategy = require('passport-local').Strategy,
    passport = require('passport'),
    bcrypt = require('bcrypt'),
    User = require('../models/UserModel.js'),
    config = require('./config'),
    JWTStategy = require('passport-jwt').Strategy,
    ExtractJWT = require('passport-jwt').ExtractJwt;

<<<<<<< HEAD
=======
function getUserById (id) {
    return (User.findById(id));    
}

const authenticateUser = (req, email, password, done) => {
>>>>>>> parent of 3bf966f... Implements password replacement and fixes up ui
    const userData = {
        email: email.trim(),
        password: password.trim()
    };
<<<<<<< HEAD
=======

    return User.findOne({ email: userData.email }, async (err, user) => {
        if (err) { return done(err); }
    
>>>>>>> parent of 3bf966f... Implements password replacement and fixes up ui
        if (!user) {
            const error = new Error('Incorrect email or password');
            error.name = 'IncorrectCredentialsError';
            return done(error);
<<<<<<< HEAD
        } else {
=======
        }

        try {
            if (await bcrypt.compare(password, user.password)){
                const token = jwt.sign({
                    sub: user._id
                }, config.secret);
                const data = {
                    username: user.username
                };
        
                return done(null, token, data);
            }else{
>>>>>>> parent of 3bf966f... Implements password replacement and fixes up ui
                const error = new Error('Incorrect email or password');
                error.name = 'IncorrectCredentialsError';
                return done(error);
        }).catch(error => done(error));
    });
}

const register = async (req, email, password, done) => {
    const userData = {
        email: email.trim(),
        password: password.trim(),
        username: req.body.username.trim(),
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
            password: hashedPassword,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            reference: req.body.reference,
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

const jwt = (jwt_payload, done) => {
    User.findById(jwt_payload.id).then((user) => {
        if(user){
            done(null, user);
        }else{
            done(null, false);
        }
    }).catch((err) => {
        done(err);
    });
}

module.exports.init = () => {
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        session: false,
    }, login));
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
<<<<<<< HEAD
=======
    }, createUser));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id));
    })
}
>>>>>>> parent of 3bf966f... Implements password replacement and fixes up ui
