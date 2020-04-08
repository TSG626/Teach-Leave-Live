import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Grid } from '@material-ui/core';
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

export default function BlogCreator(props) {
    const classes = useStyles();
    
    const [title, setTitle] = useState('');
    const [authors, setAuthors] = useState([]);
    const [body, setBody] = useState('');
    const [id, setId] = useState('');
    const [errors, setErrors] = useState({});

    function handleSubmit(){
        API.post('/api/blog/', {
            title: document.getElementById('title').value,
            body: document.getElementById('body').value,
            authors: authors
        }).then(res => {
            if(res.status == 200){
                console.log(res.data);
                props.setBlogList(props.blogList.concat(res.data));
                props.setAdding(false);
                //window.location.reload(false); FIXME: Uncomment later
                return false;
            }
        }).catch(err => {
            setErrors(err);
        })
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
                        required
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        multiline
                        id="title"
                        label="Title"
                        name="title"
                        onChange={(event) => setTitle(event.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="body"
                            label="Body"
                            name="body"
                            value={body}
                            onChange={(event) => setBody(event.target.value)}
                            multiline
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12}>
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