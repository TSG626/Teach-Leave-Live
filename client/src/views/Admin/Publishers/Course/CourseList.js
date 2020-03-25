import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import API from '../../../../modules/API';
import { Typography, ListItem, List, Button, CircularProgress} from '@material-ui/core';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import CourseCreator from './CourseCreator';
import CourseEditor from './CourseEditor';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(theme => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    error:{
        color: 'red',
    }
}));

const Course = (props) => {
  const [redirect, setRedirect] = useState('');

  if(redirect !== ''){
    return(<Redirect to={redirect}/>)
  }

  return(
    <ListItem>
      <Button
        onClick={() => setRedirect(`/Course/${props.course._id}/`)}
      >
        {props.course.title}
      </Button>
      <Button onClick={() => setRedirect(`/Admin/Course/Edit/${props.course._id}`)}>
        <EditIcon/>
      </Button>
    </ListItem>
  )
}

export default function CourseList({match}) {
    const classes = useStyles();
    const [courses, setCourses] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
      let ignore = false;
      async function fetchData(){
        API.get('/api/course/').then(res => {
          if(res.status === 200){
            setCourses(res.data);
          }
        }).catch(error => {
          setErrors(error);
        })
      }
      fetchData();
      return () => {ignore = true;}
    }, []);

    if(!courses){
      return <CircularProgress/>
    }

    return (
      <Switch>
        <Route exact path={`${match.path}/`} component={function(){
          return(
            <Container component="main" maxWidth={false}>
              <Typography>
                Courses
              </Typography>
              <List>
                {courses.map((course, index) => {
                  return(
                    <Course course={course} key={index}/>
                  )
                })}
              </List>
              <Link to='/Admin/Course/Create'>Create a new course</Link>
            </Container>
            )
        }}/>
        <Route path={`${match.path}/Create`} component={CourseCreator} />
        <Route path={`${match.path}/Edit/:id`} component ={CourseEditor}/>
      </Switch>
    );
}