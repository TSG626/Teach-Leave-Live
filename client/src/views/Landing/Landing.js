import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Route, Switch } from 'react-router-dom';
import InstagramIcon from '@material-ui/icons/Instagram'
import FacebookIcon from '@material-ui/icons/Facebook';
import WebIcon from '@material-ui/icons/Web';
import { Link, Box } from '@material-ui/core';
import Link2 from '@material-ui/core/Link';
import { CssBaseline, Container, Grid, Typography } from '@material-ui/core';
import Blog from '../Admin/Publishers/Blog/Blog';

const useStyles = makeStyles(theme => ({
    cardList: {
        padding: theme.spacing(1, 1),
        backgroundColor: 'grey'
      },
}));

export default function Landing({match}) {
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
                <Container maxWidth='lg'>
                    <Switch>
                        <Route path={`${match.path}`} component={Blog} />
                    </Switch>
                </Container>
            </Box>
        </div>
    );
}