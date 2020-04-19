import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { Redirect } from "react-router-dom";
import { TextField, Typography, makeStyles, Box } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import API from "../../../modules/API";
import Avatar from "react-avatar";

const useStyles = makeStyles((theme) => ({
  marginStuff: {
    marginTop: theme.spacing(5),
  },
}));

const ChangeUser = () => {
  //fix later for CRUD update to username on user
  const classes = useStyles();
  const [edituser, setEditUser] = useState(false);
  const userInfo = useContext(UserContext);
  const [oldUser, setOldUser] = useState(userInfo.user.username);
  const [password, setPassword] = useState("");
  const handleChange = (event) => {
    if (edituser === false) setEditUser(!edituser);
    else {
      if (oldUser === userInfo.user.username || oldUser === "") {
        alert("Username didn't change!");
      } else {
        API.post("/api/checkusernamenotexist", {
          username: oldUser,
        })
          .then((res) => {
            API.post("/api/updateusername", {
              password: password,
              username: oldUser,
              oldUsername: userInfo.user.username,
              email: userInfo.user.email,
            })
              .then((res) => {
                if (res.status == 200) {
                  alert("Username changed!");
                }
                window.location.reload(false);
                return false;
              })
              .catch((err) => {
                console.log(err.response.data);
              });
          })
          .catch((err) => {
            alert("Username already exists! Please use a different username");
          });
      }
      setEditUser(!edituser);
      setPassword("");
      setOldUser(userInfo.user.username);
    }
  };

  if (!edituser) {
    return (
      <Button onClick={handleChange}>
        <Typography variant="h3" component="h3">
          {userInfo.user.username}
        </Typography>
      </Button>
    );
  } else {
    return (
      <div>
        <TextField
          label="Username"
          onChange={(e) => {
            setOldUser(e.target.value);
          }}
          variant="standard"
          id="newuser"
          autoFocus
        />
        <div>
          <TextField
            label="Password"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            variant="standard"
            id="confirmpass"
          />
        </div>
        <div>
          <Button
            className={classes.marginStuff}
            onClick={handleChange}
            variant="contained"
            color="secondary"
          >
            Change Username
          </Button>
        </div>
      </div>
    );
  }
};

const ChangePass = () => {
  //fix later for CRUD update to password on user
  const classes = useStyles();
  const [editpass, isEditPass] = useState(false);
  const [errors, setErrors] = useState({
    npassword: "",
    cpassword: "",
  });
  const [oldpassword, setOldPassword] = useState("");
  const [npassword, setNPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const userInfo = useContext(UserContext);

  const handleChange = () => {
    //find how to get password

    if (editpass === false) {
      isEditPass(!editpass);
      setErrors({
        ...errors,
        cpassword: false,
        npassword: false,
      });
    } else {
      if (errors.npassword || errors.cpassword) {
        alert("Your new password or the confirmation password is incorrect!");
      } else {
        API.post("/api/updatepassworduser", {
          email: userInfo.user.email,
          password: npassword,
          oldPassword: oldpassword,
        })
          .then((res) => {
            if (res.status == 200) {
              isEditPass(!editpass);
              alert("Your password has been reset!");
            }
            window.location.reload(false);
            return false;
          })
          .catch((err) => {
            alert("Password is incorrect!");
          });
      }
      isEditPass(!editpass);
    }
  };
  const handleNPassChange = (event) => {
    setNPassword(event.target.value);
    if (event.target.value.length < 8) {
      setErrors({
        ...errors,
        npassword: event.target.value.length < 8,
      });
    } else {
      setErrors({
        ...errors,
        npassword: false,
      });
    }
  };
  const handleCPassChange = (event) => {
    setCPassword(event.target.value);
    if (event.target.value == npassword) {
      setErrors({
        ...errors,
        cpassword: false,
      });
    } else {
      setErrors({
        ...errors,
        cpassword: true,
      });
    }
  };
  if (!editpass)
    return (
      <Button
        className={classes.marginStuff}
        onClick={handleChange}
        variant="contained"
        color="secondary"
      >
        Change Password
      </Button>
    );
  else
    return (
      <div>
        <table align="center">
          <tr>
            <td width="30%" align="center">
              <TextField
                className={classes.marginStuff}
                onChange={(e) => {
                  setOldPassword(e.target.value);
                }}
                type="password"
                label="Old Password"
                id="oldpass"
                variant="filled"
                autoFocus
              />
            </td>
            <td width="30%" align="center">
              <TextField
                onChange={handleNPassChange}
                type="password"
                className={classes.marginStuff}
                label="New Password"
                id="npass"
                variant="filled"
              />
            </td>
            <td width="30%" align="center">
              <TextField
                onChange={handleCPassChange}
                className={classes.marginStuff}
                type="password"
                label="Confirm New Password"
                id="cpass"
                variant="filled"
              />
            </td>
            <td>
              <Button
                className={classes.marginStuff}
                onClick={handleChange}
                type="password"
                variant="contained"
                id="newpass"
                color="secondary"
              >
                Confirm Password
              </Button>
            </td>
          </tr>
          <tr>
            <td></td>
            <td align="center">
              {errors.npassword ? (
                <Typography>Password must be 8 characters or more</Typography>
              ) : (
                <div></div>
              )}
            </td>
            <td align="center">
              {errors.cpassword ? (
                <Typography>Password must match new password</Typography>
              ) : (
                <div></div>
              )}
            </td>
          </tr>
        </table>
      </div>
    );
};

const Profile = () => {
  const classes = useStyles();
  const userInfo = useContext(UserContext);
  return (
    <UserContext.Consumer>
      {(context) => {
        if (context.isAuthenticated()) {
          return (
            <div className="App">
              <header className="App-header">
                <Box p={1}>
                  <Button>
                    <Avatar
                      round={true}
                      color={Avatar.getRandomColor("sitebase", [
                        "#2BCED6",
                        "#222831",
                        "#393E46",
                        "#00ADB5",
                      ])}
                      name={
                        `${context.user.firstname}` +
                        " " +
                        `${context.user.lastname}`
                      }
                    />
                  </Button>
                </Box>
                <ChangeUser />
                <Box mu={1}>
                  <Typography>
                    {context.user.firstname} {context.user.lastname}
                  </Typography>
                  <Typography>{context.user.email}</Typography>
                </Box>
                <ChangePass />
              </header>
            </div>
          );
        } else {
          return <Redirect to="/User/Login" />;
        }
      }}
    </UserContext.Consumer>
  );
};
export default Profile;
