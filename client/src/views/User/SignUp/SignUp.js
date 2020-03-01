import React, {useState, useEffect} from 'react';
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
import axios from 'axios';
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
}));
  
export default function SignUp() {
    const classes = useStyles();

    const [registered, setRegistered] = useState(false);
    const [errors, setErrors] = useState({});

    function validatePassword(){
        if(document.getElementById('password').value !== document.getElementById('cpassword').value){
            setErrors({...errors, passwordMismatch: true});
        }else{
            setErrors({...errors, passwordMismatch: false});
        }
    }

    function handleSubmit(e, context){
        e.preventDefault();
        
        if (errors.passwordMismatch == false){
            axios.post('/api/register', JSON.stringify({
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
                username: document.getElementById('username').value,
                data: {
                    firstname: document.getElementById('firstname').value,
                    lastname: document.getElementById('lastname').value,
                    reference: document.getElementById('reference').value
                }
            }),{
                headers: {
                    "Content-Type" : "application/json"
                },
            }).then(res => {
                if(res.status === 200){
                    setRegistered(true);
                }else{
                    console.log(res.errors)
                    setErrors(...errors, res.errors);
                }
            }).catch(err => {
                console.log(err);
            });
        };
    }

    if(registered) {
        return(<Redirect to='/Login'/>);
    };

    return (
        <UserContext.Consumer>{(context) => {
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
                    {errors.email ? errors.email.value : <React.Fragment/>}
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
                    />
                    <h1>{errors.password}</h1>
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
                    />
                    {errors.passwordMismatch ? 'Password fields do not match.' : <React.Fragment/>}
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
