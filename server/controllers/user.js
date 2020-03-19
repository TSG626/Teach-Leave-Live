const express = require('express'),
    jwt = require('jsonwebtoken'),
    User = require('../models/UserModel.js'),
    auth = require('../routes/auth.js');

const router = express.Router();

//Just RUD, /auth handles user creation

// Read user info
const read = (req, res) => {
    User.findById(req.params.id, () => {
        if (err) return next(err);
        res.status(200).json({
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
        });
    });
};

// Update user
const update = (req, res) => {
    User.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, user) => {
        if(err) return next(err);
        res.send('User updated.');
    })
};

//Delete a user
const remove = (req, res) => {
    User.findByIdAndDelete(req.params.id, () => {
        if(err) return next(err);
        res.send('Deleted successfully!');
    });
};

const userInfo = (req, res) => {
    if (req.user){
        const {username, email, firstname, lastname, admin} = req.user;
        res.status(200).send(JSON.stringify({
            username: username,
            email: email,
            firstname: firstname,
            lastname: lastname,
            admin: admin,
        }))
    }else{
        res.status(400).json({message: 'Not logged in.'});
    }
}

router.get('/', userInfo);
router.get('/:username', read);
router.put('/:username/update', update);
router.delete('/:username/delete', remove);

module.exports = router;