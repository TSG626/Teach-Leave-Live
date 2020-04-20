import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Button, CardContent, Dialog } from "@material-ui/core";
import { Switch, Route } from "react-router-dom";
import BlogCreator from "./BlogCreator";
import BlogEditor from "./BlogEditor";
import { Add as AddIcon } from "@material-ui/icons/";
import BlogTable from "./BlogTable";

const useStyles = makeStyles((theme) => ({
  root: {},
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

export default function BlogRouter({ match }) {
  const classes = useStyles();
  const [errors, setErrors] = useState({});
  const [adding, setAdding] = useState(false);

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
            <div className={classes.root}>
              <BlogTable setAdding={true} />
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
              />
            </div>
          );
        }}
      />
      <Route exact path={`${match.path}/Edit/:id`}>
        <BlogEditor />
      </Route>
    </Switch>
  );
}
