import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import SubjectCard from '../../../../components/Course/SubjectCard';
import { Typography, Button, Grid, CardContent, Dialog } from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';
import CourseCreator from './CourseCreator';
import CourseEditor from './CourseEditor';
import {Add as AddIcon } from '@material-ui/icons/';
import { CourseContext } from '../../../../contexts/Admin/CourseContext';

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

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <Container>
            <CardContent>
              <CourseCreator context={props.context} setAdding={props.setAdding}/>
            </CardContent>
        </Container>
    </Dialog>
  );
}


export default function CourseRouter({match}) {
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
    <CourseContext.Consumer>{context=>{
      return(
        <Switch>
            {/* //Main router function */}
            <Route exact path={`${match.path}/`} component={function(){
              return(
                <Container component="main" maxWidth={false}>
                  <Grid container alignContent={'center'} justify={'space-between'}>
                    <Typography className={classes.title}>
                      Courses
                    </Typography>
                    <Button onClick={handleClickOpen} endIcon={<AddIcon/>} varient={'contained'}>
                      Add Course
                    </Button>
                    <SimpleDialog open={adding} onClose={handleClose} context={context} setAdding={setAdding} className={classes.courseCreatorWindow}/>
                  </Grid>
                  <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="flex-start"
                    className={classes.cardList}
                  >
                    {context.subjectList && context.subjectList.map((subject, index) => {
                      return(
                        <Grid key={index} item container sm className={classes.card}>
                          <SubjectCard subject={subject}/>
                        </Grid>
                      )
                    })}
                  </Grid>
                </Container>
                )
            }}/>
            <Route path={`${match.path}/Create`} component={CourseCreator} />
            <Route exact path={`${match.path}/Edit/:id`} component={CourseEditor}/>
        </Switch>
      )
    }}</CourseContext.Consumer>
  );
}