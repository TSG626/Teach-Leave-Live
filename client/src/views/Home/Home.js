import React, {useState, useContext} from 'react';
import './Home.css';
import InstagramIcon from '@material-ui/icons/Instagram'
import Link2 from '@material-ui/core/Link'
import { Typography, Box, CircularProgress } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {Redirect, Link} from 'react-router-dom';
import {UserContext} from '../../contexts/UserContext';
import CssBaseline from '@material-ui/core/CssBaseline';    //Baseline of look for entire page
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import StoreIcon from '@material-ui/icons/Store';
import Slide from '@material-ui/core/Slide';
import Grow from '@material-ui/core/Grow';


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
        courses.map(course => {
            return(
                <Box p={5} m={3} border={1}>
                <table>
                <td className="left"><Typography component="h1" variant="h5">{course.title}:</Typography></td> 
                <td align="right"><CircularProgress variant="static" value={course.progress}/></td>
                </table>
            </Box>
            )
        })
    )
}

const ListBlogs = () => {
    //const [blogs, setBlogs] = useState("No blogs available!")
    //TEMPORARY! For the purpose of presenting in Sprint 1
    const [blogs, setBlogs] = useState([
        {
            title: "First Course Up!",
            date: "March 9, 2020",
            post: "The first course is available! I hope you enjoy it!",
            user: "anna99",
            comments: [
                {
                    username: "john123",
                    text: "Awesome! Can't wait!"
                },
                {
                    username: "simon32",
                    text: "I'm excited!"
                }
            ],
        },{
        title: "Welcome!",
        date: "March 8, 2020",
        post: "Welcome to TLL! Have fun!",
        user: "susie3",
        comments: [
            {
                username: "bob7",
                text: "Thanks!"
            },
            {
                username: "maryC",
                text: "Very cool!"
            },
            {
                username: "john123",
                text: "Hi!"
            },
            {
                username: "simon32",
                text: "This is helpful!"
            }
        ],
    }, ]);
    return(
        blogs.map((blog) => {
            return (
                <div>
                    <Box p={5} m={4.5} border={1}>
                        <table>
                        <td className="left"><Typography component="h1" variant="h5">{blog.user}: </Typography></td>
                            <td className="right"><Typography component="h1" variant="h5">{blog.title}</Typography></td>
                        </table>
                    </Box>
                </div> 
            )
        })
    ) 

}

const Home = () => {
    const [courses, setCourses] = useState("No courses listed!");
    const userInfo = useContext(UserContext);

    //LINE 26: user is a placeholder; should have user's first name pop up
    return (
    <UserContext.Consumer>{context => {
        if(context.isAuthenticated()) {
            return(
            <CssBaseline>
            <div className="App">
            <header className="App-header">
                <Grow in="true" mountOnEnter timeout={3000}>
                    <Typography component="h1" variant="h2">
                        Welcome back, {userInfo.user.username}!
                    </Typography>   
                </Grow>         
            </header>
            <header className="App-table">
            <Slide direction="up" in="true" mountOnEnter timeout={3000}>                       
                <table align="center" width="100%">
                    <tr>
                        <th><Typography component="h1" variant="h4">Recent Blogs</Typography></th>
                        <th><Typography component="h1" variant="h4">Recent Courses</Typography></th> 
                    </tr>
                    <tr>
                     <td>
                         <Box border={1} m={2} p={1}>
                            <ListBlogs/>
                         </Box>
                    </td> 
                        <td>
                        <Box border={1} m={2} p={1}>
                            <ListCourses/>
                        </Box>
                        </td>
                        <td right="1">
                        <Slide direction="left" in="true" mountOnEnter timeout={3000}>
                        <table className= "App-socials" width="100%" align="center">
                            <tr>
                                <Link2 target="_blank" rel="noopener" href="https://www.instagram.com/teachleavelive/">
                                    <InstagramIcon fontSize="large" color="inherit"/>
                                </Link2>
                            </tr>
                            <tr>
                                <Link2 target="_blank" rel="noopener" href="https://www.facebook.com">
                                    <FacebookIcon fontSize="large" color="inherit"/>
                                </Link2>
                            </tr>
                            <tr>
                                <Link2 target="_blank" rel="noopener" href="https://www.twitter.com">
                                    <TwitterIcon fontSize="large" color="inherit"/>
                                </Link2>
                            </tr>
                            <tr>
                                <Link2 target="_blank" rel="noopener" href="https://www.teacherspayteachers.com/Store/Teach-Leave-Live">
                                    <StoreIcon fontSize="large" color="inherit"/>
                                </Link2>
                            </tr>
                        </table>
                        </Slide>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                                <Button color="default" variant="contained" color="primary" component={Link} to="/Store">
                                    Course Store
                                </Button>
                        </td>
                    </tr>
                </table>
                </Slide>
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

export default Home;