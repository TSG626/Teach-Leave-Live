import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './Admin.css';
import BlogPublisher from "./Publishers/Blog/BlogPublisher";
import CoursePublisher from "./Publishers/Course/CoursePublisher";
import NewsletterPublisher from "./Publishers/Newsletter/NewsletterPublisher";
import UserEditor from "./Publishers/User/UserEditor";

export default function Admin() {
    return (
        <div>
            <header>
                <Switch>
                    <Route path="/Blog" component={BlogPublisher} />
                    <Route path="/Course" component={CoursePublisher} />
                    <Route path="/Newsletter" component={NewsletterPublisher} />
                    <Route path="/User" component={UserEditor} />
                </Switch>
            </header>
        </div>
    );
}