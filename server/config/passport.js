const LocalStrategy = require('passport-local').Strategy,
    passport = require('passport'),
    bcrypt = require('bcrypt'),
    User = require('../models/UserModel.js');

async function getUserByEmail (email) {
    return (User.findOne({ email: email })).exec();    
}

async function getUserById (id) {
    return (User.findById(id));    
}

const authenticateUser = async (email, password, done) => {
    const user = await getUserByEmail(email);
    if(user == null){
        return done(null, false, { message: 'No user with that email.'})
    }

    try {
        if (await bcrypt.compare(password, user.password)){
            return done(null, user);
        } else {
            return done(null, false, { message: 'Password incorrect.' })
        }
    } catch (e) {
        return done(e);
    }
}

module.exports.init = () => {
    passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id));
    })
}