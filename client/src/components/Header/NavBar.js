import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import {UserContext} from '../../contexts/UserContext';

const AccountOptions = () => {
    return(
        <UserContext.Consumer>{context => {
            if(!context.isAuthenticated()){
                return(
                    <React.Fragment>
                        <Link className = "nav-link" to='/User/Login'>Login</Link>
                        <Link className = "nav-link" to='/User/SignUp'>Sign Up</Link>
                    </React.Fragment>
                )
            }else{
                return(
                    <React.Fragment>
                        <Link className = "nav-link" to='/User/Logout'>Log Out</Link>
                    </React.Fragment>
                )
            }
        }}</UserContext.Consumer>
    )
}

const NavBar = () => {
    return(
<UserContext.Consumer>{context => {
    if(context.isAuthenticated()) {
        return (
            <div className = "header">
                <Link className = "nav-title" to="/">
                    <div>Landing Page</div>
                </Link>
                <div className = "nav-items">
                    <Link className = "nav-link" to='/Home'>Home</Link>
                    <Link className = "nav-link" to='/Course'>Courses</Link>
                    <Link className = "nav-link" to='/Store'>Store</Link>
                    <Link className = "nav-link" to='/User'>Profile</Link>
                    <AccountOptions/>
                </div>
            </div>
        )
    }
    else {
        return(
            <div className = "header">
            <Link className = "nav-title" to="/">
                <div>Landing Page</div>
            </Link>
            <div className = "nav-items">
                <AccountOptions/>
            </div>
        </div>
        )
    }
}}</UserContext.Consumer>);
};

export default NavBar;
