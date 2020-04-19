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
        const emailTemplate = fs.readFileSync(path.resolve(__dirname) + '/forgotPassword/forgotPassword-inlined.html', 'utf-8')
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
            }
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

        Email.find({}, (err, users) => {
            users.forEach(user => {
                var mailOptions = {
                    from: config.username,
                    to: user.email,
                    subject: "Teach Leave Live: " + title,
                    html: compiledEmail.render({ body: body, link: link })
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

    },
    contact: function (body) {
      const emailTemplate = fs.readFileSync(path.resolve(__dirname) + '/contact/contact-inlined.html', 'utf-8');
      let compiledEmail = Hogan.compile(emailTemplate);

      let mailOptions = {
          from: body.email,
          to: config.email.username,
          subject: 'From the TLL contact form',
          html: compiledEmail.render({email: body.email, body: body.message})
      };
      transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
              console.log(error);
          } else {
              console.log('Contact email sent from: ' + body.email);
          }
      });
    },
}
