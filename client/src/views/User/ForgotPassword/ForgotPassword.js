import React, { useState, useContext, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Redirect } from 'react-router-dom';
import {UserContext} from '../../../contexts/UserContext';


const useStyles = makeStyles(theme => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

export default function ForgotPassword() {
    const classes = useStyles();

    const [validEmail, setValidEmail] = useState(false);
    const [validCode, setValidCode] = useState(false);
    const [message, setMessage] = useState('');

    async function handleEmailSubmit(e){
        e.preventDefault();
        axios.post('/api/forgotpassword', JSON.stringify({
            mode: 'email',
            email: document.getElementById('email').value
        }),{
            headers: {
                "Content-Type" : "application/json"
            },
        }).then(res => {
            setMessage('Email sent to ' + document.getElementById('email').value + '. Please enter your 6-digit code.');
            setErrors({...errors, email: ''});
            setEmail(document.getElementById('email').value);
            document.getElementById('email').value = ('');
            setValidEmail(true);
        }).catch(err => {
            setErrors({...errors, email: err.response.data.errors.form});
        });
    }

    async function handleCodeSubmit(e){
        e.preventDefault();
        axios.post('/api/forgotpassword', JSON.stringify({
            mode: 'code',
            code: document.getElementById('code').value,
            email: email
        }),{
            headers: {
                "Content-Type" : "application/json"
            },
        }).then(res => {
            document.getElementById('code').value = ('');
            setMessage('');
            setErrors({...errors, code: ''});
            setValidCode(true);
        }).catch(err => {
            setErrors({...errors, code: err.response.data.errors.form});
            setMessage(err.response.data.message);
            if (err.response.data.message === 'Too many attempts, please try again.') {
                document.getElementById('code').value = ('');
                setValidCode(false);
                setValidEmail(false);
                setErrors({code: ''});
            }
        });
    }

    async function handleNewPassSubmit(e){
        e.preventDefault();
        if (document.getElementById("new password").value !== document.getElementById("confirm password").value) {
            alert("Passwords do not match.");
        }
        //TODO: Set new password

        return <Redirect to='/' />
    }

    const formSelection = (
        !validEmail ? ( //Email Form
            <div>
              <Typography component="h1" variant="h5">
                  Forgot Password
              </Typography>
              <form className={classes.form} onSubmit={(e) => handleEmailSubmit(e)}>
              <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
              />
              <h5>{message}</h5>
              <Button
                  type="submit"
                  fullWidth
                  varient="contained"
                  color="primary"
                  className={classes.submit}
              >
                  Send password-reset code
              </Button>
              </form>
            </div>
        ) : !validCode ? (  //Code form
          <div>
            <Typography component="h1" variant="h5">
                Enter code
            </Typography>
            <form className={classes.form} onSubmit={(e) => handleCodeSubmit(e)}>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="code"
                label="Code"
                name="code"
                autoComplete="code"
                autoFocus
            />
            <h5>{message}</h5>
            <Button
                type="submit"
                fullWidth
                varient="contained"
                color="primary"
                className={classes.submit}
            >
                Send password-reset code
            </Button>
            <p>
                {"We sent a 6-digit code to your email. If you don't receive it soon, "}
                <Link href="/Contact">
                    {"contact us"}
                </Link>
                {"."}
            </p>
            </form>
          </div>
        ) : (
          <div>
            <Typography component="h1" variant="h5">
                New password
            </Typography>
            <form className={classes.form} onSubmit={(e) => handleNewPassSubmit(e)}>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="new password"
                label="New Password"
                name="new password"
                autoComplete="new password"
                autoFocus
            />
            <Typography component="h1" variant="h5">
                Confirm password
            </Typography>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="confirm password"
                label="Confirm Password"
                name="confirm password"
                autoComplete="confirm password"
                autoFocus
            />
            <h5>{message}</h5>
            <Button
                type="submit"
                fullWidth
                varient="contained"
                color="primary"
                className={classes.submit}
            >
                Submit new password
            </Button>
            </form>
          </div>
        )
    );

    return (
        <UserContext.Consumer>{context => {
            return (
                <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                    </Avatar>
                    {formSelection}
                </div>
                </Container>
            )
        }}</UserContext.Consumer>
    );
}
