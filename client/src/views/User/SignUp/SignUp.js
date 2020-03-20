import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {UserContext} from '../../../contexts/UserContext';
import API from '../../../modules/API';
import './SignUp.css';

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
    error:{
        color: 'red',
    }
}));
  
export default function SignUp() {
    const classes = useStyles();
    const [authed, setAuthed] = useState(false);
    const [registered, setRegistered] = useState(false);
    const [errors, setErrors] = useState({
        email: '',
        username: ''
    });
    //Add error handling here
    function validatePassword(){
        setErrors({
            ...errors, 
            password: (document.getElementById('password').value.length < 8),
            passwordMismatch: document.getElementById('password').value !== document.getElementById('cpassword').value
        });
    }

    function handleSubmit(e){
        e.preventDefault();
        if (!errors.passwordMismatch && !errors.password){
            API.post('/api/register', {
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
                username: document.getElementById('username').value,
                firstname: document.getElementById('firstname').value,
                lastname: document.getElementById('lastname').value,
                reference: document.getElementById('reference').value
            }).then(res => {
                if(res.status == 200) setRegistered(true);
            }).catch(err => {
                console.log(err.response.data);
                setErrors({
                    ...errors, 
                    email: err.response.data.errors.email, 
                    username: err.response.data.errors.username
                });
            });
        }
    }

    if(authed === true) {
        return(<Redirect to='/Home'/>);
    };

    if(registered) {
        return(<Redirect to='/User/Login'/>);
    };

    return (
        <UserContext.Consumer>{(context) => {
            setAuthed(context.isAuthenticated());
            return(
                <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form className={classes.form} onSubmit={e => handleSubmit(e, context)}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="firstname"
                        label="First Name"
                        name="firstname"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="lastname"
                        label="Last Name"
                        name="lastname"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                    />
                    {errors.email ? <Typography className={classes.error}>
                        {errors.email}
                    </Typography> : <React.Fragment/>}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="reference"
                        label="How did you hear about us?"
                        name="reference"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="Username"
                    />
                    {errors.username}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={validatePassword}
                    />
                    {errors.password ? <Typography className={classes.error}>
                        Password must be atleast 8 characters.
                    </Typography> : <React.Fragment/>}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="cpassword"
                        label="Confirm Password"
                        type="password"
                        id="cpassword"
                        autoComplete="current-password"
                        onChange={validatePassword}
                    />
                    {errors.passwordMismatch ? <Typography className={classes.error}>
                        Password fields do not match.
                    </Typography> : <React.Fragment/>}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    </form>
                </div>
                </Container>
            )}}
        </UserContext.Consumer>
    );
}
