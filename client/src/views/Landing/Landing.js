import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import InstagramIcon from '@material-ui/icons/Instagram'
import FacebookIcon from '@material-ui/icons/Facebook';
import WebIcon from '@material-ui/icons/Web';
import Button from '@material-ui/core/Button';
import './Landing.css';
import { UserContext } from './../../contexts/UserContext';
import { Link, Box } from '@material-ui/core';
import Link2 from '@material-ui/core/Link'
import { CssBaseline, IconButton, Container, Grid, Typography } from '@material-ui/core';
import { spacing } from '@material-ui/system';
import EJSContentViewer from './../../components/Interface/EJSContentViewer';

const useStyles = makeStyles(theme => ({
    cardList: {
        padding: theme.spacing(1, 1),
        backgroundColor: 'grey'
      },
}));

export default function Landing() {
    const classes = useStyles();
    return (
        <div>
            <CssBaseline/>
            <Box p={2}>
                <Grid container>
                    <Grid xs={12}>
                        <Typography align={'center'} variant="h2">Welcome to TLL!</Typography>
                    </Grid>
                    <Grid xs={6}>
                        <Link color={'initial'} underline={'always'} variant="h6">About TLL</Link>
                        <Typography varient={'body2'}>
                            TLL is a web-based platform designed to provide tools to teachers so that they can teach their 
                            hearts out, leave work at work, and live life with intention. We provide resources for teachers to 
                            learn how to efficiently manage time and organize their work.
                        </Typography>
                    </Grid>
                    <Grid xs={6}>
                        <Box p={2}>
                            <Link color={'initial'} underline={'always'} variant="h6">Socials</Link>
                        </Box>
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
                </Grid>
                <Box p={2}>
                    <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="flex-start"
                    className={classes.cardList}>
                        {/* {blogList && blogList.map((blog, index) => {
                        return(
                            <Grid key={index} item container xs={12} className={classes.card}>
                            <BlogCard blog={blog}/>
                            </Grid>
                        )
                        })} */}
                    </Grid>
                </Box>
            </Box>
        </div>
        // <UserContext.Consumer>{context=>{
        //     return(
            
        //     )}}</UserContext.Consumer>
        // <React.Fragment>
            
        // </React.Fragment>
        
        // <CssBaseline>
        //             <div className="App">
        //     <div className="Welcome">
        //         <text>Teach. Leave. Live.</text>
        //     </div>
        //     <div className="NormalHeader">
        //         <text>Welcome to TLL!</text>
        //     </div>

        //     <div className="column1">
        //         <div className="About">
        //             <div className="AboutTitle">
        //                 <text>About TLL</text>
        //             </div>
                    
        //             <div className="BodyText">
        //                 <text>
        //                     TLL is a web-based platform designed to provide tools to teachers so that they can teach their 
        //                     hearts out, leave work at work, and live life with intention. We provide resources for teachers to 
        //                     learn how to efficiently manage time and organize their work.
        //                 </text>
        //             </div>
        //         </div>
        //         <div className="TopPad">
        //             <div className="TopLinks">
        //                 <text className = "Socials">Socials</text>
        //                 <div className = "ButtonGrid">
        //                     <Button className="InstLink" target="_blank" rel="noopener" href="https://www.instagram.com/teachleavelive/"></Button>
        //                     <Button className="TwitLink" target="_blank" rel="noopener" href="https://www.twitter.com"></Button>
        //                     <Button className="FBLink" target="_blank" rel="noopener" href="https://www.facebook.com"></Button>
        //                     <Button className="OtherLink" target="_blank" rel="noopener" href=""></Button>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>

        //     <div className="column2">
        //         <div className="BlogTableSection">
        //             <text className="RecentBlogs">Recent Blogs</text>
        //             <div className="BlogList">
        //                 <table>
        //                     <th>
        //                         <td>User</td>
        //                     </th>
        //                     <th>
        //                         <td>Blog Post</td>
        //                     </th>
        //                     <tr>
        //                         <td>Spencer</td>
        //                         <td>This website is cool</td>
        //                     </tr>
        //                     <tr>
        //                         <td>Amanda</td>
        //                         <td>This website is nice</td>
        //                     </tr>
        //                     <tr>
        //                         <td>Daniel</td>
        //                         <td>This website is awesome</td>
        //                     </tr>
        //                 </table>
                            
        //             </div>
        //         </div>
        //     </div>
        // </div>
        // </CssBaseline>
    );
}