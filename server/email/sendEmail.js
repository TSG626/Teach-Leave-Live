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
        const emailTemplate = fs.readFileSync('./welcomeEmail/welcomeEmail-inlined.html', 'utf-8')
        var compiledEmail = Hogan.compile(emailTemplate)



        var mailOptions = {
            from: config.username,
            to: userInfo.email,
            subject: 'Welcome to Teach Leave Live',
            html: compiledEmail.render({ firstName: userInfo.firstName })
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
        const emailTemplate = fs.readFileSync('./forgotPassword/forgotPassword-inlined.html', 'utf-8')
        var compiledEmail = Hogan.compile(emailTemplate)



        var mailOptions = {
            from: config.username,
            to: userInfo.email,
            subject: 'Teach Leave Live: Forgot Password',
            html: compiledEmail.render({ firstName: userInfo.firstName, code: key })
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Forgot password email sent: ' + info.response);
            }s
        });
    },
    userAuthenticate: function(url, email) {
        //const emailTemplate = fs.readFileSync('./authenticateEmail/authenticateEmail-inlined.html', 'utf-8')
        //var compiledEmail = Hogan.compile(emailTemplate)

        var mailOptions = {
            from: config.username,
            to: email,
            subject: 'Teach Leave Live: Please verify your email',
            html: '<h1>To verify your email, please click the URL below.</h1><br>'+url
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