import React, { useState, useContext } from "react";
import InstagramIcon from "@material-ui/icons/Instagram";
import Link2 from "@material-ui/core/Link";
import { Typography, Box, CircularProgress, Slide } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { Redirect, Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import Grow from "@material-ui/core/Grow";

const ListCourses = () => {
  const [courses, setCourses] = useState([
    {
      title: "Tutuoring Forums",
      progress: 70,
    },
    {
      title: "Last 9 Weeks Checklist",
      progress: 50,
    },
  ]);
  return courses.map((course, index) => {
    return (
      <Box p={5} m={3} border={1} key={index}>
        <table>
          <tbody>
            <tr>
              <td className="left">
                <Typography component="h1" variant="h5">
                  {course.title}:
                </Typography>
              </td>
              <td align="right">
                <CircularProgress variant="static" value={course.progress} />
              </td>
            </tr>
          </tbody>
        </table>
      </Box>
    );
  });
};

const ListBlogs = () => {
  //const [blogs, setBlogs] = useState("No blogs available!")
  //TEMPORARY! For the purpose of presenting in Sprint 1
  const [blogs, setBlogs] = useState([
    {
      title: "This website is cool",
      date: "March 9, 2020",
      post: "The first course is available! I hope you enjoy it!",
      user: "Spencer",
      comments: [
        {
          username: "john123",
          text: "Awesome! Can't wait!",
        },
        {
          username: "simon32",
          text: "I'm excited!",
        },
      ],
    },
    {
      title: "This website is nice",
      date: "March 8, 2020",
      post: "Welcome to TLL! Have fun!",
      user: "Amanda",
      comments: [
        {
          username: "bob7",
          text: "Thanks!",
        },
        {
          username: "maryC",
          text: "Very cool!",
        },
        {
          username: "john123",
          text: "Hi!",
        },
        {
          username: "simon32",
          text: "This is helpful!",
        },
      ],
    },
  ]);
  return blogs.map((blog, index) => {
    return (
      <div key={index}>
        <Box p={5} m={4.5} border={1}>
          <table>
            <tbody>
              <tr>
                <td className="left">
                  <Typography component="h1" variant="h5">
                    {blog.user}:{" "}
                  </Typography>
                </td>
                <td className="right">
                  <Typography component="h1" variant="h5">
                    {blog.title}
                  </Typography>
                </td>
              </tr>
            </tbody>
          </table>
        </Box>
      </div>
    );
  });
};

const Home = () => {
  const [courses, setCourses] = useState("No courses listed!");

    return (
    <UserContext.Consumer>{context => {
        if(context.isAuthenticated()) {
            return(
                <CssBaseline>
                    <Grid align={'center'} xs={12}>
                        <Box m={3}>
                            <Typography variant={'h2'} component={'h2'}>Welcome back, {context.user.firstname}!</Typography>
                        </Box>
                    </Grid>
                    <Grid align={'center'} xs={12}>
                        <Box p={2} display="flex">
                            <Box flexGrow={0.4}>
                                <Link2 target="_blank" rel="noopener" href="https://www.instagram.com/teachleavelive/">
                                    <InstagramIcon style={{ fontSize: 100 }} fontSize="large" color="inherit"/>
                                </Link2>
                            </Box>
                            <Box flexGrow={0.4}>
                                <Link2 target="_blank" rel="noopener" href="https://www.facebook.com/teachleavelive/">
                                    <FacebookIcon style={{ fontSize: 100 }} fontSize="large" color="inherit"/>
                                </Link2>
                            </Box>
                            <Box flexGrow={0.4}>
                                <Link2 target="_blank" rel="noopener" href="https://www.teacherspayteachers.com/Store/Teach-Leave-Live">
                                    <WebIcon style={{ fontSize: 100 }} fontSize="large" color="inherit"/>
                                </Link2>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid xs={6}>
                        <Container maxWidth='md' maxHeight='md'>
                            <Switch>
                                <Route path={`${match.path}`} component={Blog} />
                            </Switch>
                        </Container>
                    </Grid>
                    <Grid xs={6}>
                        {/* Holder for courses */}
                    </Grid>
                    <Grid xs={6}>
                        
                    </Grid>
                </CssBaseline>
            )
        }
        else {
            return(
                <Redirect to="/User/Login"/>
            );
        }
      }}
    </UserContext.Consumer>
  );
};

export default Home;