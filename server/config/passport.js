const LocalStrategy = require('passport-local').Strategy,
    passport = require('passport'),
    bcrypt = require('bcrypt'),
    crypto = require('crypto'),
    sendEmail = require('../email/sendEmail'),
    User = require('../models/UserModel.js'),
    config = require('./config'),
    JWTStategy = require('passport-jwt').Strategy,
    ExtractJWT = require('passport-jwt').ExtractJwt;

const login = (email, password, done) => {
    const userData = {
        email: email.trim(),
        password: password.trim()
    };
    User.findOne({ email: userData.email}, async (err, user) => {
        if (err) { return done(err); }    
        if (!user) {
            const error = new Error('Incorrect email or password');
            error.name = 'IncorrectCredentialsError';
            return done(error);
        }
        bcrypt.compare(password, user.password).then((response) => {
            if (response === true){
                return done(null, user);
            }else{
                const error = new Error('Incorrect email or password');
                error.name = 'IncorrectCredentialsError';
                return done(error);
            }
        }).catch(error => done(error));
        if (user.email_verified === false) {
            const error = new Error('Email has not been verified');
            error.name='Unverified Email';
            return done(error);
        }
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
        var key_one = crypto.randomBytes(256).toString('hex').substr(100, 5);
        var key_two = crypto.randomBytes(256).toString('base64').substr(50, 5);
        var key_for_verify = key_one + key_two;

        //send email *****************************************************
        var url = 'http://' + req.get('host')+'/api/confirmEmail'+'?key='+key_for_verify;
        sendEmail.userAuthenticate(url, userData.email);
        //****************************************************************

        const user = new User({
            username: userData.username, 
            email: userData.email,
            password: hashedPassword,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            reference: req.body.reference,
            key_for_verify: key_for_verify
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
        session: false,
    }, register));
    passport.use('jwt', new JWTStategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
        secretOrKey: config.secret,
    }, jwt))
    // passport.serializeUser((user, done) => done(null, user.id));
    // passport.deserializeUser((id, done) => {
    //     User.findById(id, (err, user) => {
    //         done(err, user);
    //     })
    // })
}