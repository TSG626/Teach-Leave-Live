var nodemailer = require('nodemailer');
const fs = require('fs')
const Hogan = require('hogan.js')
const config = require('./config')


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: config.email.username,
        pass: config.email.password
    },
    tls: {
        rejectUnauthorized: false
    }
});

module.exports = {
    welcomeEmail: function (userInfo) {
      console.log('here');
        const emailTemplate = fs.readFileSync('./welcomeEmail/welcomeEmail-inlined.html', 'utf-8')
        var compiledEmail = Hogan.compile(emailTemplate)



        var mailOptions = {
            from: config.username,
            to: userInfo.email,
            subject: 'Welcome to Teach Leave Live',
            html: compiledEmail.render({ firstname: userInfo.firstname })
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Welcome email sent: ' + info.response);
            }
        });
    },
    forgotPassword: function (key, userInfo) {
        const emailTemplate = fs.readFileSync('../email/forgotPassword/forgotPassword-inlined.html', 'utf-8')
        var compiledEmail = Hogan.compile(emailTemplate)



        var mailOptions = {
            from: config.username,
            to: userInfo.email,
            subject: 'Teach Leave Live: Forgot Password',
            html: compiledEmail.render({ firstname: userInfo.firstname, code: key })
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Forgot password email sent: ' + info.response);
            } s
        });
    },
    userAuthenticate: function (url, userInfo) {
        console.log(url);
        console.log(userInfo);
        const emailTemplate = fs.readFileSync('./authenticateEmail/authenticateEmail-inlined.html', 'utf-8');
        var compiledEmail = Hogan.compile(emailTemplate)
        console.log('compiled email set');

        var mailOptions = {
            from: config.username,
            to: userInfo.email,
            subject: 'Teach Leave Live: Please verify your email',
            html: compiledEmail.render({ firstname: userInfo.firstname, url: url })
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('User Email Authenticate email sent: ' + info.response);
            }
        });
    }
}
