import React, { useState, useContext } from "react";
import InstagramIcon from "@material-ui/icons/Instagram";
import Link2 from "@material-ui/core/Link";
import { Typography, Box, CircularProgress } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { Redirect, Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import StoreIcon from "@material-ui/icons/Store";
import Slide from "@material-ui/core/Slide";
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
    <UserContext.Consumer>
      {(context) => {
        if (context.isAuthenticated()) {
          return (
            <div className="App">
              <header>
                <Grow in={true} mountOnEnter timeout={1000}>
                  <Box p={4}>
                    <Typography component="h1" variant="h2">
                      Welcome back, {context.user.firstname}!
                    </Typography>
                  </Box>
                </Grow>
              </header>
              <header className="App-table">
                <Slide direction="up" in={true} mountOnEnter timeout={1000}>
                  <table align="center" width="100%">
                    <thead>
                      <tr>
                        <th align="center">
                          <Typography component="h1" variant="h4">
                            Recent Blogs
                          </Typography>
                        </th>
                        <th align="center">
                          <Typography component="h1" variant="h4">
                            Recent Courses
                          </Typography>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <Box border={1} m={2} p={1}>
                            <ListBlogs />
                          </Box>
                        </td>
                        <td>
                          <Box border={1} m={2} p={1}>
                            <ListCourses />
                          </Box>
                        </td>
                        <td right="1">
                          <table
                            className="App-socials"
                            width="100%"
                            align="center"
                          >
                            <tbody>
                              <tr>
                                <td>
                                  <Link2
                                    target="_blank"
                                    rel="noopener"
                                    href="https://www.instagram.com/teachleavelive/"
                                  >
                                    <InstagramIcon
                                      fontSize="large"
                                      color="inherit"
                                    />
                                  </Link2>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <Link2
                                    target="_blank"
                                    rel="noopener"
                                    href="https://www.facebook.com/teachleavelive/"
                                  >
                                    <FacebookIcon
                                      fontSize="large"
                                      color="inherit"
                                    />
                                  </Link2>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                        <td align="center">
                          <Button
                            color="default"
                            variant="contained"
                            color="primary"
                            component={Link}
                            to="/Store"
                          >
                            Course Store
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Slide>
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

export default Home;
