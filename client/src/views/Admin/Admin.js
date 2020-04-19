import React, { useState } from "react";
import { Route, Switch, Redirect, Link } from "react-router-dom";
import clsx from "clsx";
import { UserContext } from "../../contexts/UserContext";
import Blog from "./Publishers/Blog/Blog";
import Course from "./Publishers/Course/Course";
import NewsletterPublisher from "./Publishers/Newsletter/NewsletterPublisher";
import UserEditor from "./Publishers/User/UserEditor";
import {
  Box,
  CssBaseline,
  Container,
  List,
  ListItem,
  Grid,
  ListItemText,
  makeStyles,
  ListItemIcon,
  Drawer,
  Typography,
  AppBar,
} from "@material-ui/core";
import {
  Book as CourseIcon,
  Announcement as NewsletterIcon,
  Person as UserIcon,
  Note as BlogIcon,
  ChevronRight as OpenIcon,
  ChevronLeft as CloseIcon,
} from "@material-ui/icons/";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  nav: {
    boxShadow: 7,
  },
  window: {
    flexGrow: 1,
  },
  drawer: {
    width: 200,
    flexShrink: 0,
  },
  drawerContainer: {
    overflow: "auto",
  },
  drawerOpen: {
    width: 200,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: theme.mixins.toolbar,
}));

function NavMenu() {
  const classes = useStyles();
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(true);
  return (
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
      <div className={classes.drawerContainer}>
        <List>
          <ListItem>
            {open ? (
              <CloseIcon onClick={() => setOpen(false)} />
            ) : (
              <OpenIcon onClick={() => setOpen(true)} />
            )}
          </ListItem>
          <ListItem
            selected={selected === 1}
            button
            component={Link}
            to={`/Admin/Blog`}
            onClick={() => setSelected(1)}
          >
            {open ? (
              <ListItemText>Blogs</ListItemText>
            ) : (
              <ListItemIcon>
                <BlogIcon />
              </ListItemIcon>
            )}
          </ListItem>
          <ListItem
            selected={selected === 2}
            button
            component={Link}
            to={`/Admin/Course`}
            onClick={() => setSelected(2)}
          >
            {open ? (
              <ListItemText>Courses</ListItemText>
            ) : (
              <ListItemIcon>
                <CourseIcon />
              </ListItemIcon>
            )}
          </ListItem>
          <ListItem
            selected={selected === 3}
            button
            component={Link}
            to={`/Admin/Newsletter`}
            onClick={() => setSelected(3)}
          >
            {open ? (
              <ListItemText>Newsletters</ListItemText>
            ) : (
              <ListItemIcon>
                <NewsletterIcon />
              </ListItemIcon>
            )}
          </ListItem>
          <ListItem
            selected={selected === 4}
            button
            component={Link}
            to={`/Admin/User`}
            onClick={() => setSelected(4)}
          >
            {open ? (
              <ListItemText>Users</ListItemText>
            ) : (
              <ListItemIcon>
                <UserIcon />
              </ListItemIcon>
            )}
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
}

const Admin = ({ match }) => {
  const classes = useStyles();
  return (
    <UserContext.Consumer>
      {(context) => {
        if (context.user.status == 0 || context.user.status == 1) {
          return (
            <div className={classes.root}>
              <NavMenu />
              <Switch>
                <Container maxWidth={false}>
                  <div className={classes.toolbar} />

                  <Route path={`${match.path}/Blog`} component={Blog} />
                  <Route
                    path={`${match.path}/Newsletter`}
                    component={NewsletterPublisher}
                  />
                  <Route path={`${match.path}/User`} component={UserEditor} />
                  <Route path={`${match.path}/Course`} component={Course} />
                </Container>
              </Switch>
            </div>
          );
        } else if (!context.user) {
          return <Redirect to="/Home" />;
        }
      }}
    </UserContext.Consumer>
  );
};
export default Admin;
