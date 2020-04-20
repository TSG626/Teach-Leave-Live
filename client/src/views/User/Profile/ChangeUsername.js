import React, { useContext, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { Link as RouterLink } from "react-router-dom";
import {
  TextField,
  Typography,
  makeStyles,
  Container,
  Grid,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import API from "../../../modules/API";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.light,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  formField: {
    color: theme.palette.primary.light,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: theme.palette.secondary.dark,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  error: {
    color: "red",
  },
}));

const ChangeUsername = () => {
  const classes = useStyles();
  const userInfo = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [changed, isChanged] = useState(false);
  const [username, setUsername] = useState(userInfo.user.username);
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (password === "") {
      setMessage("Please include your password.");
    } else if (username === userInfo.user.username || username === "") {
      setMessage("Please create a new username.");
    } else {
      API.post("/api/checkusernamenotexist", {
        username: username,
      })
        .then((res) => {
          API.post("/api/updateusername", {
            password: password,
            username: username,
            oldUsername: userInfo.user.username,
            email: userInfo.user.email,
          })
            .then((res) => {
              if (res.status === 200) {
                alert("Username changed!");
                setMessage("");
                isChanged(true);
              }
            })
            .catch((err) => {
              setMessage("Incorrect password.");
            });
        })
        .catch((err) => {
          setMessage("Please use a different username.");
        });
    }
  };

  if (changed) {
    window.location.pathname = "/Home";
    return false;
  }
  return (
    <UserContext.Consumer>
      {(context) => {
        if (context.isAuthenticated()) {
          return (
            <Container component="main" maxWidth="xs">
              <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                  Change Username
                </Typography>
                <TextField
                  variant="filled"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoFocus
                  className={classes.formField}
                  defaultValue={userInfo.user.username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
                <TextField
                  variant="filled"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  className={classes.formField}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                {message ? (
                  <Typography className={classes.error}>{message}</Typography>
                ) : (
                  <React.Fragment />
                )}
                <Grid container spacing={5} justify="center">
                  <Grid item xs={10} sm={5}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      onClick={handleSubmit}
                    >
                      Confirm
                    </Button>
                  </Grid>
                  <Grid item xs={10} sm={5}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      component={RouterLink}
                      to={"/Home"}
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Container>
          );
        }
      }}
    </UserContext.Consumer>
  );
};
export default ChangeUsername;
