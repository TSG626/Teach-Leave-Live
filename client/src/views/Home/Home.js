import React,{useState} from 'react';
import './Home.css';
import InstagramIcon from '@material-ui/icons/Instagram'
import Link from '@material-ui/core/Link'
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {Redirect} from 'react-router-dom';
import {UserContext} from '../../contexts/UserContext';
import CssBaseline from '@material-ui/core/CssBaseline';    //Baseline of look for entire page

export default function Home() {
    const [topBlogs, setTopBlogs] = useState("No recent blogs posted!");
    const [courses, setCourses] = useState("No courses listed!");
    const [user, setUser] = useState({});
    const [auth, isAuth] = useState(false)

    //LINE 26: user is a placeholder; should have user's first name pop up
    return (
    <UserContext.Consumer>{context => {
        if(context.isAuthenticated()) {
            return(
            <CssBaseline>
            <div className="App">
            <header className="App-header">
                <Typography component="h1" variant="h3">
                    Welcome back, user!
                </Typography>            
            </header>
            <header className="App-table">
                <table>
                    <tr>
                        <th><Typography component="h1" variant="h5">Recent Blogs</Typography></th>
                        <th><Typography component="h1" variant="h5">Recent Courses</Typography></th>                        
                    </tr>
                    <tr>
                        <td><Typography component="h1" variant="h6">{topBlogs}</Typography></td> 
                        <td><Typography component="h1" variant="h6">{courses}</Typography></td>
                        <table className= "App-socials">
                            <Link target="_blank" rel="noopener" href="https://www.instagram.com/teachleavelive/">
                                <InstagramIcon fontSize="large" color="inherit"/>
                            </Link>
                        </table>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <Link href="/Store">
                            <Button color="default" variant="contained">
                                Course Store
                            </Button>
                            </Link>
                        </td>
                    </tr>
                </table>
            </header>
        </div>
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