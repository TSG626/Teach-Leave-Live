<<<<<<< HEAD
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Route, Switch } from 'react-router-dom';
import InstagramIcon from '@material-ui/icons/Instagram'
import FacebookIcon from '@material-ui/icons/Facebook';
import WebIcon from '@material-ui/icons/Web';
import { Box } from '@material-ui/core';
import Link2 from '@material-ui/core/Link';
import { CssBaseline, Container, Grid, Typography } from '@material-ui/core';
import Blog from '../Admin/Publishers/Blog/Blog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import API from '../../modules/API.js';
=======
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Route, Switch } from "react-router-dom";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import WebIcon from "@material-ui/icons/Web";
import { Link, Box } from "@material-ui/core";
import Link2 from "@material-ui/core/Link";
import { CssBaseline, Container, Grid, Typography } from "@material-ui/core";
import Blog from "../Admin/Publishers/Blog/Blog";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import API from "../../modules/API.js";
>>>>>>> cfb6e6cc9f2baabd40fe118e7304706513fc28c7

const useStyles = makeStyles((theme) => ({
  cardList: {
    padding: theme.spacing(1, 1),
    backgroundColor: "grey",
  },
}));

function Socials() {
  return (
    <Grid container direction="column">
      <Grid item>
        <Link2
          target="_blank"
          rel="noopener"
          href="https://www.instagram.com/teachleavelive/"
        >
          <InstagramIcon
            style={{ fontSize: 50 }}
            fontSize="small"
            color="inherit"
          />
        </Link2>
      </Grid>
      <Grid item>
        <Link2
          target="_blank"
          rel="noopener"
          href="https://www.facebook.com/teachleavelive/"
        >
          <FacebookIcon
            style={{ fontSize: 50 }}
            fontSize="small"
            color="inherit"
          />
        </Link2>
      </Grid>
      <Grid item>
        <Link2
          target="_blank"
          rel="noopener"
          href="https://www.teacherspayteachers.com/Store/Teach-Leave-Live"
        >
          <WebIcon style={{ fontSize: 50 }} fontSize="small" color="inherit" />
        </Link2>
      </Grid>
    </Grid>
  );
}

function LandingBody(props) {
  const classes = props.classes;
  const [message, setMessage] = useState("");

  async function handleEmailSubmit(e) {
    e.preventDefault();
    let email = document.getElementById("email").value;
    if (!email.includes("@")) {
      setMessage("Please enter a valid email.");
      return;
    } else {
      document.getElementById("email").value = "";
      setMessage("");
      API.post("/api/addEmail", {
        email: email,
      })
        .then((res) => {
          setMessage(res.data.message);
        })
        .catch((err) => {
          console.log(err);
          setMessage("Something went wrong. Please refresh and try again.");
        });
    }
  }

  return (
    <div>
      <CssBaseline />
      <Container maxWidth="lg">
        <Typography align={"center"} variant="h2">
          Welcome to TLL
        </Typography>
        <Grid container direction="row" spacing={0}>
          <Grid item>
            <Box width={1 / 2}>
              <Typography color={"initial"} variant="h6">
                About TLL
              </Typography>
              <Typography varient={"body2"}>
                TLL is a web-based platform designed to provide tools to
                teachers so that they can teach their hearts out, leave work at
                work, and live life with intention. We provide resources for
                teachers to learn how to efficiently manage time and organize
                their work.
              </Typography>
            </Box>
          </Grid>
          <Grid item>
            <Box width={1}>
              <Typography variant="h6">Join our newsletter</Typography>
              <form onSubmit={(e) => handleEmailSubmit(e)}>
                <TextField
                  variant="filled"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign Up
                </Button>
                <Typography variant="subtitle">{message}</Typography>
              </form>
            </Box>
          </Grid>
        </Grid>
        <Switch>
          <Route path={`${props.match.path}`} component={Blog} />
        </Switch>
      </Container>
    </div>
  );
}

export default function Landing({ match }) {
  const classes = useStyles();
  const [message, setMessage] = useState("");

  return (
    <div>
      <LandingBody classes={classes} match={match} />
      <div style={{ position: "absolute", right: 1, top: 90 }}>
        <Socials />
      </div>
    </div>
  );
}
