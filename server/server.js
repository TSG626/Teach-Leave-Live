const express = require('./config/express.js');
const passport = require('./config/passport.js');
 
const port = process.env.PORT || 5000;

const app = express.init();
passport.init();

app.listen(port, () => console.log(`Server now running on port ${port}!`));