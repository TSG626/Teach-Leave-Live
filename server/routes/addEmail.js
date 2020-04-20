const express = require('express');
const Email = require('../models/EmailModel');

const router = express.Router();

router.post('/', (req, res, next) => {
    Email.findOne({ email: req.body.email }, (err, email) => {
        if (err) {
            console.log(err);
            res.status(500).send();
        }
        if (email) {
            res.status(200).json({
                message: 'Your email has already been added to our mailing list!',
            }).send();
        } else {
            const newEmail = new Email({
                email: req.body.email,
            });
            newEmail.save((err) => {
                if (err) {
                    console.log(err);
                    return res.status(500);
                }
            });
            res.status(200).json({
                message: "You've been added to our newsletter!",
            }).send();
        }
    });
});

module.exports = router;
