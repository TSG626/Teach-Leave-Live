import React, { useState } from 'react';
import API from '../../../modules/API';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Redirect } from 'react-router-dom';
import {UserContext} from '../../../contexts/UserContext';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.light,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    formField: {
        color: theme.palette.primary.light,
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: theme.palette.secondary.dark,
      "&:hover":{
          backgroundColor: theme.palette.secondary.light,
      }
    },
    error: {
        color: 'red'
    },
  }));

export default function Login() {
    const classes = useStyles();

    const [authed, setAuthed] = useState(false);
    const [message, setMessage] = useState('');
    const [email_message, setEmail_message] = useState('');

    async function handleClick(e) {
        API.post('/api/authEmail', {
            email: document.getElementById('email').value
        })
    }
    async function handleSubmit(e, context){
        e.preventDefault();
        API.post('/api/login', {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
        }).then(res => {
            if(res.status === 200){
                context.authenticateUser(res.data.token);
                setAuthed(true);
            }
        }).catch(err => {
            if (err.response.data.name === "UnverifiedEmail") {
                setEmail_message(err.response.data.message);
            }
            else {
                setMessage(err.response.data.message);
            }
        });
    }

    if(authed === true) {
        return(<Redirect to='/Home'/>);
    };

    return (
        <UserContext.Consumer>{context => {
            setAuthed(context.isAuthenticated());
            return(
                <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography className={classes.formField} component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} onSubmit={(e) => handleSubmit(e, context)}>
                    <TextField
                        variant='filled'
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        variant="filled"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        className={classes.formField}
                    />
                    {message ? <Typography className={classes.error}>
                        {message}
                    </Typography> : <React.Fragment/>}
                    {email_message ?
                        <React.Fragment>
                            <Typography className={classes.error}>
                                {email_message} Check your inbox.
                                To resend the email, click the button below.
                            </Typography>
                            <Button color = "primary" component={Link} href = '/User/Login' onClick = {(e) => handleClick(e)}>
                                Resend Authentication Email
                            </Button>
                        </React.Fragment>
                    : null}

                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                        <Link href="/User/ForgotPassword" variant="body2">
                            Forgot password?
                        </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/User/SignUp" variant="body2">Don't have an account? Sign Up"</Link>
                        </Grid>
                    </Grid>
                    </form>
                </div>
                </Container>
            )
        }}</UserContext.Consumer>
    );
}
