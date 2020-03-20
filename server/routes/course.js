const express = require('express'),
    courseController = require('../controllers/course');

const router = express.Router();

//user can read course
router.get('/:id', courseController.read);
//and somewhat update - rating?
router.put('/:id/', courseController.update);

module.exports = router;