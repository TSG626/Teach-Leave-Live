import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Grid } from '@material-ui/core';
import AuthorForm from '../../../../components/Admin/AuthorForm';
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

function BodyForm(props){
    const classes = useStyles();
    const [body, setBody] = useState('');

    // function addBody(a){
    //     props.setBody(props.body.concat(a));
    // }

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

export default function BlogCreator() {
    const classes = useStyles();
    
    const [title, setTitle] = useState('');
    const [authors, setAuthors] = useState([]);
    const [body, setBody] = useState([]);
    const [id, setId] = useState('');
    const [errors, setErrors] = useState({});

    function handleSubmit(){
        API.post('/api/blog/', {
            title: document.getElementById('title').value,
            author: authors,
            body: document.getElementById('body').value,
        }).then(res => {
            console.log(res.data);
            if(res.status == 200){
                setTitle(res.data.title);
                setId(res.data.id);
                setBody(res.data.body);
            }
        }).catch(err => {
            setErrors(err);
        })
    }

    if(id != ''){
        return(
            <Redirect to={`/Admin/Blog/Edit/${id}/`}/>
        )
    }
    
    return (
        <Container>
            <Grid container alignContent={'center'} justify={'space-between'}>
                <Grid item xs={12}>
                    <Typography className={classes.title}>
                        Blog Post Creator
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        multiline
                        id="title"
                        label="Title"
                        name="title"
                    />
                </Grid>
                <Grid item xs={12}>
                    <BodyForm body={body} setBody={setBody}/>
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
    );
}