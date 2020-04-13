import React, {useState, useEffect} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';    //Baseline of look for entire page
import { Typography, Container, Grid } from '@material-ui/core';
import API from '../../modules/API';
import { Switch, Route } from 'react-router-dom';
import CourseViewer from './CourseViewer/CourseViewer';

function Landing(props){
    return(
        <Grid container>
            <Typography>Courses</Typography>
        </Grid>
    )
}

export default function Course({match}) {
    const[courses, setCourses] = useState([]);

    useEffect(()=>{
        async function fetchData(){  
            API.get('/api/course/').then((res)=>{
                if(res.status === 200){
                    setCourses(res.data);
                }
            })
        }
        fetchData();
    },[])

    return(
        <Container>
            <CssBaseline/>
            <Switch>
                {/* //Main router function */}
                <Route exact path={`${match.path}/`} component={Landing}/>
                <Route path={`${match.path}/:id/`} component={CourseViewer}/>
            </Switch>
        </Container>
    );
}
