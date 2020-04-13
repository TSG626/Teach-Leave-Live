import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Grid, Tooltip } from '@material-ui/core';
import AuthorForm from '../../../../../components/Admin/AuthorForm'
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete'
import {CourseContext} from '../../../../../contexts/Admin/CourseContext'

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

function PriceForm(props){
    const [radio, setRadio] = useState('');

    function handlePriceChange(event){
        props.setCourse({...props.course, price: event.target.value});
    }

    function handleRadioChange(event){
        setRadio(event.target.value);
    }

    return(
        <Grid container style={{padding: 15}}>
            <FormControl>
                <FormLabel>Price</FormLabel>
                <RadioGroup value={props.course.free ? 'free' : props.course.price} onChange={handleRadioChange}>
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
                                    value={props.course.price}
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
        </Grid>
    )
}

function SubjectForm(props){
    const filter = createFilterOptions();

    return(
        <CourseContext.Consumer>{context => {
            return(
                <Autocomplete
                    value={props.course.subject}
                    onChange={(event, newValue) => {
                        if (newValue && newValue.inputValue) {
                        props.setCourse({...props.course, subject: newValue.inputValue});
                        return;
                        }
                        props.setCourse({...props.course, subject: newValue});
                    }}
                    options={context.subjectList}
                    filterOptions={(options, params) => {
                        const filtered = filter(options, params);
                        if (params.inputValue !== '') {
                            filtered.push({
                            inputValue: params.inputValue,
                            title: `Add "${params.inputValue}"`,
                            });
                        }
                        return filtered;
                    }}
                    getOptionLabel={(option) => {
                        if (option.inputValue) {
                        return option.inputValue;
                        }
                        return option;
                    }}
                    renderOption={(option) => {
                        if (option.inputValue) {
                        return option.title;
                        }
                        return option;
                    }}
                    renderInput={(params) => (
                        <TextField {...params} label="Subject" variant="outlined" />
                    )}
                />
            )
        }}</CourseContext.Consumer>
    )
}

export default function CourseCreator(props) {
    const classes = useStyles();

    function setAuthors(authors){
        props.setCourse({...props.course, author: authors});
    }

    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography varient="h5">
                    Course Details
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="Course Title"
                    name="title"
                    value={props.course.title}
                    onChange={(event) => props.setCourse({...props.course, title: event.target.value})}
                />
            </Grid>
            <Grid item xs={12}>
                <SubjectForm course={props.course} setCourse={props.setCourse}/>
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
                    value={props.course.description}
                    onChange={(event) => props.setCourse({...props.course, description: event.target.value})}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <AuthorForm authors={props.course.author} setAuthors={setAuthors}/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <PriceForm course={props.course} setCourse={props.setCourse}/>
            </Grid>
        </Grid>
    )
}