import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Container, Switch } from "@material-ui/core";
import { Route } from "react-router-dom";

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
  courseCreatorWindow: {
    padding: theme.spacing(4, 2),
  },
}));

export default function BlogDisplay({ match }) {
  const classes = useStyles();

  return (
    <Grid container alignContent={"center"} justify={"space-between"}>
      <Typography className={classes.title}>
        Join in the Conversation!
      </Typography>
      <Container maxWidth="lg">
        <Switch>
          <Route path={`${match.path}`} component={BlogDisplay} />
        </Switch>
      </Container>
    </Grid>
  );
}
