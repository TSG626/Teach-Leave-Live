const express = require('express'); 

const router = express.Router();

router.use('/', require('./auth.js'));

//Homepage static file
router.use('/', (req, res) => {
    res.send('Home')
});
// router.use('/', express.static('./../../client'));

router.use('/admin', require('./admin.js'));
router.use('/blog', require('./blog.js'));
router.use('/course', require('./course.js'));
router.use('/user', require('./user.js'));

module.exports = router;
