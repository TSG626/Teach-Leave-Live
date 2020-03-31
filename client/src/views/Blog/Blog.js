import React, { useState } from 'react';
import './Blog.css';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

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

export default function Blog({match}) {
    const classes = useStyles();
    const [errors, setErrors] = useState({});

    return (
        <Grid container alignContent={'center'} justify={'space-between'}>
            <Typography className={classes.title}>
                Join in the Conversation!
            </Typography>
        </Grid>
  );
}