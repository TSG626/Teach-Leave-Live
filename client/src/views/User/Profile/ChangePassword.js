import './Profile.css';
import React, {useContext, useState, useEffect} from 'react';
import { UserContext } from '../../../contexts/UserContext';
import { Redirect, Link as RouterLink} from 'react-router-dom';
import { CssBaseline, TextField, Typography, makeStyles, Box, Container, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import API from '../../../modules/API'
import Avatar from 'react-avatar';

const useStyles = makeStyles(theme => ({
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
    }
  }));

const ChangePassword = () => {
    const classes = useStyles();
    const userInfo = useContext(UserContext);
    const [message, setMessage] = useState('');
    const [changed, isChanged] = useState(false);
    const [oldpassword, setOldPassword] = useState("");
    const [newpassword, setNewPassword] = useState("");
    const [confirmpassword, setConfirmedPassword] = useState("");


    const handleSubmit = () => {
        if (newpassword.length < 8) {
            setMessage('The new password must be 8 characters or more.')
        }
        else if (newpassword != confirmpassword) {
            setMessage('The new and confirmation password do not match.')
        }
        else {
            API.post('/api/updatepassworduser',{
                email: userInfo.user.email,
                password: newpassword,
                oldPassword: oldpassword,
            }).then(res => {
                if(res.status == 200) {
                alert("Your password has been reset!")};
                isChanged(true);
            }).catch(err => {
                setMessage("Password is incorrect!");
            });
        }
    }

    if(changed) {
        window.location.pathname="/Home"; 
        return false;
    }
    return(
        <UserContext.Consumer>{context => {
            if(context.isAuthenticated()) {
                return(
                    <Container component="main" maxWidth="xs">
                    <CssBaseline/>
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h5">
                            Change Password
                        </Typography>
                        <TextField
                            variant='filled'
                            margin="normal"
                            required
                            fullWidth
                            id="oldpassword"
                            label="Old Password"
                            name="oldpassword"
                            type="password"
                            autoFocus
                            className={classes.formField}
                            onChange={(e) => {setOldPassword(e.target.value)}}
                        />
                        <TextField
                            variant="filled"
                            margin="normal"
                            required
                            fullWidth
                            name="newpassword"
                            label="New Password"
                            id="newpassword"
                            type="password"
                            className={classes.formField}
                            onChange={(e) => {setNewPassword(e.target.value)}}
                        />
                        {newpassword.length < 8 ? <Typography className={classes.error}>
                            Password must be 8 characters.
                        </Typography>: <React.Fragment/>}
                        <TextField
                            variant="filled"
                            margin="normal"
                            required
                            fullWidth
                            name="confirmpassword"
                            label="Confirm Password"
                            id="confirmpassword"
                            type="password"
                            className={classes.formField}
                            onChange={(e) => {setConfirmedPassword(e.target.value)}}
                        />
                        {message ? <Typography className={classes.error}>
                            {message}
                        </Typography> : <React.Fragment/>}
                        <Grid container spacing={5} justify="center">
                            <Grid item xs={10} sm={5}>
                                <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={handleSubmit}
                            >
                                Confirm
                                </Button> 
                            </Grid>
                            <Grid item xs={10} sm={5}>
                                <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                component={RouterLink} to={'/Home'}
                            >
                                Cancel
                                </Button> 
                            </Grid>
                        </Grid>
                    </div>
                    </Container>
                )
                }
            }
        }
        </UserContext.Consumer>
    );

}
export default ChangePassword