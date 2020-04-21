import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import WebIcon from "@material-ui/icons/Web";
import { Link, Box, Fade, Grow } from "@material-ui/core";
import Link2 from "@material-ui/core/Link";
import { CssBaseline, Container, Grid, Typography, Table, TableBody, TableRow } from "@material-ui/core";
import Blog from "../Admin/Publishers/Blog/Blog";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";
import API from "../../modules/API.js";
import { Slide } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  cardList: {
    padding: theme.spacing(1, 1),
    backgroundColor: "grey",
  },
}));

function Socials() {
  return (
    <React.Fragment>
    <Grid container direction="column">
    <Slide direction="left" timeout={3000} mountOnEnter in="true">
      <Grid item>
        <Box display="flex" align="center" m={1} mt={6}>
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
        </Box>
      </Grid>
      </Slide>
      <Slide direction="left" timeout={3000} mountOnEnter in="true">
      <Grid item>
        <Box align="center">
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
        </Box>
      </Grid>
      </Slide>
    </Grid>
    </React.Fragment>
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
      <Fade in="true" mountOnEnter timeout={3000}>
        <Box m={5}>
        <Typography align={"center"} variant="h3">
          Welcome to Teach. Leave. Live.
        </Typography>
        </Box>
      </Fade>
      <Grow in="true" mountOnEnter timeout={3000}>
      <Grid container>
          <Grid xs={6} item>
            <Box width={1} m={4}>
              <Paper>
                  <Typography color={"initial"} variant="h5" align="center">
                    About T.L.L.
                  </Typography>
                  <Box pt={1} ml={7} mr={7}>
                  <List>
                    <ListItem>
                      TLL is a web-based platform designed to provide tools to
                      teachers so that they can teach their hearts out, leave work at
                      work, and live life with intention. We provide resources for
                      teachers to learn how to efficiently manage time and organize
                      their work.
                    </ListItem>
                  </List>
                </Box>
              </Paper>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box width={1} m={4}>
              <Typography variant="h5" align="center">Join Our Newsletter!</Typography>
              <form onSubmit={(e) => handleEmailSubmit(e)}>
                <Box ml={7} mr={7}>
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
                </Box>
                <Box ml={7} mr={7}>
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
              </Box>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Grow>
  </div>
  );
}
const ListBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    API.get("/api/blog/").then(res=>{
      setBlogs(res.data);
    })
    },[])
    var count = 0;
    return (
      <React.Fragment>
            <Box m={2} pt={3}>
              <Typography variant="h5" align="center">Recent Blogs</Typography>
            </Box>
          <Table >
            <TableBody>
          {blogs.slice(0,3).map((blog, index) => {
            count += 1;
          return (
            <Box border={1} m={3} >
              <Button fullWidth component={RouterLink} to={`/Blog/${blog._id}`}>
              <Box p={2} m={2}  key={index} align="center">
                  <TableRow>
                      <Typography component="h1" variant="h5" align="center">
                        {blog.title}
                      </Typography>
                  </TableRow>
            </Box>
            </Button>
            </Box>
          );
        })}
        {count === 0 ? <Box m={3} align="center"><Typography>No Blogs!</Typography></Box> : <React.Fragment/>}
        </TableBody>
        </Table>
       </React.Fragment>);
}

const ListCourses = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    API.get("/api/course/").then(res=>{
      setCourses(res.data)
    })
    },[])
    var count = 0;
  return (
    <React.Fragment>
      <Box m={2} pt={3}>
        <Typography variant="h5" align="center">Recent Course</Typography>
      </Box>
    <Table>
      <TableBody>
    {courses.slice(0,3).map((course, index) => {
      count += 1;
    return (
      <Box border={1} m={3}>
        <Box p={1} m={2}  key={index} align="center">
            <TableRow>
                <Typography component="h1" variant="h5" align="center">
                  {course.title}
                </Typography>
                <Typography variant="secondary">
                  {course.description}
                </Typography>
            </TableRow>
      </Box>
      </Box>
    );
  })}
    {count === 0 ? <Box m={3} align="center"><Typography>No Courses!</Typography></Box> : <React.Fragment/>}
  </TableBody>
  </Table>
    </React.Fragment>);
}

export default function Landing() {
  const classes = useStyles();

  return (
    <div>
      <LandingBody classes={classes} />
      <div style={{ position: "absolute", right: 1, top: 90 }}>
          <Socials />
      </div>
      <Grow in="true" mountOnEnter timeout={3000}>
        <Grid container>
          <Grid item xs={6}><ListBlogs/></Grid>
          <Grid item xs={6}><ListCourses/></Grid>
          <Grid item xs={6}>
            <Box p={4} display="flex" justifyContent='center' color='primary'>
              <Link href='/Contact'>Contact Us</Link>
            </Box>
          </Grid>
        </Grid>
      </Grow>
    </div>
  );
}
