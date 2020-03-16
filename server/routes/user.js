const express = require('express'),
    jwt = require('jsonwebtoken'),
    User = require('../models/UserModel.js');

const router = express.Router();

router.get('/', async (req, res) => {
    console.log("Get user.")
    const id = jwt.decode(req.body.token);
    await User.findById(id).then((user) => {
        if(user){
            res.status(200).json({
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname,
                username: user.username,
            });
        }
    });
    res.send('user');
})

module.exports = router;