var sendEmail = require('./sendEmail.js');

const userInfo = {
    email: "frank.simon20@gmail.com",
    firstName: "Simon",
    lastName: "Frank"
}

sendEmail.welcomeEmail(userInfo);