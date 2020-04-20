const express = require('express'),
    crypto = require('crypto'),
    UserModel = require('../models/UserModel'),
    sendEmail = require('../email/sendEmail');

module.exports = {
    sendAuthenticationEmail: async (req, userInfo) => {
        const key = crypto.randomBytes(256).toString('hex').substr(119, 10);
        userInfo.key_for_verify = key;
        const url = 'http://' + req.get('host')+'/api/confirmEmail'+'?key='+key;
        sendEmail.userAuthenticate(url, userInfo);
    },
    resendEmail: async(req) => {
        const email = req.body.email;
        const key = crypto.randomBytes(256).toString('hex').substr(35, 10);
        UserModel.findOneAndUpdate({'email': email}, {$set:{'key_for_verify': key}}, (err, user) => {
            if (err) {
                console.log(err);
            }
            else {
                if (user) {
                    const url = 'http://' + req.get('host')+'/api/confirmEmail'+'?key='+key;
                    sendEmail.userAuthenticate(url, user);
                }
            }
        });
    }
}
