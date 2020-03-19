var sendEmail = require('./sendEmail.js');

const userInfo = {
    email: "120pjy@gmail.com",
    firstName: "Juyeong",
    lastName: "Park"
}

//sendEmail.forgotPassword('abcd1234', userInfo);
//sendEmail.welcomeEmail(userInfo);
sendEmail.userAuthenticate('http://localhost:3000/api/confirmEmail/?key=raeblrbaejl', userInfo);