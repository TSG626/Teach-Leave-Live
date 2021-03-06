const express = require('express'),
    passport = require('passport'),
    passwordmaster = require('../config/passwordreset.js'),
    authEmail = require('../config/authEmail'),
    validator = require('validator'),
    config = require('../config/config'),
    User = require('../models/UserModel.js'),
    PasswordReset = require('../models/PasswordResetModel.js'),
    bcrypt = require('bcrypt'),
    crypto = require('crypto'),
    jwt = require('jsonwebtoken'),
    sendEmail = require('../email/sendEmail.js');

const router = express.Router();

//Filters unauthed users to /login
function checkAuthenticated(req, res, next) {
  // (req, res, next);
}

//Filters authed users to home page
function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/api/");
  }
  next();
}

function validateSignupForm(body) {
  const errors = {};
  let isFormValid = true;
  let message = "";

  if (
    !body ||
    typeof body.email !== "string" ||
    !validator.isEmail(body.email)
  ) {
    isFormValid = false;
    errors.email = "Please provide a correct email address.";
  }

  if (
    !body ||
    typeof body.password !== "string" ||
    body.password.trim().length < 8
  ) {
    isFormValid = false;
    errors.password = "Password must have at least 8 characters.";
  }

  if (
    !body ||
    typeof body.username !== "string" ||
    body.username.trim().length === 0
  ) {
    isFormValid = false;
    errors.username = "Please provide your username.";
  }

  if (!isFormValid) {
    message = "Check the form for errors.";
  }

  return {
    success: isFormValid,
    message,
    errors,
  };
}

//Handles signup
const registerHandler = (req, res, next) => {
  const validationResult = validateSignupForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors,
    });
  }
  return passport.authenticate("local-signup", (err) => {
    if (err) {
      if (err.name === "Conflict") {
        // the 11000 Mongo code is for a duplication email error
        // the 409 HTTP status code is for conflict error
        const errors = {};
        if (err.message.includes("Email")) {
          errors.email = "This email is already taken.";
        }
        if (err.message.includes("Username")) {
          errors.username = "This username is already taken.";
        }
        return res.status(409).json({
          success: false,
          message: "Check the form for errors.",
          errors: errors,
        });
      }

      return res.status(400).json({
        success: false,
        message: "Could not process the form.",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "You have successfully signed up! Now you should be able to log in.",
    });
  })(req, res, next);
};

function validateLoginForm(body) {
  const errors = {};
  let isFormValid = true;
  let message = "";

  if (
    !body ||
    typeof body.email !== "string" ||
    body.email.trim().length === 0
  ) {
    isFormValid = false;
    errors.email = "Please provide your email address.";
  }

  if (
    !body ||
    typeof body.password !== "string" ||
    body.password.trim().length === 0
  ) {
    isFormValid = false;
    errors.password = "Please provide your password.";
  }

  if (!isFormValid) {
    message = "Check the form for errors.";
  }

  return {
    success: isFormValid,
    message,
    errors,
  };
}

//Login post request handles by passport
router.post("/login", (req, res, next) => {
  const validationResult = validateLoginForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors,
    });
  }
  passport.authenticate("local-login", (err, user) => {
    if (err) {
      if (err.name === "IncorrectCredentialsError") {
        return res.status(400).json({
          success: false,
          name: err.name,
          message: err.message,
        });
      } else if (err.name === "UnverifiedEmail") {
        return res.status(400).json({
          success: false,
          name: err.name,
          message: err.message,
        });
      } else {
        return res.status(400).json({
          success: false,
          name: err.name,
          message: "Could not process the form.",
        });
      }
    }
    req.logIn(user, () => {
      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 60 * 60 * 24 * 1,
      });
      return res.json({
        auth: true,
        success: true,
        message: "You have successfully logged in!",
        token,
      });
    });
  })(req, res, next);
});

async function validateEmail(body) {
  const errors = {};
  let isFormValid = true;
  let doesEmailExist = false;
  let message = "";

  await User.findOne({ email: body.email.trim() }, function (err, user) {
    if (user) {
      doesEmailExist = true;
    }
  });
  if (
    !body ||
    typeof body.email !== "string" ||
    body.email.trim().length === 0
  ) {
    isFormValid = false;
    errors.form = "Please provide your email address.";
  }
  if (!body.email.includes("@")) {
    isFormValid = false;
    errors.form = "Please provide a valid email address.";
  }
  if (!isFormValid) {
    message = "Check the form for errors.";
  }
  return {
    success: isFormValid,
    exists: doesEmailExist,
    message,
    errors,
  };
}

function validateCode(body) {
  const errors = {};
  let isFormValid = true;
  let message = "";

  if (!body || typeof body.code !== "string" || body.code.trim().length === 0) {
    isFormValid = false;
    errors.form = "Please enter your code.";
  } else if (body.code.trim().length !== 6) {
    isFormValid = false;
    errors.form = "Code must be 6-digits.";
  }
  return {
    success: isFormValid,
    message,
    errors,
  };
}

const updatePasswordHandler = async (req, res, done) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    User.findOneAndUpdate(
      { email: req.body.email },
      { password: hashedPassword },
      { returnNewDocument: true }
    ).then((user) => {
      return res.status(200).json({
        success: true,
      });
    });
  } catch (err) {
    return done(err);
  }
};

const checkUsernameNotExist = async (req, res, done) => {
  try {
    User.findOne({ username: req.body.username }).then((user) => {
      if (!user) {
        return res.status(200).json({
          success: true,
        });
      } else {
        const error = new Error("User Exists");
        error.name = "UserExistsError";
        return done(error);
      }
    });
  } catch (err) {
    return done(err);
  }
};

const updateUsernameHandler = async (req, res, done) => {
  try {
    User.findOne({ username: req.body.oldUsername }, async (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        const error = new Error("Something went wrong!");
        error.name = "UpdatingUsernameError";
        return done(error);
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((response) => {
          if (response === true) {
            User.findOneAndUpdate(
              { email: req.body.email },
              { username: req.body.username },
              { returnNewDocument: true }
            ).then((user) => {
              return res.status(200).json({
                success: true,
              });
            });
          } else {
            const error = new Error("Incorrect password");
            error.name = "IncorrectCredentialsError";
            return done(error);
          }
        })
        .catch((error) => done(error));
    });
  } catch (err) {
    return done(err);
  }
};

const updatePasswordUser = async (req, res, done) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    User.findOne({ email: req.body.email }, async (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        const error = new Error("Something went wrong!");
        error.name = "UpdatingPasswordError";
        return done(error);
      }

      bcrypt
        .compare(req.body.oldPassword, user.password)
        .then((response) => {
          if (response === true) {
            User.findOneAndUpdate(
              { email: req.body.email },
              { password: hashedPassword },
              { returnNewDocument: true }
            ).then((user) => {
              return res.status(200).json({
                success: true,
              });
            });
          } else {
            const error = new Error("Incorrect password");
            error.name = "IncorrectCredentialsError";
            return done(error);
          }
        })
        .catch((error) => done(error));
    });
  } catch (err) {
    return done(err);
  }
};

const generateCode = () => {
    return crypto.randomBytes(32).toString('base64').replace(/[0-9]/g, '').substr(25, 6).toUpperCase();
};

const sendCodeEmail = async (email, code) => {
  const userInfo = await User.findOne({ email: email });
  const sendInfo = {
    email: userInfo.get("email"),
    firstname: userInfo.get("firstname"),
  };
  sendEmail.forgotPassword(code, sendInfo);
  return "got here";
};

router.post("/forgotpassword", async (req, res, next) => {
  let validationResult;
  if (req.body.mode === "email") {
    validationResult = await validateEmail(req.body);
    if (validationResult.exists) {
      const code = await generateCode();
      const hashedCode = await bcrypt.hash(code, 10);
      await sendCodeEmail(req.body.email, code);
      await passwordmaster.storePasswordResetData(req.body, hashedCode);
    } else {
      //This is just to buy time so timing attacks are ineffective
      const code = await generateCode();
      const hashedCode = await bcrypt.hash(code, 10);
    }
  } else if (req.body.mode === "code") {
    validationResult = validateCode(req.body);
    if (validationResult.success) {
      let matchResult = await passwordmaster.tryCode(req.body);
      if (!matchResult) {
        await passwordmaster.decrementPasswordResetAttempts(req.body);
        validationResult.success = false;
        validationResult.errors.form =
          "Incorrect code, make sure the code matches exactly.";
        if (!(await passwordmaster.checkCodeStillValid(req.body))) {
          return res.status(400).json({
            success: false,
            message: "Too many attempts, please try again.",
            errors: validationResult.errors,
          });
        }
      }
    }
  } else if (req.body.mode === "password") {
    validationResult = validateNewPassword(req.body);
  }

  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors,
    });
  } else {
    return res.json({
      success: true,
      message: "",
    });
  }
});

//Update password
router.post("/updatepassword", updatePasswordHandler);
//Update username
router.post("/updateusername", updateUsernameHandler);
//Update password on User Page
router.post("/updatepassworduser", updatePasswordUser);
//Check to see if username exists
router.post("/checkusernamenotexist", checkUsernameNotExist);
router.post("/authEmail", authEmail.resendEmail);

//Signup
router.post("/register", checkNotAuthenticated, registerHandler);

//confirm email
router.get("/confirmEmail", (req, res) => {
  User.findOneAndUpdate(
    { key_for_verify: req.query.key },
    { $set: { email_verified: true } },
    (err, user) => {
      if (err) {
        console.log(err);
        res.status(400).json({ message: err });
      } else if (!user) {
        res.send(
          '<script type="text/javascript">alert("Not verified"); window.close();</script>'
        );
      } else {
        userInfo = {
          email: user.email,
          firstname: user.firstname,
        };
        sendEmail.welcomeEmail(userInfo);
        res.send(
          '<script type="text/javascript">alert("Successfully verified"); window.close();</script>'
        );
      }
    }
  );
});

//Authed users may access other routes of the site including homepage.
router.use("/", (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Could not authenticate user." });
    } else {
      req.user = user;
      next();
    }
  })(req, res, next);
});

module.exports = router;
