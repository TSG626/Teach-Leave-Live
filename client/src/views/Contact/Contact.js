import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import API from "../../modules/API";
import { Input } from "@material-ui/core";

const Contact = () => {
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    input: {
      marginTop: theme.spacing(5),
    },
  }));

  function handleSubmit(e) {
    e.preventDefault();
    API.post("/api/contact/", {
      email: document.getElementById("email").value,
      message: document.getElementById("message").value,
    });
    setSent(true);
  }

  const [sent, setSent] = useState(false);

  const classes = useStyles();
  return !sent ? (
    <div>
      <Box p={4}>
        <div class="title">
          <h1>Teach. Leave. Live.</h1>
        </div>
      </Box>
      <Box p={4}>
        <div class="message">
          <Typography component="h1" variant="h5">
            Email us
          </Typography>
          <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
            <Input
              className={classes.input}
              placeholder="message"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              multiline
              id="message"
              label="Message"
              name="message"
              autoComplete="message"
              autoFocus
            />
            <Input
              className={classes.input}
              placeholder="email"
              variant="outlined"
              margin="normal"
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
              Send
            </Button>
          </form>
        </div>
      </Box>
    </div>
  ) : (
    <div>
      <div class="title">
        <h1>Teach. Leave. Live.</h1>
      </div>
      <div class="message">
        <Typography component="h1" variant="h5">
          Email sent.
        </Typography>
      </div>
    </div>
  );
};

export default Contact;
