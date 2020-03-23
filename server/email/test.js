var sendEmail = require('./sendEmail.js');

const userInfo = {
    email: "frank.simon20@gmail.com",
    firstName: "Simon",
    lastName: "Frank"
}

//sendEmail.forgotPassword('abcd1234', userInfo);
//sendEmail.welcomeEmail(userInfo);
sendEmail.userAuthenticate('https://www.espn.com/', userInfo);