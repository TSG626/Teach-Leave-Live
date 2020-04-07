const express = require('express');

const router = express.Router();

router.use('/', require('./auth.js'));

router.use('/admin', require('./admin.js'));
router.use('/blog', require('./blog.js'));
router.use('/course', require('./course.js'));
router.use('/user', require('../controllers/user.js'));
router.use('/contact', require('./contact.js'));

module.exports = router;
