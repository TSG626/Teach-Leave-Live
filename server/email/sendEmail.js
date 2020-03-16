var nodemailer = require('nodemailer');
const fs = require('fs')
const Hogan = require('hogan.js')


const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "5c4bb73cdbc195",
        pass: "a239993ba6222e"
    }
});

module.exports = {
    welcomeEmail: function (userInfo) {
        const emailTemplate = fs.readFileSync('./welcomeEmail/welcomeEmail-inlined.html', 'utf-8')
        var compiledEmail = Hogan.compile(emailTemplate)



        var mailOptions = {
            from: 'youremail@gmail.com',
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



