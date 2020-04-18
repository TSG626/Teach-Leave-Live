import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import API from "../../../../modules/API";
import BlogCard from "../../../../components/Blog/BlogCard";
import {
  Typography,
  ListItem,
  List,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Modal,
  CardContent,
  Card,
  Dialog,
  TableContainer,
  TableCell,
} from "@material-ui/core";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import BlogCreator from "./BlogCreator";
import BlogEditor from "./BlogEditor";
import { Add as AddIcon, Edit as EditIcon, Close } from "@material-ui/icons/";

const useStyles = makeStyles((theme) => ({
  title: {
    padding: theme.spacing(2, 2),
    alignText: "center",
  },
  card: {
    padding: theme.spacing(1, 1),
  },
  cardList: {
    padding: theme.spacing(1, 1),
    backgroundColor: "grey",
  },
  blogCreatorWindow: {
    padding: theme.spacing(4, 2),
  },
}));

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <Container>
        <CardContent>
          <BlogCreator setAdding={props.setAdding} />
        </CardContent>
      </Container>
    </Dialog>
  );
}

function BlogRouter({ match }) {
  const [blogList, setBlogList] = useState([]);
  const [body, setBody] = useState("");
  const [authors, setAuthors] = [];
  const classes = useStyles();
  const [errors, setErrors] = useState({});
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    async function fetchData() {
      API.get("/api/blog/").then((res) => {
        if (res.status == 200) {
          setBlogList(res.data);
        }
      });
    }
    fetchData();
  }, []);

  const handleClickOpen = () => {
    setAdding(true);
  };

  const handleClose = () => {
    setAdding(false);
  };

  return (
    <Switch>
      {/* //Main router function */}
      <Route
        exact
        path={`${match.path}/`}
        component={function () {
          return (
            <Container>
              <Grid container>
                <Typography className={classes.title}>Blog</Typography>
                <Button
                  onClick={handleClickOpen}
                  endIcon={<AddIcon />}
                  varient={"contained"}
                >
                  Add Blog
                </Button>
                <SimpleDialog
                  open={adding}
                  onClose={handleClose}
                  setAdding={setAdding}
                  className={classes.courseCreatorWindow}
                />
              </Grid>
            </Container>
          );
        }}
      />
      {/* <Route exact path={`${match.path}/Edit/:id`} component={BlogEditor}/> */}
    </Switch>
  );
}

export default BlogRouter;
