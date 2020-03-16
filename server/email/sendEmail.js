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
    }
}



