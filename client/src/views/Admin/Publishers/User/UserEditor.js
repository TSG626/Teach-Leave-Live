import React, { useState, useEffect, useContext} from 'react';
import './UserEditor.css';
import { CssBaseline, Table, TableHead, TableRow, TableCell, TableContainer, TableBody, Grid, Fab, Tooltip, Box, makeStyles, Paper} from '@material-ui/core';
import API from '../../../../modules/API'
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { UserContext } from '../../../../contexts/UserContext'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from 'react-avatar';
import {Link as RouterLink } from 'react-router-dom';


const useStyles = makeStyles({
    table: {
      margin: 'auto'
        },
  });

  const SimpleDialogUser = (props) => {
    const classes = useStyles();
    const { onClose, selectedValue, open } = props;
  
    const handleClose = () => {
      onClose(selectedValue);
    };
  
    const handleListItemClick = value => {
      onClose(value);
    };

    return (
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} style={{textAlign: "center"}}>
          
        <DialogTitle id="simple-dialog-title">
            <div><Avatar round={true} size="3rem" color={Avatar.getRandomColor('sitebase', ['#2BCED6','#00ADB5'])} name={`${props.user.firstname}` + " " + `${props.user.lastname}`}/></div>
            {props.user.username}</DialogTitle>
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

const GetUsers = () => {
    const [data, setData] = useState([]);
    const [changed, setChange] = useState(false);
    const [counter, setCounter] = useState(0);
    useEffect(() => {
        API.get('/api/admin/getAllUsers').then(res=>{
            setData(res.data);
        }).catch(err=>{
            console.log(err);
        });
    }, [counter]);
    if(counter === 0) {
        setCounter(1);
        setChange(true);
    }
    const makeAdmin = (user, popupState) => {
        
        var confirmed;
        if(!user.admin) {
            confirmed = window.confirm("Would you like to make " + user.firstname + " " + user.lastname + " an admin?");
            if(confirmed) {
                API.post('/api/admin/makeAdmin', {email: user.email, admin: true}).then(res => {
                    alert(user.firstname + " " + user.lastname + " is an admin!");
                    popupState.close();
                    window.location.reload(false); 
                    return false;
                })
            }
        }
        else {
            confirmed = window.confirm("Would you like to make " + user.firstname + " " + user.lastname + " not an admin?");
            if(confirmed) {
                API.post('/api/admin/makeAdmin', {email: user.email, admin: false}).then(res => {
                    alert(user.firstname + " " + user.lastname + " is not an admin!");
                    popupState.close();
                    window.location.reload(false); 
                    return false;
                })
            }
        }

    }
    const deleteUser = (user, popupState) => {
        
        var confirmed = window.confirm("Would you like to delete " + user.firstname + " " + user.lastname + "'s account?\nNOTE: Confirming this would mean that the user's information is lost.");
        if(confirmed) {
            var firstname = user.firstname;
            var lastname = user.lastname;
            API.post('/api/admin/deleteUser',{username: user.username}).then(res => {
                alert(firstname + " " + lastname + " was deleted!");
                popupState.close();
                window.location.reload(false); 
                return false;
            })
        }
        popupState.close();
    }
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState();
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = value => {
      setOpen(false);
      setSelectedValue(value);
    };
    const classes = useStyles();
    const userInfo = useContext(UserContext);
    return(
        <div>
            <Box ml="15%" mr="15%">
            <TableContainer component={Paper} >
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                </TableHead>
                <TableBody>
                    <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Admin</TableCell>
                            <TableCell></TableCell>
                    </TableRow>
                    {data.map(user => {
                        return(
                            <TableRow>
                                <TableCell>{user.firstname + " " + user.lastname}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.admin ? <CheckIcon/>:<ClearIcon/>}</TableCell>
                                <TableCell>
                                    <PopupState variant="popover" popupId="demo-popup-menu">
                                    {popupState => (
                                        <React.Fragment>
                                        <Button {...bindTrigger(popupState)}>
                                            <MoreVertIcon/>
                                        </Button>
                                        <Menu {...bindMenu(popupState)}>
                                            {userInfo.user.username === user.username ? <div><MenuItem onClick={handleClickOpen}>View Account</MenuItem><SimpleDialogUser selectedValue={selectedValue} open={open} onClose={handleClose} user={user}/></div> : 
                                            <div>{user.admin ? <MenuItem onClick={() => {makeAdmin(user, popupState);}}>Remove Admin</MenuItem> : <MenuItem onClick={() => {makeAdmin(user, popupState);}}>Approve Admin</MenuItem>}
                                            <MenuItem onClick={() => {deleteUser(user, popupState);}}>Delete User</MenuItem></div>}
                                        </Menu>
                                        </React.Fragment>
                                    )}
                                    </PopupState>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
            </Box>
        </div>
    );
}



const UserEditor = () => {
    return (
        <CssBaseline>
            <div className="App">
                <header className="App-header">
                    User Management
                </header>
                <GetUsers/>
            </div>
        </CssBaseline>
    );
}
export default UserEditor