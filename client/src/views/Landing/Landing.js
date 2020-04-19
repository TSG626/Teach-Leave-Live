import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Route, Switch } from 'react-router-dom';
import InstagramIcon from '@material-ui/icons/Instagram'
import FacebookIcon from '@material-ui/icons/Facebook';
import WebIcon from '@material-ui/icons/Web';
import { Link, Box } from '@material-ui/core';
import Link2 from '@material-ui/core/Link';
import { CssBaseline, Container, Grid, Typography } from '@material-ui/core';
import Blog from '../Admin/Publishers/Blog/Blog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import API from '../../modules/API.js';

function Landing() {
  return (
    <div className="App">
      <div className="Welcome">
        <text>Teach. Leave. Live.</text>
      </div>

      <div className="NormalHeader">
        <text>Welcome to TLL!</text>
      </div>

      <div className="column1">
        <div className="About">
          <div className="AboutTitle">
            <text>About TLL</text>
          </div>

          <div className="BodyText">
            <text>
              TLL is a web-based platform designed to provide tools to teachers
              so that they can teach their hearts out, leave work at work, and
              live life with intention. We provide resources for teachers to
              learn how to efficiently manage time and organize their work.
            </text>
          </div>
        </div>
        <div className="TopPad">
          <div className="TopLinks">
            <text className="Socials">Socials</text>
            <div className="ButtonGrid">
              <Button
                className="InstLink"
                target="_blank"
                rel="noopener"
                href="https://www.instagram.com/teachleavelive/"
              ></Button>
              <Button
                className="TwitLink"
                target="_blank"
                rel="noopener"
                href="https://www.twitter.com"
              ></Button>
              <Button
                className="FBLink"
                target="_blank"
                rel="noopener"
                href="https://www.facebook.com"
              ></Button>
              <Button
                className="OtherLink"
                target="_blank"
                rel="noopener"
                href="https://www.teacherspayteachers.com/Store/Teach-Leave-Live"
              ></Button>
            </div>
          </div>
        </div>
      </div>

      <div className="column2">
        <div className="BlogTableSection">
          <text className="RecentBlogs">Recent Blogs</text>
          <div className="BlogList">
            <table>
              <th>
                <td>User</td>
              </th>
              <th>
                <td>Blog Post</td>
              </th>
              <tr>
                <td>Spencer</td>
                <td>This website is cool</td>
              </tr>
              <tr>
                <td>Amanda</td>
                <td>This website is nice</td>
              </tr>
              <tr>
                <td>Daniel</td>
                <td>This website is awesome</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function Socials() {
    return (
        <Grid container direction="column">
            <Grid item>
                <Link2 target="_blank" rel="noopener" href="https://www.instagram.com/teachleavelive/">
                    <InstagramIcon style={{ fontSize: 50 }} fontSize="small" color="inherit"/>
                </Link2>
            </Grid>
            <Grid item>
                <Link2 target="_blank" rel="noopener" href="https://www.facebook.com/teachleavelive/">
                    <FacebookIcon style={{ fontSize: 50 }} fontSize="small" color="inherit"/>
                </Link2>
            </Grid>
            <Grid item>
                <Link2 target="_blank" rel="noopener" href="https://www.teacherspayteachers.com/Store/Teach-Leave-Live">
                    <WebIcon style={{ fontSize: 50 }} fontSize="small" color="inherit"/>
                </Link2>
            </Grid>
        </Grid>
    );
}

function LandingBody(props) {
    const classes = props.classes;
    const [message, setMessage] = useState('');

    async function handleEmailSubmit(e) {
        e.preventDefault();
        let email = document.getElementById('email').value;
        if (!email.includes('@')){
            setMessage('Please enter a valid email.');
            return;
        }
        else {
            document.getElementById('email').value = ('');
            setMessage('');
            API.post('/api/addEmail', {
                email: email,
            }).then((res) => {
                setMessage(res.data.message);
            }).catch((err) => {
                console.log(err);
                setMessage('Something went wrong. Please refresh and try again.');
            });
        }
    }

    return (
        <div>
            <CssBaseline/>
            <Container maxWidth='lg'>
                <Typography align={'center'} variant="h2">Welcome to TLL</Typography>
                <Grid container direction='row' spacing={0}>
                    <Grid item>
                        <Box width={1/2}>
                            <Typography color={'initial'} variant="h6">About TLL</Typography>
                            <Typography varient={'body2'}>
                                TLL is a web-based platform designed to provide tools to teachers so that they can teach their
                                hearts out, leave work at work, and live life with intention. We provide resources for teachers to
                                learn how to efficiently manage time and organize their work.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Box width={1}>
                            <Typography variant="h6">Join our newsletter</Typography>
                            <form onSubmit={(e) => handleEmailSubmit(e)}>
                                <TextField
                                    variant='filled'
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                Sign Up
                                </Button>
                                <Typography variant="subtitle">{message}</Typography>
                            </form>
                        </Box>
                    </Grid>
                </Grid>
                <Switch>
                    <Route path={`${props.match.path}`} component={Blog} />
                </Switch>
            </Container>
        </div>
    );
}

export default function Landing({match}) {
    const classes = useStyles();
    const [message, setMessage] = useState('');

    return (
        <div>
            <LandingBody
            classes={classes}
            match={match}
            />
            <div style={{position: 'absolute', right: 1, top: 90}}>
                <Socials/>
            </div>
        </div>
    );
};
