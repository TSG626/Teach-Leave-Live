import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  makeStyles,
  Paper,
  Box,
  CircularProgress,
  Tooltip,
  Chip,
  Avatar,
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import EJSContentViewer from "../../components/Interface/EJSContentViewer";
import API from "../../modules/API";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  body: {},
  authorChip: {
    padding: theme.spacing(1),
  },
}));

function AuthorChip(props) {
  const classes = useStyles();
  const { author } = props;
  let color = "default";
  if (author.status === 0) {
    color = "primary";
  } else if (author.status === 1) {
    color = "secondary";
  } else if (author.status === 2) {
    color = "textSecondary";
  }

  return (
    <div className={classes.authorChip}>
      <Tooltip title={author.username}>
        <Chip
          avatar={<Avatar src={author.avatar} />}
          label={author.firstname + " " + author.lastname}
          color={color}
        />
      </Tooltip>
    </div>
  );
}

function BlogViewer(props) {
  const classes = useStyles();
  let { id } = useParams();
  const [blog, setBlog] = useState({});
  const [error, setError] = useState({});

  useEffect(() => {
    async function fetchData() {
      console.log(id);
      API.get(`/api/blog/`, { id: id }).then((res) => {
        if (res.status === 200) {
          setBlog(res.data);
        } else {
          setError(res.data);
        }
      });
    }
    fetchData();
  }, []);

  if (Object.keys(blog).length === 0) return <CircularProgress />;

  return (
    <Grid>
      <Box m={3}>
        <Typography variant="h3" align="center" color="primary">
          {blog.title}
        </Typography>
        <Typography variant="h5" align="center">
          {blog.description}
        </Typography>
        <Typography variant="h6" align="center" color="textSecondary">
          {Date(blog.date_published).toString()}
        </Typography>
        <div align="center">
          <Typography color="textSecondary">by</Typography>
          <div align="center">
            {blog.authors.map((author, index) => (
              <AuthorChip author={author} key={index} />
            ))}
          </div>
        </div>
      </Box>
      <div className={classes.root}>
        <div className={classes.body}>
          <Paper>
            <EJSContentViewer data={blog.body} />
          </Paper>
        </div>
        <div className={classes.comments}></div>
      </div>
    </Grid>
  );
}

export default BlogViewer;
