import './BlogPublisher.css';
import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import DeleteIcon from '@material-ui/icons/Delete'
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Grid } from '@material-ui/core';
import {UserContext} from '../../../../contexts/UserContext';
import { Redirect } from 'react-router-dom';
import API from '../../../../modules/API';

const useStyles = makeStyles(theme => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    error:{
        color: 'red',
    }
}));

function AuthorForm(props){
    const classes = useStyles();
    const [author, setAuthor] = useState('');

    function addAuthor(a){
        props.setAuthors(props.authors.concat(a));
    }

    function removeAuthor(index){
        const newAuthors = props.authors.filter((a, i) => {
            if(i !== index) return(a);
        }) 
        props.setAuthors(newAuthors);
    }

    function handleAuthorSubmit(event){
        if(event.key === 'Enter'){
            addAuthor(document.getElementById('author').value);
            setAuthor('');
        }
    }

    return(
        <Grid container>
            <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="author"
                    label="Authors"
                    name="author"
                    value={author}
                    onChange={(event) => setAuthor(event.target.value)}
                    onKeyPress={handleAuthorSubmit}
                />
            </Grid>
            <Grid item container xs={12}>
                {props.authors.map((author, index) => {
                    return(
                        <Grid item xs={12} sm={2}
                            style={{paddingRight: 5, paddingBottom: 5}}
                        >
                            <Button
                                key={index}
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                endIcon={<DeleteIcon/>}
                                onClick={(event) => removeAuthor(index)}>
                                {author}
                            </Button>
                        </Grid>
                    )
                })}
            </Grid>
        </Grid>   
    )
}

function BodyForm(props){
    const classes = useStyles();
    const [body, setBody] = useState('');

    function addBody(a){
        props.setBody(props.body.concat(a));
    }

    return(
        <Grid container>
            <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="body"
                    label="Description"
                    name="body"
                    value={body}
                    onChange={(event) => setBody(event.target.value)}
                />
            </Grid>
            <Grid item container xs={12}>
                {props.body.map((body, index) => {
                    return(
                        <Grid item xs={12} sm={2}
                            style={{paddingRight: 5, paddingBottom: 5}}>
                        </Grid>
                    )
                })}
            </Grid>
        </Grid>   
    )
}

export default function CourseCreator() {
    const classes = useStyles();
    
    const [authors, setAuthors] = useState([]);
    const [body, setBody] = useState([]);
    const [id, setId] = useState('');
    const [errors, setErrors] = useState({});

    function handleSubmit(){
        API.post('/api/course/', {
            title: document.getElementById('title').value,
            author: authors,
            description: document.getElementById('description').value,
        }).then(res => {
            if(res.status == 200){
                setId(res.data.id);
            }
        }).catch(err => {
            setErrors(err);
        })
    }

    if(id != ''){
        return(
            <Redirect to={`/Admin/Course/Edit/${id}/`}/>
        )
    }
    
    return (
        <UserContext.Consumer>{(context) => {
            return(
                <Container component="main" maxWidth={false}>
                    <Grid container alignContent={'center'} justify={'space-between'}>
                        <Grid item xs={12}>
                            <br></br>
                            <Typography className={classes.title}>
                                Blog Post Creator
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <BodyForm body={body} setBody={setBody}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                multiline
                                id="description"
                                label="Description"
                                name="description"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <AuthorForm authors={authors} setAuthors={setAuthors}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                color='primary'
                                variant='outlined'
                                onClick={handleSubmit}>
                                Post
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            )}}
        </UserContext.Consumer>
    );
}