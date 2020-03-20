import React, {useState} from 'react';
import { Route, Switch, Redirect, Link, useLocation} from 'react-router-dom';
import './Admin.css';
import {UserContext} from "../../contexts/UserContext"
import BlogPublisher from "./Publishers/Blog/BlogPublisher";
import CourseList from "./Publishers/Course/CourseList";
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
    const [admin, setAdmin] = useState(true);

    function checkAdmin(context){
        if(context.user){
            setAdmin(context.user.admin);
        }
    }

    if(admin === false) {
        return(<Redirect to='/Home'/>);
    };

    return (
        <UserContext.Consumer>{(context) => {
            checkAdmin(context);
            return(
                <Switch>
                    <Route path={`${match.path}/Blog`} component={BlogPublisher} />
                    <Route path={`${match.path}/Course`} component={CourseList} />
                    <Route path={`${match.path}/Newsletter`} component={NewsletterPublisher} />
                    <Route path={`${match.path}/User`} component={UserEditor} />
                    <AdminLinks match={`${match.path}`}/>
                </Switch>
            )
        }}</UserContext.Consumer>
    );
}
export default Admin