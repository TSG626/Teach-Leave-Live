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
  Grow,
} from "@material-ui/core";
import API from "../../modules/API";
import { Switch, Route, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import BlogViewer from "./BlogViewer";
import { Fade } from "@material-ui/core";

function BlogList() {
  const classes = useStyles();
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState({});

  useEffect(() => {
    API.get("/api/blog/")
      .then((res) => {
        if (res.status === 200) {
          setBlogs(res.data);
        }
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  if (blogs.length === 0) return <CircularProgress />;
  return (
    <div>
      <Grid container>
        <Grid container justify="center" spacing={3}>
          {blogs.map((blog) => {
            return (
              <Grow in="true" mountOnEnter timeout={3000}>
                <Grid item xs={12}>
                  <Card className={classes.root}>
                    <CardContent>
                      <Box m={2}>
                        <Typography variant="h5" component="h2" align="center">
                          {blog.title}
                        </Typography>
                      </Box>
                      <Box m={2}>
                        <Typography align="center">{blog.description}</Typography>
                      </Box>
                      <Box m={2}>
                        <Typography
                          color="textSecondary"
                          component="h2"
                          align="center"
                        >
                          {blog.title}
                        </Typography>
                      </Box>
                      <Box m={2} align="center">
                        <Button
                          variant="contained"
                          component={Link}
                          to={`/Blog/${blog._id}`}
                        >
                          View Blog
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grow>
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
      <Fade  in="true" mountOnEnter timeout={3000}>
        <Box m={3}> 
          <Typography variant="h2" align="center">
            Blogs
          </Typography>
          <BlogList />
        </Box>
      </Fade>
    </React.Fragment>
  );
}

export default function Blog({ match }) {
  return (
    <Container>
      <Switch>
        <Route exact path={`${match.path}/`} component={Landing} />
        <Route path={`${match.path}/:id/`} component={BlogViewer} />
      </Switch>
    </Container>
  );
}
