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
import AddIcon from '@material-ui/icons/Add';
import { UserContext } from '../../../../contexts/UserContext'

const useStyles = makeStyles({
    table: {
      margin: 'auto'
        },
  });

const GetUsers = () => {
    const [data, setData] = useState([]);
    const [changed, setChange] = useState(false);
    const [counter, setCounter] = useState(0);
    useEffect(() => {
        API.get('/api/getAllUsers').then(res=>{
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
                API.post('/api/makeAdmin', {email: user.email, admin: true}).then(res => {
                    alert(user.firstname + " " + user.lastname + " is an admin!");
                })
            }
        }
        else {
            confirmed = window.confirm("Would you like to make " + user.firstname + " " + user.lastname + " not an admin?");
            if(confirmed) {
                API.post('/api/makeAdmin', {email: user.email, admin: false}).then(res => {
                    alert(user.firstname + " " + user.lastname + " is not an admin!");
                })
            }
        }
        popupState.close();

    }
    const deleteUser = (user, popupState) => {
        popupState.close();
    }
    const classes = useStyles();
    const userInfo = useContext(UserContext);
    return(
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
                                            {userInfo.user.username === user.username ? <div><MenuItem onClick={() => {makeAdmin(user, popupState);}}>View Account</MenuItem></div>: <div>{user.admin ? <MenuItem onClick={() => {makeAdmin(user, popupState);}}>Remove Admin</MenuItem> : <MenuItem onClick={() => {makeAdmin(user, popupState);}}>Approve Admin</MenuItem>}
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
    );
}

const AddUser = () => {
    return(
        <Box ml={200}>
        <Grid container alignItems="flex-start" justify="flex-end" direction="row" >
            <Tooltip aria-label="add" title="Add User">
                <Fab aria-label="add">
                    <AddIcon />
                </Fab> 
            </Tooltip>
        </Grid>
        </Box>

    )
}

const UserEditor = () => {
    
    return (
        <CssBaseline>
            <div className="App">
                <header className="App-header">
                    Users
                    <AddUser/>
                </header>
                <GetUsers/>
            </div>
        </CssBaseline>
    );
}
export default UserEditor