const express = require('express'),
    Email = require('../email/sendEmail.js');

const router = express.Router();

router.post('/', async (req, res, next) => {
    Email.contact(req.body);
    return res.status(200);
});

module.exports = router;
