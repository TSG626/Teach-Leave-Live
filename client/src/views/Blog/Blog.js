import React, { useState } from 'react';
import './Blog.css';
import { UserContext } from '../../contexts/UserContext';
import { Redirect } from 'react-router-dom';
import { CssBaseline, Box, Typography } from '@material-ui/core';
import { borders } from '@material-ui/system';
import BlogPublisher from '../Admin/Publishers/Blog/BlogPublisher'


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
    const [blogs, setBlogs] = useState([]);
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