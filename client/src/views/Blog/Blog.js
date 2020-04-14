import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, CssBaseline } from '@material-ui/core';
import Blog from '../Admin/Publishers/Blog/Blog'
import { Route, Switch} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    title: {
      padding: theme.spacing(2,2),
      alignText: "center"
    },
    card: {
      padding: theme.spacing(1,1)
    },
    cardList: {
      padding: theme.spacing(1, 1),
      backgroundColor: 'grey'
    },
    courseCreatorWindow: {
      padding: theme.spacing(4, 2),
    },
  }));

export default function BlogDisplay({match}) {
    const classes = useStyles();
    const [errors, setErrors] = useState({});

    return (
      <CssBaseline>
        <Grid container alignContent={'center'} justify={'space-between'}>
            <Typography className={classes.title}>
                Join in the Conversation!
            </Typography>
            <Container maxWidth='lg'>
              <Switch>
                <Route path={`${match.path}`} component={Blog} />
              </Switch>
            </Container>
        </Grid>
      </CssBaseline>

  );
}