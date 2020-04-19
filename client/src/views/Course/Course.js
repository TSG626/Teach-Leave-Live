import React, { useState, useEffect } from "react";
import { Typography, Container, Grid, Box, CardContent, Card, Button } from "@material-ui/core";
import API from "../../modules/API";
import { Switch, Route, Link } from "react-router-dom";
import CourseViewer from "./CourseViewer/CourseViewer";
import { makeStyles } from '@material-ui/core/styles';
import Store from "../Store/Store";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function Landing(courses) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Box m={3}>
        <Typography variant="h2" align="center">Courses</Typography>
    </Box>
    {courses.length === 0 ? <React.Fragment>
      <Typography align="center">No courses? Lets buy some!</Typography>
        <Box mt={2} align="center">
          <Button variant="contained" component={Link} to="/Store/">Course Store</Button>
        </Box>
      </React.Fragment>:
    <React.Fragment>
      <Grid container justify="center" spacing={3}>
        {courses.map(course => {
          return(
            <Grid item xs={12}>
            <Card className={classes.root}>
            <CardContent>
              <Box m={2}>
                <Typography className={classes.title} color="textSecondary" gutterBottom align="center">
                  {course.subject}
                </Typography>
              </Box>
              <Box m={2}>
                <Typography variant="h5" component="h2" align="center">
                  {course.title}
                </Typography>
              </Box>
              <Box m={2}>
                <Typography align="center">
                  {course.description}
                </Typography>
              </Box>
              <Box m={2} align="center"><Button variant="contained" component={Link} to={`/Course/${course._id}`}>Continue Course</Button></Box>
            </CardContent>
            </Card>   
            </Grid>
          )
        })}
      </Grid>
    </React.Fragment>
    }
    </React.Fragment>
  );
}

export default function Course({ match }) {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchData() {
      API.get("/api/user/getCourses").then((res) => {
        if (res.status === 200) {
          for (var i = 0; i < res.data.length; i++) {
            API.get("/api/course/", {id: res.data[i]}).then(course => {
              setCourses(oldArr => [...oldArr, course.data]);
            })
          }
        }
      });
    }
    fetchData();
  }, []);

  return (
    <Container>
      <Switch>
        <Route exact path={`${match.path}/`} component={() => Landing(courses)} />
        <Route path={`${match.path}/:id/`} component={CourseViewer} />
        <Route exact path="Store/" component={Store} />
      </Switch>
    </Container>
  );
}
