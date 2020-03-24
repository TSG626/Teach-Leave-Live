const express = require('express'); 

const router = express.Router();

//TODO: Make a variable stored in the user profile denoting them as admin and making use here
router.get('/', (req, res) => {
    res.send('admin');
})

module.exports = router;
