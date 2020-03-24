import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
// import './User.css';
import Profile from "./Profile/Profile";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import { CssBaseline } from '@material-ui/core';
import {UserContext} from '../../contexts/UserContext'

function LogOut() {
    return (
        <UserContext.Consumer>{context => {
            context.deauthenticateUser();
            return(
                <Redirect to='/'/>
            );
        }}</UserContext.Consumer>
    );
}

export default function User({match}) {
    return (
        <CssBaseline>
            <Switch>
                <Route path={`${match.path}/ForgotPassword`} component={ForgotPassword} />
                <Route path={`${match.path}/Login`} component={Login} />
                <Route path={`${match.path}/Profile`} component={Profile} />
                <Route path={`${match.path}/SignUp`} component={SignUp} />
                <Route path={`${match.path}/Logout`} component={LogOut} />
            </Switch>
        </CssBaseline>
    );
}
