import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './Admin.css';
import BlogPublisher from "./Publishers/Blog/BlogPublisher";
import CoursePublisher from "./Publishers/Course/CoursePublisher";
import NewsletterPublisher from "./Publishers/Newsletter/NewsletterPublisher";
import UserEditor from "./Publishers/User/UserEditor";

export default function Admin({match}) {
    return (
        <div>
            <header>
                <Switch>
                    <Route path={`${match.path}/Blog`} component={BlogPublisher} />
                    <Route path={`${match.path}/Course`} component={CoursePublisher} />
                    <Route path={`${match.path}/Newsletter`} component={NewsletterPublisher} />
                    <Route path={`${match.path}/User`} component={UserEditor} />
                </Switch>
            </header>
        </div>
    );
}