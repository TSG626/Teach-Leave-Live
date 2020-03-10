const createEmail = require('./createEmail');
const fs = require('fs');
const fetch = require('node-fetch');

function saveEmail(email) {
    return new Promise((resolve, reject) => {
        fs.writeFile('Email.html', email, (err) => {
            if (err) return reject(err);
            return resolve();
        });
    });
}

const userInfo = {
    firstName: "Simon",
    lastName: "Frank"
}

createEmail({ userInfo }).then((email) => {
    // Here is where you would send the email to someone using your service of
    // choiche.
    // For this example we are just writing the result to disk.
    return saveEmail(email);
});