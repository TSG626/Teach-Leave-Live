import React, { useState, useContext, useEffect } from "react";
import InstagramIcon from "@material-ui/icons/Instagram";
import Link2 from "@material-ui/core/Link";
import {
  Typography,
  Box,
  CircularProgress,
  Grid,
  CssBaseline,
  Container,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Fade,
  Grow,
} from "@material-ui/core";
import { Redirect, Route, Switch, Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import FacebookIcon from "@material-ui/icons/Facebook";
import WebIcon from "@material-ui/icons/Web";
import Blog from "../Admin/Publishers/Blog/Blog";
import API from "../../modules/API";

const ListCourses = () => {
  const userInfo = useContext(UserContext)
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    API.get("/api/user/getCourses", {username: userInfo.user.username}).then(res=>{
      for (var i = 0; i < res.data.length; i++) {
        API.get("/api/course/", {id: res.data[i]}).then(res=> {
          setCourses(oldArr=>[...oldArr, res.data])
        })
      }
    })
    },[])
    var count = 0;
  return (
    <React.Fragment>
      <Box m={2}>
        <Typography variant="h4" align="center">Recent Courses</Typography>
      </Box>
    <Table>
      <TableBody>
    {courses.slice(0,3).map((course, index) => {
      count += 1;
    return (
      <Box border={1} m={3}>
        <Button fullWidth component={Link} to={`/Course/${course._id}`}>
        <Box p={3} m={2}  key={index} align="center">
            <TableRow>
                <Typography component="h1" variant="h5" align="center">
                  {course.title}
                </Typography>
            </TableRow>
      </Box>
      </Button>
      </Box>
    );
  })}
  <Box align="center" m={3}>
    {count === 0 ? <Box mb={4} align="center"><Typography>No course? Lets buy some!</Typography></Box> : <React.Fragment/>}
    <Button component={Link} to="/Store/">Course Store</Button>
  </Box>
  </TableBody>
  </Table>
    </React.Fragment>);
};

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
        <Box m={2}>
          <Typography variant="h4" align="center">Recent Blogs</Typography>
        </Box>
      <Table>
        <TableBody>
      {blogs.slice(0,3).map((blog, index) => {
        count += 1;
      return (
        <Box border={1} m={3}>
          <Button fullWidth component={Link} to={`/Blog/${blog._id}`}>
          <Box p={3} m={2}  key={index} align="center">
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
    </TableBody>
    </Table>
      </React.Fragment>);
}

export default function Landing({ match }) {

  return (
    <UserContext.Consumer>
      {(context) => {
        if (context.isAuthenticated()) {
          return (
            <CssBaseline>
              <Grid align={"center"} xs={12}>
              <Fade in="true" mountOnEnter timeout={3000}>
                <Box m={2}>
                  <Typography variant={"h2"} component={"h2"}>
                    Welcome back, {context.user.firstname}!
                  </Typography>
                </Box>
                </Fade>
              </Grid>
              <Grid align={"center"} xs={12}>
                <Box p={2} display="flex">
                <Grow in="true" mountOnEnter timeout={3000}>
                  <Box flexGrow={0.6}>
                    <Link2
                      target="_blank"
                      rel="noopener"
                      href="https://www.instagram.com/teachleavelive/"
                    >
                      <InstagramIcon
                        style={{ fontSize: 100 }}
                        fontSize="large"
                        color="inherit"
                      />
                    </Link2>
                  </Box>
                  </Grow>
                  <Grow in="true" mountOnEnter timeout={3000}>
                  <Box flexGrow={0.6}>
                    <Link2
                      target="_blank"
                      rel="noopener"
                      href="https://www.facebook.com/teachleavelive/"
                    >
                      <FacebookIcon
                        style={{ fontSize: 100 }}
                        fontSize="large"
                        color="inherit"
                      />
                    </Link2>
                  </Box>
                  </Grow>
                </Box>
              </Grid>
              <Grid container>
              <Grow in="true" mountOnEnter timeout={3000}>
              <Grid item xs={6}><ListBlogs/></Grid>
              </Grow>
              <Grow in="true" mountOnEnter timeout={3000}>
              <Grid item xs={6}><ListCourses/></Grid>
              </Grow>
              </Grid>
            </CssBaseline>
          );
        } else {
          return <Redirect to="/User/Login" />;
        }
      }}
    </UserContext.Consumer>
  );
}
