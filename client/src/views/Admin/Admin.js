import React, {useState} from 'react';
import { Route, Switch, Redirect, Link } from 'react-router-dom';
import clsx from 'clsx';
import {UserContext} from "../../contexts/UserContext"
import BlogPublisher from "./Publishers/Blog/BlogPublisher";
import Course from "./Publishers/Course/Course";
import NewsletterPublisher from "./Publishers/Newsletter/NewsletterPublisher";
import UserEditor from "./Publishers/User/UserEditor";
import {Box, CssBaseline, Button, Typography, Container, Menu, List, ListItem, Grid, ListItemText, CircularProgress, makeStyles, ListItemIcon, Collapse, Drawer } from '@material-ui/core';
import { CourseProvider } from '../../contexts/Admin/CourseContext';
import {Book as CourseIcon, Announcement as NewsletterIcon, Person as UserIcon, Note as BlogIcon, ChevronRight as OpenIcon, ChevronLeft as CloseIcon } from '@material-ui/icons/'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    header: {

    },
    nav: {
        boxShadow: 7
    },
    window: {

    },
    footer: {

    },
    drawer: {
        width: 200,
        flexShrink: 0,
        whiteSpace: 'nowrap',
      },
    drawerOpen: {
        width: 200,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: theme.mixins.toolbar,
}));

function NavMenu(){
    const classes = useStyles();
    const [selected, setSelected] = useState(0);
    const [open, setOpen] = useState(true);
    return(
        <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
            })}
            classes={{
            paper: clsx({
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
            }),
            }}
        >
            <div className={classes.toolbar} />
            <List>
                <ListItem>
                    {open ? <CloseIcon onClick={()=>setOpen(false)}/> : <OpenIcon onClick={()=>setOpen(true)}/>}
                </ListItem>
                <ListItem selected={selected == 1} button component={Link} to={`/Admin/Blog`} onClick={()=>setSelected(1)}>
                    {open ? <ListItemText>Blogs</ListItemText> : <ListItemIcon><BlogIcon/></ListItemIcon>}
                </ListItem>
                <ListItem selected={selected == 2} button component={Link} to={`/Admin/Course`} onClick={()=>setSelected(2)}>
                    {open ? <ListItemText>Courses</ListItemText> : <ListItemIcon><CourseIcon/></ListItemIcon>}
                </ListItem>
                <ListItem selected={selected == 3} button component={Link} to={`/Admin/Newsletter`} onClick={()=>setSelected(3)}>
                    {open ? <ListItemText>Newsletters</ListItemText> : <ListItemIcon><NewsletterIcon/></ListItemIcon>}
                </ListItem>
                <ListItem selected={selected == 4} button component={Link} to={`/Admin/User`} onClick={()=>setSelected(4)}>
                    {open ? <ListItemText>Users</ListItemText> : <ListItemIcon><UserIcon/></ListItemIcon>}
                </ListItem>
            </List>
        </Drawer>
    )
}

const Admin = ({match}) => {
    const classes = useStyles();
    const [admin, setAdmin] = useState(true);

    function checkAdmin(context){
        if(context.user){
            setAdmin(context.user.admin);
        }
    }

    if(admin === false) {
        return(<Redirect to='/Home'/>);
    };

    return(
            <UserContext.Consumer>{context => {
                {checkAdmin(context)}
                return(
                    <div className={classes.root}>
                        <CssBaseline/>
                        <Grid container>
                            <Grid item xs={12} sm={1}>
                                <Box className={classes.nav}>
                                    <NavMenu/>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={11}>
                                <Container maxWidth='lg'>
                                    <Switch>
                                        <Route path={`${match.path}/Blog`} component={BlogPublisher} />
                                        <CourseProvider>
                                            <Route path={`${match.path}/Course`} component={Course} />
                                        </CourseProvider>
                                        <Route path={`${match.path}/Newsletter`} component={NewsletterPublisher} />
                                        <Route path={`${match.path}/User`} component={UserEditor} />
                                    </Switch>
                                </Container>
                            </Grid>
                        </Grid>
                    </div>
                )
            }}</UserContext.Consumer>
    )
}
export default Admin