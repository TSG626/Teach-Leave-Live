const express = require('express'); 

const router = express.Router();

router.use('/', require('./auth.js'));

router.use('/admin', require('./admin.js'));
router.use('/blog', require('../controllers/blog.js'));
router.use('/course', require('../controllers/course.js'));
router.use('/user', require('../controllers/user.js'));

module.exports = router;
