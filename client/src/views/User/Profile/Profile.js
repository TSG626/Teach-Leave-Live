import React, {useContext, useState, useEffect} from 'react';
import './Profile.css';
import { UserContext } from '../../../contexts/UserContext';
import { Redirect } from 'react-router-dom';
import { CssBaseline, TextField, Typography, makeStyles } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import API from '../../../modules/API'

const useStyles = makeStyles(theme => ({
    marginStuff: {
        marginTop: theme.spacing(5),
    },
}))

const ChangeUser = () => {
        //fix later for CRUD update to username on user
    const classes = useStyles();
    const [edituser, setEditUser] = useState(false);
    const userInfo = useContext(UserContext);
    const [oldUser, setOldUser] = useState(userInfo.user.username);
    const [changed, isChanged] = useState(false);
    const [password, setPassword] = useState("");
    const handleChange = (event) => {
        if(changed) {
            alert("Username has been changed once! Please refersh the page to see your new username and to change it if needed.");
        }
        else {
        if(edituser === false)
            setEditUser(!edituser)
        else {
            console.log(userInfo.user.username);
            console.log(password);
            if(oldUser === userInfo.user.username || oldUser === "") {
                alert("Username didn't change!");
            }
            else {
                API.post('/api/updateusername', {
                    password: password,
                    username: oldUser,
                    oldUsername: userInfo.user.username,
                    email: userInfo.user.email
                }).then(res => {    
                    if(res.status == 200) {alert("Username changed! Please refresh the page or re-log in to see your new username."); isChanged(true)};
                }).catch(err =>{
                    console.log(err.response.data);
                })
            }
            setEditUser(!edituser);
            setPassword("");
            setOldUser(userInfo.user.username);
        }
        }
    }

    if(!edituser)
    {
        return(
            <Button onClick={handleChange}>
                <Typography variant="h3" component="h3">{userInfo.user.username}</Typography>
            </Button>
            )
    }
    else
    {
        return(
            <div>
                <TextField label="Username" onChange={e => {setOldUser(e.target.value)}} variant="standard" id="newuser" defaultValue={userInfo.user.username} autoFocus/>
                <div>
                    <TextField label="Password" type="password" onChange={e => {setPassword(e.target.value)}} variant="standard" id="confirmpass"/>
                </div>
                <div>
                    <Button className={classes.marginStuff} onClick={handleChange} variant="contained" color="secondary">Change Username</Button>
                </div>  
            </div>      
            )
    }

}

const ChangePass = () => {
    //fix later for CRUD update to password on user
    const classes = useStyles();
    const [editpass, isEditPass] = useState(false);
    const [errors, setErrors] = useState({
        npassword: '',
        cpassword: ''
    })
    const [oldpassword, setOldPassword] = useState("");
    const [npassword, setNPassword] = useState("");
    const [cpassword, setCPassword] = useState("");
    const userInfo = useContext(UserContext);

    const handleChange = () => {
        //find how to get password
        if(editpass === false)
        {
            isEditPass(!editpass)
            setErrors({
                ...errors,
                cpassword: false,
                npassword: false
            })
        }            
        else {
            if(errors.npassword || errors.cpassword) {
                alert('Your new password or the confirmation password is incorrect!')
            }
            else {
                API.post('/api/updatepassworduser',{
                    oldPassword: oldpassword
                }).then(res => {
                    if(res.status == 200) {isEditPass(!editpass)};
                }).catch(err => {
                    console.log(err.response.data);
                    setErrors({
                        ...errors, 
                        email: err.response.data.errors.email, 
                        username: err.response.data.errors.password
                    });
                });
            }
            isEditPass(!editpass);
        }}
    const handleNPassChange = (event) => {
        setNPassword(event.target.value);
        if(event.target.value.length < 8) {
            setErrors({
                ...errors,
                npassword: (event.target.value.length < 8)
            })
        }
        else {
            setErrors({
                ...errors,
                npassword: false
            })
        }
    }
    const handleCPassChange = (event) => {
        setCPassword(event.target.value);
        if(event.target.value == npassword) {
            setErrors({
                ...errors,
                cpassword: false
            })
        }
        else {
            setErrors({
                ...errors,
                cpassword: true
            })
        }
    }
    if(!editpass)
        return(<Button className={classes.marginStuff} onClick={handleChange} variant="contained" color="secondary">Change Password</Button>)
    else
        return( 
            <div>
            <table>
            <tr>
                <td width="30%" align="center"><TextField className={classes.marginStuff} onChange={e =>{setOldPassword(e.target.value)}} type="password" label="Old Password" id="oldpass" variant="filled" autoFocus/></td>
                <td width="30%" align="center"><TextField onChange={handleNPassChange} type="password" className={classes.marginStuff} label="New Password" id="npass" variant="filled"/></td>
                <td width="30%" align="center"><TextField onChange={handleCPassChange} className={classes.marginStuff} type="password" label="Confirm New Password" id="cpass" variant="filled"/></td>
                <td><Button className={classes.marginStuff} onClick={handleChange} type="password" variant="contained" id="newpass" color="secondary">Confirm Password</Button></td>
            </tr>
            <tr>
                <td></td>
                <td align="center">{errors.npassword ? <Typography>Password must be 8 characters or more</Typography>: <div></div>}</td>
                <td align="center">{errors.cpassword ? <Typography>Password must match new password</Typography>: <div></div>}</td>
            </tr>
            </table>
        </div>
        )
}

const Profile = () => {
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
                                <ChangeUser />
                            </header>
                        </div>
                        <div className="AccountHeader">
                            <Typography variant="h4" component="h4">
                                Account Information
                            </Typography>
                        </div>
                        <div className="AccountSubHeader">
                            <Typography className={classes.marginStuff}>
                                First Name: {context.user.firstname}
                            </Typography>
                            <Typography className={classes.marginStuff}>
                                Last Name: {context.user.lastname}
                            </Typography>
                            <Typography className={classes.marginStuff}>
                                E-mail: {context.user.email}
                            </Typography>
                            <ChangePass/>
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
export default Profile