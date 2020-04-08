import React, { useState } from 'react';
import { useLocation, Redirect, Link as RouterLink } from 'react-router-dom';
import './NavBar.css';
import { fade, makeStyles } from '@material-ui/core/styles';
import {UserContext} from '../../contexts/UserContext';
import Button from '@material-ui/core/Button';
import { Typography, Menu, MenuItem, Badge, IconButton, AppBar, Toolbar, InputBase, Grid, Box, Collapse, TextField, Link, Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import { Mail as MailIcon, Search as SearchIcon, AccountCircle, More as MoreIcon, Menu as MenuIcon, Notifications as NotificationsIcon} from '@material-ui/icons';
import Hoverable from '../Interface/Hoverable';
import Avatar from 'react-avatar';
import API from '../../modules/API';

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

    return(
        <UserContext.Consumer>{context => {
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
                        {(context.user.status === 1 || context.user.status === 0) && <Grid item xs={12} sm={6}>
                            <Link href='/Admin/' color='inherit'>Admin Panel</Link>
                        </Grid>}
                    </Grid>
                )
            }
        }}</UserContext.Consumer>
    )
}

const SimpleDialog = (props) => {
    const classes = useStyles();
    const { onClose, selectedValue, open } = props;
  
    const handleClose = () => {
      onClose(selectedValue);
    };
  
    const handleListItemClick = value => {
      onClose(value);
    };

    function handleFileUpload(event){
        var formData = new FormData();
        var imagefile = event.target.files[0];
        formData.append("avatar", imagefile);
        API.postMP('/api/user/avatar/', formData).then(res => {
        })
    }

    return (
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} style={{textAlign: "center"}}>
          
        <DialogTitle id="simple-dialog-title">
            <div>
            <input
                accept="image/*"
                className={classes.input}
                style={{ display: 'none' }}
                onChange={handleFileUpload}
                id="avatar"
                name='avatar'
                type="file"
            />
            <label htmlFor="avatar">
                <Button component="span">
                    <Avatar round={true} size="3rem" src={props.user.avatar} color={Avatar.getRandomColor('sitebase', ['#2BCED6','#00ADB5'])} name={`${props.user.firstname}` + " " + `${props.user.lastname}`}/>
                </Button>
            </label>
            </div>
                {props.user.username}    
        </DialogTitle>
        <DialogContent>
            <div>{props.user.firstname} {props.user.lastname}</div>
            <div>{props.user.email}</div>
            <Box mt={3}>
                <Grid container direction="row" justify="center">
                    <Grid item xs={8} sm={4}>
                        <Button color="primary" component={RouterLink} to={'/User/ChangeUsername'} onClick={handleClose}>Change Username</Button>
                    </Grid>
                    <Grid item xs={8} sm={4}>
                        <Button color="primary" component={RouterLink} to={'/User/ChangePassword'} onClick={handleClose}>Change Password</Button>
                    </Grid>
                </Grid>
            </Box>
        </DialogContent>
      </Dialog>
    );
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
            <UserContext.Consumer>{context => {
                var path;
                context.isAuthenticated() ? path='/Home' : path='/';
                return(
                    <Button component={RouterLink} to={path}>
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
                )
            }}</UserContext.Consumer>
        </div>}</Hoverable>
    );
}

export default function NavBar() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState();
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = value => {
      setOpen(false);
      setSelectedValue(value);
    };

    return(
        <div className={classes.grow}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar variant='dense'>
                    <Grid container alignItems='center'>
                        {['Course', 'Blog'].map((route, index) =>{
                            return(
                                <Grid key={index} item xs={11} sm={1} container justify='center'>
                                    <Link href={`/${route}/`} color='inherit'>
                                        {route + 's'}
                                    </Link>
                                </Grid>
                            )
                        })}
                        {/* <Grid item xs={11} sm={3} container justify='center'>
                            <SearchBar/>
                        </Grid> */}
                        <Grid item container xs={11} sm={2}>
                            {['Store'].map((route, index) => {
                                return(
                                    <Grid key={index} item xs={13} sm={6} container justify='center'>
                                        <Link href={`/${route}/`} color='inherit'>
                                            {route}
                                        </Link>
                                    </Grid>
                                )
                            })}
                        </Grid>
                        <Grid item xs={11} sm={4} container justify='center'>
                            <Logo/>
                        </Grid>
                        <Grid item xs={11} sm={2}>
                            <AccountOptions/>
                        </Grid>
                        <Grid item xs={11} sm={2} justify='center'>
                            <UserContext.Consumer>{context => {
                                if(context.isAuthenticated()) {
                                    return(
                                        <div>
                                            <Hoverable>{hovering=> {
                                                return(
                                            <Button onClick={handleClickOpen}>
                                              <Box 
                                                display="flex" 
                                                justifyContent="center"
                                                m={1} 
                                                style={ {width: '3rem', height: '3rem'} } 
                                                borderRadius="50%"
                                                boxShadow={hovering ? 7 : 2}
                                                borderColor='secondary'
                                            >
                                                <Avatar round={true} size="3rem" src={context.user.avatar} color={Avatar.getRandomColor('sitebase', ['#222831', '#393E46'])} name={`${context.user.firstname}` + " " + `${context.user.lastname}`}/>
                                                </Box>
                                            </Button>    
                                                )
                                            }}</Hoverable>
                                        <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} user={context.user}/>
                                        </div>
        
                                    )
                                }
                            }}</UserContext.Consumer>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
        );
}