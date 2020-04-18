import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import BlogCard from "../../../../components/Blog/BlogCard";
import {
  Typography,
  Button,
  Grid,
  CardContent,
  Dialog,
} from "@material-ui/core";
import BlogCreator from "./BlogCreator";
import { Add as AddIcon } from "@material-ui/icons/";
import BlogEditor from "./BlogEditor";
import { UserContext } from "../../../../contexts/UserContext";
import { Route, Switch } from "react-router-dom";
import API from "../../../../modules/API";

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

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <Container>
        <CardContent>
          <BlogCreator
            blogList={props.blogList}
            setBlogList={props.setBlogList}
            setAdding={props.setAdding}
          />
        </CardContent>
      </Container>
    </Dialog>
  );
}

export default function BlogRouter({ match }) {
  const [blogList, setBlogList] = useState([]);
  const classes = useStyles();
  const [adding, setAdding] = useState(false);
  const userInfo = useContext(UserContext);

  useEffect(() => {
    async function fetchData() {
      API.get("/api/blog/").then((res) => {
        if (res.status === 200) {
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
      <Route
        exact
        path={`${match.path}/`}
        component={function () {
          return (
            <Container component="main" maxWidth={false}>
              <Grid
                xs={12}
                container
                alignContent={"center"}
                justify={"space-between"}
              >
                <Typography className={classes.title}>
                  Blog
                  {console.log(userInfo)}
                </Typography>
                {userInfo.user.status === 0 || userInfo.user.status === 1 ? (
                  <Button
                    onClick={handleClickOpen}
                    endIcon={<AddIcon />}
                    varient={"contained"}
                  >
                    Add Blog
                  </Button>
                ) : (
                  <div></div>
                )}
                <SimpleDialog
                  open={adding}
                  onClose={handleClose}
                  blogList={blogList}
                  setBlogList={setBlogList}
                  setAdding={setAdding}
                  className={classes.blogCreatorWindow}
                />
              </Grid>
              <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="flex-start"
                className={classes.cardList}
              >
                {blogList.map((blog, index) => {
                  return (
                    <Grid
                      key={index}
                      item
                      container
                      xs={12}
                      className={classes.card}
                    >
                      <BlogCard blog={blog} />
                    </Grid>
                  );
                })}
              </Grid>
            </Container>
          );
        }}
      />
      <Route path={`${match.path}/Create`} component={BlogCreator} />
      <Route exact path={`${match.path}/Edit/:id`} component={BlogEditor} />
    </Switch>
  );
}
