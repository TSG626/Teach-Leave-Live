import React, { useEffect } from 'react';
import { Link , useLocation } from 'react-router-dom';
import './NavBar.css';
import {UserContext} from '../../contexts/UserContext';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

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
                        <Link className="nav-link" to='/User/Profile'>
                            <Button>
                                <AccountCircleIcon />
                            </Button>
                        </Link>
                    </React.Fragment>
                )
            }
        }}</UserContext.Consumer>
    )
}

const ShoppingCart = () => {
    const current = useLocation().pathname
    if(current === "/Store" || current === "/Store/Cart" || current === "/Store/Checkout" || current === "/Store/Confirmation" || current === "/Store/Summary")
    {
        return(
            <Button component={Link} to="/Store/Cart">
                <ShoppingCartIcon/>
            </Button>
        )
    }
    else {
        return(<div></div>);
    }
}

const NavBar = () => {
    return(
<UserContext.Consumer>{context => {
    if(context.isAuthenticated()) {
        return (
            <div className = "header">
                <Link className = "nav-title" to="/">
                    <Typography component="h1" variant="h5">Teach. Leave. Live.</Typography>
                </Link>
                <div className = "nav-items">
                    <Link className = "nav-link" to='/Home'>Home</Link>
                    <Link className = "nav-link" to='/Course'>Courses</Link>
                    <Link className = "nav-link" to='/Blog'>Blog</Link>
                    <Link className = "nav-link" to='/Store'>Course Store</Link>
                    <Link className = "nav-link" to='/User/Profile'>Profile</Link>
                    <AccountOptions/>
                    <ShoppingCart/>
                </div>
            </div>
        )
    }
    else {
        return(
            <div className = "header">
            <Link className = "nav-title" to="/">
                <Typography component="h1" variant="h5">Teach. Leave. Live.</Typography>
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
