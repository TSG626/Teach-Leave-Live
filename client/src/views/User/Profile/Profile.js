import React, {useContext, useState} from 'react';
import './Profile.css';
import { UserContext } from '../../../contexts/UserContext';
import { Redirect } from 'react-router-dom';
import { CssBaseline, TextField, Typography, makeStyles } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    marginStuff: {
        marginTop: theme.spacing(5),
    },
}))

export default function Profile() {
    const classes = useStyles();
    const userInfo = useContext(UserContext);
    return(
        <UserContext.Consumer>{context => {
            if(context.isAuthenticated()) {
                return (
                    <CssBaseline>
                        <div className="App">
                            <header className="App-header">
                                <Button>
                                    <AccountCircleIcon fontSize='large'/>
                                </Button>
                                <Button>
                                    <Typography variant="h3" component="h3">{userInfo.user.username}</Typography>
                                </Button>
                            </header>
                        </div>
                        <div className="AccountHeader">
                            <Typography variant="h4" component="h4">
                                Account Information
                            </Typography>
                        </div>
                        <div className="AccountSubHeader">
                            <Typography className={classes.marginStuff}>
                                First Name:
                            </Typography>
                            <Typography className={classes.marginStuff}>
                                Last Name:
                            </Typography>
                            <Typography className={classes.marginStuff}>
                                E-mail: {userInfo.user.email}
                            </Typography>
                        </div>
                    </CssBaseline>
                );
            }
            else {
                return (
                    <Redirect to="/User/Login"/>
                );
            }
        }}
        </UserContext.Consumer>
    );
}