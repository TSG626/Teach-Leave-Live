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
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import EJSContentViewer from "../../components/Interface/EJSContentViewer";
import API from "../../modules/API";
import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";

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
  const { message, blogId, parentId, reply } = props;

  function handleChange(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      if (reply && parentId) {
        API.put(`/api/blog/${blogId}/comment/${parentId}/`, {
          replies: { body: body, postedBy: user._id },
        });
      } else {
        API.put(`/api/blog/${blogId}`, {
          comments: { body: body, postedBy: user._id },
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
  const { comment, reply, blogId, parentId } = props;
  const user = comment.postedBy;
  const [open, setOpen] = useState(true);
  return (
    <div className={classes.comment}>
      <Card>
        <CardHeader
          avatar={<Avatar className={classes.avatar} src={user.avatar} />}
          title={user.firstname + " " + user.lastname}
          subheader={Date(comment.date).toString()}
        />
        <CardContent>
          <Typography>{comment.body}</Typography>
        </CardContent>
        <Collapse in={open}>
          <Divider />
          <CardContent>
            {comment.replies.length === 0 ? (
              <CommentForm
                reply
                message="Be the first to reply!"
                blogId={blogId}
                parentId={parentId}
              />
            ) : (
              comment.replies.map((reply) => (
                <Comment
                  reply
                  comment={reply}
                  blogId={blogId}
                  parentId={comment.id}
                />
              ))
            )}
          </CardContent>
        </Collapse>
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
          <Paper>
            <Typography variant="h6" className={classes.commentsTitle}>
              Comments
            </Typography>
            {blog.comments.length === 0 ? (
              <CommentForm
                message="Be the first to comment!"
                blogId={blog._id}
              />
            ) : (
              <div>
                {blog.comments.map((comment) => (
                  <Comment comment={comment} blogId={blog.id} />
                ))}
                <div>
                  <CommentForm message="Leave a comment" blogId={blog._id} />
                </div>
              </div>
            )}
          </Paper>
        </div>
      </div>
    </Grid>
  );
}

export default BlogViewer;
