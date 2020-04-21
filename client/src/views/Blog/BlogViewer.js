import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  makeStyles,
  Paper,
  Box,
  CircularProgress,
  Tooltip,
  Chip,
  Avatar,
  CardContent,
  Card,
  TextField,
  CardHeader,
  Divider,
  Collapse,
  CardActions,
  IconButton,
} from "@material-ui/core";
import { useParams, useHistory } from "react-router-dom";
import EJSContentViewer from "../../components/Interface/EJSContentViewer";
import API from "../../modules/API";
import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";
import { ThumbUp, ExpandMore, Delete } from "@material-ui/icons";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  body: {},
  comments: {
    padding: theme.spacing(2, 0),
  },
  commentsTitle: {
    padding: theme.spacing(2),
  },
  comment: {
    paddingLeft: theme.spacing(1),
  },
  name: {
    padding: theme.spacing(0, 1),
  },
  authorChip: {
    padding: theme.spacing(1),
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
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

function CommentForm(props) {
  const classes = useStyles();
  const [body, setBody] = useState("");
  const { user } = useContext(UserContext);
  const { message, blogId, parent, reply } = props;
  const history = useHistory();

  function handleChange(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      if (reply && parent) {
        API.post(`/api/blog/${blogId}/comment/${parent._id}/`, {
          body: body,
          postedBy: user._id,
        }).then((res) => {
          if (res.status == 200) history.go(history.location);
        });
      } else {
        API.post(`/api/blog/${blogId}/comment/`, {
          body: body,
          postedBy: user._id,
        }).then((res) => {
          if (res.status == 200) history.go(history.location);
        });
      }
    } else {
      setBody(e.target.value);
    }
  }

  return (
    <div className={classes.comment}>
      <Card>
        <CardHeader
          avatar={<Avatar className={classes.avatar} src={user.avatar} />}
          title={user.firstname + " " + user.lastname}
        />
        <CardContent>
          <TextField
            multiline
            placeholder={message}
            fullWidth
            value={body}
            onKeyDown={handleChange}
            onChange={handleChange}
          />
        </CardContent>
      </Card>
    </div>
  );
}

function Comment(props) {
  const classes = useStyles();
  const { comment, reply, blogId, parent } = props;
  const { postedBy } = comment;
  const [open, setOpen] = useState(false);
  const { user } = useContext(UserContext);
  const history = useHistory();

  function handleOpen() {
    setOpen(!open);
  }

  function handleDelete() {
    if (!reply) {
      API.delete(`/api/blog/${blogId}/comment/${comment._id}/`).then((res) => {
        if (res.status == 200) history.go(history.location);
      });
    } else {
      API.delete(
        `/api/blog/${blogId}/comment/${parent._id}/reply/${comment._id}`
      ).then((res) => {
        if (res.status == 200) history.go(history.location);
      });
    }
  }

  return (
    <div className={classes.comment}>
      <Card>
        <CardHeader
          avatar={<Avatar className={classes.avatar} src={postedBy.avatar} />}
          title={postedBy.firstname + " " + postedBy.lastname}
          subheader={Date(comment.date).toString()}
          action={
            (user._id === postedBy._id ||
              user.status == 0 ||
              user.status == 1) && (
              <IconButton onClick={handleDelete}>
                <Delete />
              </IconButton>
            )
          }
        />
        <CardContent>
          <Typography>{comment.body}</Typography>
        </CardContent>
        <CardActions disableSpacing>
          {!reply &&
            (comment.replies.length !== 0 ? (
              <React.Fragment>
                <Typography>{comment.replies.length} replies</Typography>
              </React.Fragment>
            ) : (
              <React.Fragment></React.Fragment>
            ))}
          {!reply && (
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: open,
              })}
              onClick={handleOpen}
            >
              <ExpandMore />
            </IconButton>
          )}
        </CardActions>
        {reply === false && (
          <Collapse in={open}>
            <Divider />
            <CardContent>
              {
                <div>
                  {comment.replies.length !== 0 &&
                    comment.replies.map((reply) => (
                      <Comment
                        reply={true}
                        comment={reply}
                        blogId={blogId}
                        parent={comment}
                      />
                    ))}
                  <CommentForm
                    reply={true}
                    message={
                      "Reply to " +
                      comment.postedBy.firstname +
                      " " +
                      comment.postedBy.lastname
                    }
                    blogId={blogId}
                    parent={comment}
                  />
                </div>
              }
            </CardContent>
          </Collapse>
        )}
      </Card>
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
        <div className={classes.comments}>
          {blog.comments_allowed ? (
            <Paper>
              <Typography variant="h6" className={classes.commentsTitle}>
                Comments
              </Typography>
              {blog.comments.length === 0 ? (
                <CommentForm
                  message="Be the first to comment on this blog post!"
                  blogId={blog._id}
                />
              ) : (
                <div>
                  {blog.comments.map((comment) => (
                    <Comment
                      comment={comment}
                      blogId={blog._id}
                      reply={false}
                    />
                  ))}
                  <div>
                    <Divider />
                    <CommentForm
                      message="Leave a comment on this blog post"
                      blogId={blog._id}
                    />
                  </div>
                </div>
              )}
            </Paper>
          ) : (
            <React.Fragment />
          )}
        </div>
      </div>
    </Grid>
  );
}

export default BlogViewer;
