import React from 'react';
import { Route, Switch, Redirect, Link} from 'react-router-dom';
import './Admin.css';
import BlogPublisher from "./Publishers/Blog/BlogPublisher";
import CoursePublisher from "./Publishers/Course/CoursePublisher";
import NewsletterPublisher from "./Publishers/Newsletter/NewsletterPublisher";
import UserEditor from "./Publishers/User/UserEditor";
import {CssBaseline, Button, Typography } from '@material-ui/core';

const AdminLinks = (props) => {
    //temporary! it's just to access all the pages for admin
    //perhaps we can implement a side bar for admin to chose?
    //maybe '/Admin' page can just be like a welcome page
    return(
        <CssBaseline>
        <div align="center">
            <Button component={Link} to={`${props.match}/Newsletter`}>
                <Typography>Newletter Publisher</Typography>
            </Button>
            <Button component={Link} to={`${props.match}/Blog`}>
                <Typography>Blog Publisher</Typography>
            </Button>
            <Button component={Link} to={`${props.match}/Course`}>
                <Typography>Course Publisher</Typography>
            </Button>
            <Button component={Link} to={`${props.match}/User`}>
                <Typography>User Editor</Typography>
            </Button>
        </div>
        </CssBaseline>
    )
}

const Admin = ({match}) => {
    return (
        <div>
            <header>
                <Switch>
                    <AdminLinks match={`${match.path}`}/>
                    <Route path={`${match.path}/Blog`} component={BlogPublisher} />
                    <Route path={`${match.path}/Course`} component={CoursePublisher} />
                    <Route path={`${match.path}/Newsletter`} component={NewsletterPublisher} />
                    <Route path={`${match.path}/User`} component={UserEditor} />
                </Switch>
            </header>
        </div>
    );
}
export default Admin