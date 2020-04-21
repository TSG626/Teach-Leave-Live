import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { UserContext } from "../../contexts/UserContext";
import Button from "@material-ui/core/Button";
import {
  Typography,
  AppBar,
  Toolbar,
  Grid,
  Box,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  CssBaseline,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import Hoverable from "../Interface/Hoverable";
import Avatar from "react-avatar";
import API from "../../modules/API";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Logo2 from './logo2.png';


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  toolbar: theme.mixins.toolbar,
}));

const AccountOptions = () => {
  return (
    <UserContext.Consumer>
      {(context) => {
        if (!context.isAuthenticated()) {
          return (
            <Grid container>
              <Grid item xs={12} sm={6}>
                <Link href="/User/Login" color="inherit">
                  Login
                </Link>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Link href="/User/SignUp" color="inherit">
                  Sign Up
                </Link>
              </Grid>
            </Grid>
          );
        } else {
          return (
            <Grid container>
              <Grid item xs={12} sm={6}>
                <Link href="/User/Logout" color="inherit">
                  Log Out
                </Link>
              </Grid>
              {(context.user.status === 1 || context.user.status === 0) && (
                <Grid item xs={12} sm={6}>
                  <Link href="/Admin/" color="inherit">
                    Admin Panel
                  </Link>
                </Grid>
              )}

            </Grid>
          );
        }
      }}
    </UserContext.Consumer>
  );
};

const SimpleDialog = (props) => {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  function handleFileUpload(event) {
    var formData = new FormData();
    var imagefile = event.target.files[0];
    formData.append("avatar", imagefile);
    API.postMP("/api/user/avatar/", formData).then((res) => {});
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      style={{ textAlign: "center" }}
    >
      <DialogTitle id="simple-dialog-title">
        <div>
          <input
            accept="image/*"
            className={classes.input}
            style={{ display: "none" }}
            onChange={handleFileUpload}
            id="avatar"
            name="avatar"
            type="file"
          />
          <label htmlFor="avatar">
            <Button component="span">
              <Avatar
                round={true}
                size="3rem"
                src={props.user.avatar}
                color={Avatar.getRandomColor("sitebase", [
                  "#2BCED6",
                  "#00ADB5",
                ])}
                name={
                  `${props.user.firstname}` + " " + `${props.user.lastname}`
                }
              />
            </Button>
          </label>
        </div>
        {props.user.username}
      </DialogTitle>
      <DialogContent>
        <div>
          {props.user.firstname} {props.user.lastname}
        </div>
        <div>{props.user.email}</div>
        <Box mt={3}>
          <Grid container direction="row" justify="center">
            <Grid item xs={8} sm={4}>
              <Button
                color="primary"
                component={RouterLink}
                to={"/User/ChangeUsername"}
                onClick={handleClose}
              >
                Change Username
              </Button>
            </Grid>
            <Grid item xs={8} sm={4}>
              <Button
                color="primary"
                component={RouterLink}
                to={"/User/ChangePassword"}
                onClick={handleClose}
              >
                Change Password
              </Button>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

function Logo() {
  return (
    <Hoverable>
      {(hovering) => (
        <div>
          <UserContext.Consumer>
            {(context) => {
              var path;
              context.isAuthenticated() ? (path = "/Home") : (path = "/");
              return (
                <Button component={RouterLink} to={path}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    bgcolor="black"
                    m={1}
                    style={{ width: "5rem", height: "5rem" }}
                    borderRadius="50%"
                    boxShadow={hovering ? 7 : 2}
                    borderColor="secondary"
                  >
                  <Avatar
                    round={true}
                    size="5rem"
                    src={Logo2}
                  />
                  </Box>
                </Button>
              );
            }}
          </UserContext.Consumer>
        </div>
      )}
    </Hoverable>
  );
}

export default function NavBar() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div className={classes.grow}>
      <CssBaseline />
      <AppBar position="sticky" className={classes.appBar}>
        <Toolbar>
          <Grid container alignItems="center">
            {["Course", "Blog"].map((route, index) => {
              return (
                <Grid
                  key={index}
                  item
                  xs={12}
                  sm={1}
                  container
                  justify="center"
                >
                  <Link href={`/${route}/`} color="inherit">
                    {route + "s"}
                  </Link>
                </Grid>
              );
            })}
            <Grid item container xs={12} sm={2}>
              {["Store"].map((route, index) => {
                return (
                  <Grid
                    key={index}
                    item
                    xs={12}
                    sm={6}
                    container
                    justify="center"
                  >
                    <Link href={`/${route}/`} color="inherit">
                      {route}
                    </Link>
                  </Grid>
                );
              })}
            </Grid>
            <Grid item xs={12} sm={4} container justify="center">
              <Logo />
            </Grid>
            <Grid item xs={12} sm={2}>
              <AccountOptions />
            </Grid>
            <Grid item xs={12} sm={2} align="center" container>
              <Box pt={2} pl={3} pr={1}>
              <Grid item xs={12} sm={6}>
                <Button variant="contained" component={RouterLink} to="/Store/Cart">
                  <ShoppingCartIcon/>
                </Button>
              </Grid>
              </Box>
              <Grid item xs={12} sm={6} align="right">
              <UserContext.Consumer>
                {(context) => {
                  if (context.isAuthenticated()) {
                    return (
                      <div>
                        <Hoverable>
                          {(hovering) => {
                            return (
                              <Button onClick={handleClickOpen}>
                                <Box
                                  display="flex"
                                  justifyContent="center"
                                  m={1}
                                  style={{ width: "3rem", height: "3rem" }}
                                  borderRadius="50%"
                                  boxShadow={hovering ? 7 : 2}
                                  borderColor="secondary"
                                >
                                  {context.user ? (
                                    <Avatar
                                      round={true}
                                      size="3rem"
                                      src={context.user.avatar}
                                      color={Avatar.getRandomColor("sitebase", [
                                        "#222831",
                                        "#393E46",
                                      ])}
                                      name={
                                        `${context.user.firstname}` +
                                        " " +
                                        `${context.user.lastname}`
                                      }
                                    />
                                  ) : (
                                    <AccountCircle />
                                  )}
                                </Box>
                              </Button>
                            );
                          }}
                        </Hoverable>
                        <SimpleDialog
                          selectedValue={selectedValue}
                          open={open}
                          onClose={handleClose}
                          user={context.user}
                        />
                      </div>
                    );
                  }
                }}
              </UserContext.Consumer>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
