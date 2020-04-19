import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Button, Grid, CardContent, Dialog } from "@material-ui/core";
import { Switch, Route } from "react-router-dom";
import CourseCreator from "./CourseCreator";
import CourseEditor from "./CourseEditor";
import { Add as AddIcon } from "@material-ui/icons/";
import CourseTable from "./CourseTable";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(4),
  },
  courseCreatorWindow: {
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
          <CourseCreator setAdding={props.setAdding} />
        </CardContent>
      </Container>
    </Dialog>
  );
}

export default function CourseRouter({ match }) {
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
            <Container>
              <div className={classes.root}>
                <Grid container zeroMinWidth>
                  <CourseTable setAdding={true} />
                </Grid>
                <Button
                  onClick={handleClickOpen}
                  endIcon={<AddIcon />}
                  varient={"contained"}
                >
                  Add Course
                </Button>
                <SimpleDialog
                  open={adding}
                  onClose={handleClose}
                  setAdding={setAdding}
                  className={classes.courseCreatorWindow}
                />
              </div>
            </Container>
          );
        }}
      />
      <Route exact path={`${match.path}/Edit/:id`}>
        <CourseEditor />
      </Route>
    </Switch>
  );
}
