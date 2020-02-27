const express = require('express'); 

const router = express.Router();

router.get('/', (req, res) => {
    res.send('course');
})

module.exports = router;
