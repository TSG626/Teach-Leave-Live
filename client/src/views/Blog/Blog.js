import React, { useState } from 'react';
import './Blog.css';
import { UserContext } from '../../contexts/UserContext';
import { Redirect } from 'react-router-dom';
import { CssBaseline, Box, Typography } from '@material-ui/core';
import { borders } from '@material-ui/system';


const ShowingComments = (props) => {
    return(props.comments.map(comment => {
        return(<div>
            <Box  m={2} fontWeight="fontWeightBold" component="h3">
                {comment.username}
            </Box>
            <Box m={3}>
                {comment.text}
            </Box>
            </div>)
    }))
}

const ShowingBlogs = () => {
    //const [blogs, setBlogs] = useState("No blogs available!")
    //TEMPORARY! For the purpose of presenting in Sprint 1
    const [blogs, setBlogs] = useState([
        {
            title: "First Course Up!",
            date: "March 9, 2020",
            post: "The first course is available! I hope you enjoy it!",
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
                <div className="scroll">
                    <Box border={1} p={5}>
                        <table>
                            <td className="left"><Typography component="h1" variant="h5">{blog.title}</Typography></td>
                            <td className="right"><Typography>{blog.date}</Typography></td>
                        </table>
                        <Box p={5}>
                            {blog.post}
                        </Box>
                        <Box >
                            <Typography component="h5" variant="h5">Comments</Typography>
                        </Box>
                        <ShowingComments comments={blog.comments}/>
                    </Box>
                </div> 
            )
        })
    ) 
}

const Blog = () => {
    return(
        <UserContext.Consumer>{context => {
            if (context.isAuthenticated()) {
                return (
                    <CssBaseline>
                        <div>
                            <ShowingBlogs/>
                        </div>
                    </CssBaseline>
                );
            }
            else {
                return(<Redirect to="/User/Login"/>)
            }
        }}</UserContext.Consumer>
    )
}
export default Blog;