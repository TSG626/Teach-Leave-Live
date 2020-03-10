import React, {useState, useContext} from 'react';
import './Home.css';
import InstagramIcon from '@material-ui/icons/Instagram'
import Link2 from '@material-ui/core/Link'
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {Redirect, Link} from 'react-router-dom';
import {UserContext} from '../../contexts/UserContext';
import CssBaseline from '@material-ui/core/CssBaseline';    //Baseline of look for entire page
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import StoreIcon from '@material-ui/icons/Store';


const litsCourses = () => {

}

const listBlogs = () => {


}

const Home = () => {
    const [topBlogs, setTopBlogs] = useState("No recent blogs posted!");
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
                <Typography component="h1" variant="h3">
                    Welcome back, {userInfo.user.username}!
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