import React, { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Grid,
  Box,
  CardContent,
  Card,
  Button,
  CircularProgress,
} from "@material-ui/core";
import API from "../../modules/API";
import { Switch, Route, Link } from "react-router-dom";
import CourseViewer from "./CourseViewer/CourseViewer";
import { makeStyles } from "@material-ui/core/styles";

function CourseList(props) {
  const classes = useStyles();
  const [courses, setCourse] = useState([]);
  const [error, setError] = useState({});

  useEffect(() => {
    API.get("/api/course/")
      .then((res) => {
        if (res.status === 200) {
          setCourse(res.data);
        }
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  if (courses.length === 0) return <CircularProgress />;
  return (
    <div>
      <Grid container>
        <Grid container justify="center" spacing={3}>
          {courses.map((course) => {
            return (
              <Grid item xs={12}>
                <Card className={classes.root}>
                  <CardContent>
                    <Box m={2}>
                      <Typography
                        className={classes.title}
                        color="textSecondary"
                        gutterBottom
                        align="center"
                      >
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
                    <Box m={2} align="center">
                      <Button
                        variant="contained"
                        component={Link}
                        to={`/Course/${course._id}`}
                      >
                        Continue Course
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function Landing() {
  return (
    <React.Fragment>
      <Box m={3}>
        <Typography variant="h2" align="center">
          Courses
        </Typography>
        <CourseList />
      </Box>
    </React.Fragment>
  );
}

export default function Course({ match }) {
  return (
    <Container>
      <Switch>
        <Route exact path={`${match.path}/`} component={Landing} />
        <Route path={`${match.path}/:id/`} component={CourseViewer} />
      </Switch>
    </Container>
  );
}
