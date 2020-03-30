var nodemailer = require('nodemailer');
const fs = require('fs')
const path = require('path')
const Hogan = require('hogan.js')
const config = require('./config.js')
const User = require('../models/UserModel.js');

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
        const emailTemplate = fs.readFileSync(path.resolve(__dirname) + '/authenticateEmail/authenticateEmail-inlined.html', 'utf-8')
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
        const emailTemplate = fs.readFileSync(path.resolve(__dirname) + '/authenticateEmail/authenticateEmail-inlined.html', 'utf-8')
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
        const emailTemplate = fs.readFileSync(path.resolve(__dirname) + '/authenticateEmail/authenticateEmail-inlined.html', 'utf-8');
        var compiledEmail = Hogan.compile(emailTemplate);

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
    },
    newsletterPublisher: function (title, body, link) {
        const emailTemplate = fs.readFileSync(path.resolve(__dirname) + '/newsletterPublisher/newsletterPublisher-inlined.html', 'utf-8');
        var compiledEmail = Hogan.compile(emailTemplate);

        User.find({ 'email_verified': true, 'email': 'frank.simon20@gmail.com' }, (err, users) => {
            users.forEach(user => {
                var mailOptions = {
                    from: config.username,
                    to: user.email,
                    subject: title,
                    html: compiledEmail.render({ firstname: user.firstname, body: body, link: link })
                };
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Newsletter email sent: ' + user.email);
                    }
                });
            })

        });

    }
}