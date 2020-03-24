import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import DeleteIcon from '@material-ui/icons/Delete'
import {UserContext} from '../../../../contexts/UserContext';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import API from '../../../../modules/API';
import { Redirect } from 'react-router-dom';

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
        <React.Fragment>
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
            {props.authors.map((author, index) => {
                return(
                    <Button
                        key={index}
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        endIcon={<DeleteIcon/>}
                        onClick={(event) => removeAuthor(index)}
                    >
                        {author}
                    </Button>
                )
            })}
        </React.Fragment>   
    )
}

function PriceForm(props){
    const classes = useStyles();
    const [radio, setRadio] = useState('');

    function handlePriceChange(event){
        props.setPrice(event.target.value);
    }

    function handleRadioChange(event){
        setRadio(event.target.value);
    }

    return(
        <FormControl>
            <FormLabel>Price</FormLabel>
            <RadioGroup onChange={handleRadioChange}>
                <FormControlLabel 
                    value='free' 
                    label='Free' 
                    control={<Radio/>}
                />
                <FormControlLabel 
                    value='price' 
                    label={
                        (radio == 'price') && 
                        <CurrencyTextField
                                variant="outlined"
                                currencySymbol="$"
                                minimumValue={0}
                                maximumValue={1000}
                                margin="normal"
                                fullWidth
                                value={props.price}
                                onChange={handlePriceChange}
                                id="price"
                                label="Price"
                                name="price"
                        /> || 'Payed'
                    }
                    control={<Radio/>}
                />
            </RadioGroup>
        </FormControl>
    )
}

export default function CourseCreator() {
    const classes = useStyles();
    
    const [authors, setAuthors] = useState([]);
    const [price, setPrice] = useState(0);
    const [id, setId] = useState('');

    const [errors, setErrors] = useState({});

    function handleSubmit(){
        API.post('/api/course/', {
            title: document.getElementById('title').value,
            author: authors,
            description: document.getElementById('description').value,
            free: (price == 0),
            price: price,
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
                <Container component="main" maxWidth="xl">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Course Creator
                    </Typography>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="title"
                        label="Course Title"
                        name="title"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        multiline
                        id="description"
                        label="Description"
                        name="description"
                    />
                    <AuthorForm authors={authors} setAuthors={setAuthors}/>
                    <PriceForm price={price} setPrice={setPrice}/>
                    <Button
                        color='primary'
                        variant='outlined'
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </div>
                </Container>
            )}}
        </UserContext.Consumer>
    );
}