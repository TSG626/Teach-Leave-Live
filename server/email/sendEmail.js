var nodemailer = require('nodemailer');
const fs = require('fs')
const path = require('path')
const Hogan = require('hogan.js')
const config = require('./config.js')
const User = require('../models/UserModel.js');
const Email = require('../models/EmailModel.js');

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
        const emailTemplate = fs.readFileSync(path.resolve(__dirname) + '/welcomeEmail/welcomeEmail-inlined.html', 'utf-8')
        var compiledEmail = Hogan.compile(emailTemplate)

        var mailOptions = {
            from: 'Teach Leave Live',
            to: userInfo.email,
            subject: 'Welcome to Teach Leave Live',
            html: compiledEmail.render({
                firstname: userInfo.firstname,
                logo: config.website.url + '/logo.png', instagram: config.website.url + '/instagram.png', url: config.website.url
            })
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
        });
    },
    forgotPassword: function (key, userInfo) {
        const emailTemplate = fs.readFileSync(path.resolve(__dirname) + '/forgotPassword/forgotPassword-inlined.html', 'utf-8')
        var compiledEmail = Hogan.compile(emailTemplate)

        var mailOptions = {
            from: 'Teach Leave Live',
            to: userInfo.email,
            subject: 'Teach Leave Live: Forgot Password',
            html: compiledEmail.render({
                firstname: userInfo.firstname, code: key,
                logo: config.website.url + '/logo.png', instagram: config.website.url + '/instagram.png', url: config.website.url
            })
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
        });
    },
    userAuthenticate: function (url, userInfo) {
        const emailTemplate = fs.readFileSync(path.resolve(__dirname) + '/authenticateEmail/authenticateEmail-inlined.html', 'utf-8');
        var compiledEmail = Hogan.compile(emailTemplate);

        var mailOptions = {
            from: 'Teach Leave Live',
            to: userInfo.email,
            subject: 'Teach Leave Live: Please verify your email',
            html: compiledEmail.render({
                firstname: userInfo.firstname, url: url,
                logo: config.website.url + '/logo.png', instagram: config.website.url + '/instagram.png', website: config.website.url
            })
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
        });
    },
    newsletterPublisher: function (title, body, link) {
        const emailTemplate = fs.readFileSync(path.resolve(__dirname) + '/newsletterPublisher/newsletterPublisher-inlined.html', 'utf-8');
        var compiledEmail = Hogan.compile(emailTemplate);

        Email.find({}, (err, users) => {
            users.forEach(user => {
                var mailOptions = {
                    from: 'Teach Leave Live',
                    to: user.email,
                    subject: "Teach Leave Live: " + title,
                    html: compiledEmail.render({
                        body: body, link: link,
                        logo: config.website.url + '/logo.png', instagram: config.website.url + '/instagram.png', url: config.website.url
                    })
                };
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    }
                });
            })

        });

    },
    contact: function (body) {
        const emailTemplate = fs.readFileSync(path.resolve(__dirname) + '/contact/contact-inlined.html', 'utf-8');
        let compiledEmail = Hogan.compile(emailTemplate);

        let mailOptions = {
            from: 'Contact Form',
            to: config.email.username,
            subject: 'From the TLL contact form',
            html: compiledEmail.render({
                email: body.email, body: body.message,
                logo: config.website.url + '/logo.png', instagram: config.website.url + '/instagram.png', url: config.website.url
            })
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
        });
    },
}
