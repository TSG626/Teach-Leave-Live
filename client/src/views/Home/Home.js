import React, { useState, useContext, useEffect } from "react";
import InstagramIcon from "@material-ui/icons/Instagram";
import Link2 from "@material-ui/core/Link";
import {
  Typography,
  Box,
  Grid,
  CssBaseline,
  Table,
  TableBody,
  TableRow,
  Button,
} from "@material-ui/core";
import { Redirect, Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import FacebookIcon from "@material-ui/icons/Facebook";
import WebIcon from "@material-ui/icons/Web";
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
  return (
    <React.Fragment>
      <Box m={2}>
        <Typography variant="h4" align="center">Recent Courses</Typography>
      </Box>
    <Table>
      <TableBody>
    {courses.map((course, index) => {
    return (
      <Box border={1}>
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
  </TableBody>
  </Table>
    </React.Fragment>);
};

export default function Landing({ match }) {
  const [courses, setCourses] = useState("No courses listed!");

  return (
    <UserContext.Consumer>
      {(context) => {
        if (context.isAuthenticated()) {
          return (
            <CssBaseline>
              <Grid align={"center"} xs={12}>
                <Typography variant={"h2"} component={"h2"}>
                  Welcome back, {context.user.firstname}!
                </Typography>
              </Grid>
              <Grid align={"center"} xs={12}>
                <Box p={2} display="flex">
                  <Box flexGrow={0.4}>
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
                  <Box flexGrow={0.4}>
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
                  <Box flexGrow={0.4}>
                    <Link2
                      target="_blank"
                      rel="noopener"
                      href="https://www.teacherspayteachers.com/Store/Teach-Leave-Live"
                    >
                      <WebIcon
                        style={{ fontSize: 100 }}
                        fontSize="large"
                        color="inherit"
                      />
                    </Link2>
                  </Box>
                </Box>
              </Grid>
              <Grid xs={6}>{/* Holder for blogs */}</Grid>
              <Grid xs={6}><ListCourses/></Grid>
            </CssBaseline>
          );
        } else {
          return <Redirect to="/User/Login" />;
        }
      }}
    </UserContext.Consumer>
  );
}
