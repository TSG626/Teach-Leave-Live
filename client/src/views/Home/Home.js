import React, {useState} from 'react';
import InstagramIcon from '@material-ui/icons/Instagram'
import Link2 from '@material-ui/core/Link'
import { Typography, Box, CircularProgress, Grid, CssBaseline, Container } from '@material-ui/core';
import {Redirect, Route, Switch} from 'react-router-dom';
import {UserContext} from '../../contexts/UserContext';
import FacebookIcon from '@material-ui/icons/Facebook';
import WebIcon from '@material-ui/icons/Web';
import Blog from '../Admin/Publishers/Blog/Blog';

const ListCourses = () => {
    const [courses, setCourses] = useState ([
        {
            title: "Tutuoring Forums",
            progress: 70
        }
        , {
            title: "Last 9 Weeks Checklist",
            progress: 50
        }
    ])
    return(
        courses.map((course, index) => {
            return(
                <Box p={5} m={3} border={1} key={index}>
                <table>
                    <tbody>
                        <tr>
                            <td align="left"><Typography component="h1" variant="h5">{course.title}:</Typography></td>
                            <td align="right"><CircularProgress variant="static" value={course.progress}/></td>
                        </tr>
                    </tbody>
                </table>
                </Box>
            )
        })
    )
}

export default function Landing({match}) {
    const [courses, setCourses] = useState("No courses listed!");

    return (
    <UserContext.Consumer>{context => {
        if(context.isAuthenticated()) {
            return(
                <CssBaseline>
                    <Grid align={'center'} xs={12}>
                        <Typography variant={'h2'} component={'h2'}>Welcome back, {context.user.firstname}!</Typography>
                    </Grid>
                    <Grid align={'center'} xs={12}>
                        <Box p={2} display="flex">
                            <Box flexGrow={0.4}>
                                <Link2 target="_blank" rel="noopener" href="https://www.instagram.com/teachleavelive/">
                                    <InstagramIcon style={{ fontSize: 100 }} fontSize="large" color="inherit"/>
                                </Link2>
                            </Box>
                            <Box flexGrow={0.4}>
                                <Link2 target="_blank" rel="noopener" href="https://www.facebook.com/teachleavelive/">
                                    <FacebookIcon style={{ fontSize: 100 }} fontSize="large" color="inherit"/>
                                </Link2>
                            </Box>
                            <Box flexGrow={0.4}>
                                <Link2 target="_blank" rel="noopener" href="https://www.teacherspayteachers.com/Store/Teach-Leave-Live">
                                    <WebIcon style={{ fontSize: 100 }} fontSize="large" color="inherit"/>
                                </Link2>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid xs={6}>
                        <Container maxWidth='md' maxHeight='sm'>
                            <Switch>
                                <Route path={`${match.path}`} component={Blog} />
                            </Switch>
                        </Container>
                    </Grid>
                    <Grid xs={6}>
                        {/* Holder for courses */}
                    </Grid>
                </CssBaseline>
            )
        }
        else {
            return(
                <Redirect to="/User/Login"/>
            );
        }
    }}</UserContext.Consumer>
    );
}