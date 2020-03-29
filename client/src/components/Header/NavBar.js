import React, { useState } from 'react';
import { useLocation, Redirect, Link as RouterLink } from 'react-router-dom';
import './NavBar.css';
import { fade, makeStyles } from '@material-ui/core/styles';
import {UserContext} from '../../contexts/UserContext';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import { Typography, Menu, MenuItem, Badge, IconButton, AppBar, Toolbar, InputBase, Avatar, Grid, Box, Collapse, TextField, Link } from '@material-ui/core';
import { Mail as MailIcon, Search as SearchIcon, AccountCircle, More as MoreIcon, Menu as MenuIcon, Notifications as NotificationsIcon} from '@material-ui/icons';
import Hoverable from '../Interface/Hoverable';

const useStyles = makeStyles(theme => ({
    grow: {
      flexGrow: 1,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto',
        },
      },
      searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: 'inherit',
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        width: '100%',
      },
      appBar: {
        zIndex: theme.zIndex.drawer + 1,
      },
}));

const AccountOptions = () => {
    let admin = false;

    return(
        <UserContext.Consumer>{context => {
            admin = true;
            if(!context.isAuthenticated()){
                return(
                    <Grid container>
                        <Grid item xs={12} sm={6}>
                            <Link href='/User/Login' color='inherit'>Login</Link>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Link href='/User/SignUp' color='inherit'>Sign Up</Link>
                        </Grid>
                    </Grid>
                )
            }else{
                return(
                    <Grid container>
                        <Grid item xs={12} sm={6}>
                            <Link href='/User/Logout' color='inherit'>Log Out</Link>
                        </Grid>
                        {admin && <Grid item xs={12} sm={6}>
                            <Link href='/Admin/' color='inherit'>Admin Panel</Link>
                        </Grid>}
                    </Grid>
                )
            }
        }}</UserContext.Consumer>
    )
}

const UserBar = () => {

}

function SearchBar(){
    const classes = useStyles();

    return(
        <div className={classes.search}>
            <div className={classes.searchIcon}>
                <SearchIcon fontSize='small'/>
            </div>
            <InputBase
                placeholder="Search…"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{ style: {fontSize: 12} }}
            />
        </div>
    )
}

function LogoIcon(){

}

function Logo(){
    return (
        <Hoverable>{hovering => <div>
            <Button component={RouterLink} to={'/Home'}>
                <Box 
                    display="flex" 
                    justifyContent="center"
                    bgcolor='white' m={1} 
                    style={ {width: '3rem', height: '3rem'} } 
                    borderRadius="50%"
                    boxShadow={hovering ? 7 : 2}
                    borderColor='secondary'
                >
                    <Typography style={{color: 'black', fontSize: 32, fontFamily: 'Georgia', paddingTop: 0}}>T</Typography>
                </Box>
            </Button>
        </div>}</Hoverable>
    );
}

export default function NavBar() {
    const classes = useStyles();

    return(
        <div className={classes.grow}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar variant='dense'>
                    <Grid container alignItems='center'>
                        {['Course', 'Blog'].map((route, index) =>{
                            return(
                                <Grid key={index} item xs={12} sm={1} container justify='center'>
                                    <Link href={`/${route}/`} color='inherit'>
                                        {route + 's'}
                                    </Link>
                                </Grid>
                            )
                        })}
                        <Grid item xs={12} sm={3} container justify='center'>
                            <SearchBar/>
                        </Grid>
                        <Grid item xs={12} sm={2} container justify='center'>
                            <Logo/>
                        </Grid>
                        <Grid item container xs={12} sm={3}>
                            {['Donate', 'Store'].map((route, index) => {
                                return(
                                    <Grid key={index} item xs={12} sm={6} container justify='center'>
                                        <Link href={`/${route}/`} color='inherit'>
                                            {route}
                                        </Link>
                                    </Grid>
                                )
                            })}
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <AccountOptions/>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
        );
}