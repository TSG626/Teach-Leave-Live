const express = require('express'),
    PasswordReset = require('../models/PasswordResetModel.js'),
    bcrypt = require('bcrypt');

/*This file is called by auth.js and has the helper functions
to deal with password reset info*/
module.exports = {
    storePasswordResetData: async function (body, code) {
        await PasswordReset.deleteOne({ 'email': body.email });
        const passwordreset = new PasswordReset({
            email: body.email,
            passwordResetCode: code,
            passwordResetAttempts: 5
        });
        await passwordreset.save((err) => {
            if(err){ handleError(err); }
        });
    },
    tryCode: async function (body) {
        let object = await PasswordReset.findOne({ 'email': body.email });
        return await bcrypt.compare(body.code.toUpperCase(), object.get('passwordResetCode')).then(async function (response) {
            if (response === true) {
                await PasswordReset.deleteOne({ 'email': body.email });
                return true;
            } else {
                return false;
            }
        }).catch(error => handle(error));
    },
    decrementPasswordResetAttempts: async function (body) {
        let attempts = 0;
        await PasswordReset.findOne({ 'email': body.email }, function (err, pr) {
            if (err) { handleError(err) }
            if (pr) {
                attempts = pr.passwordResetAttempts;
                attempts--;
            }
        });
        await PasswordReset.findOneAndUpdate(
          { 'email': body.email },
          { 'passwordResetAttempts': attempts }
        );
    },
    checkCodeStillValid: async function (body) {
        let attempts = await PasswordReset.findOne({ 'email': body.email });
        if (attempts.get('passwordResetAttempts') < 1) {
          await PasswordReset.deleteOne({ 'email': body.email });
          return false;
        } else {
          return true;
        }
    },
};
