import React, {useState, useEffect, useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router';
import Grid from '@material-ui/core/Grid';
import { Button, Container, Box, Typography, TextField} from '@material-ui/core';
import {SaveTwoTone as SaveIcon} from '@material-ui/icons/';
import API from '../../../../modules/API';
import AuthorForm from '../../../../components/Admin/AuthorForm'

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    moduleText: {
        width: 200,
        height: 50
    }
}));

// function BlogForm(props){
//     const filter = createFilterOptions();

//     return(
//         <Autocomplete
//             value={props.blog.subject}
//             onChange={(event, newValue) => {
//                 if (newValue && newValue.inputValue) {
//                 props.setBlog({...props.blog, subject: newValue.inputValue});
//                 return;
//                 }
//                 props.setBlog({...props.blog, subject: newValue});
//             }}
//             options={context.subjectList}
//             filterOptions={(options, params) => {
//                 const filtered = filter(options, params);
//                 if (params.inputValue !== '') {
//                     filtered.push({
//                     inputValue: params.inputValue,
//                     title: `Add "${params.inputValue}"`,
//                     });
//                 }
//                 return filtered;
//             }}
//             getOptionLabel={(option) => {
//                 if (option.inputValue) {
//                 return option.inputValue;
//                 }
//                 return option;
//             }}
//             renderOption={(option) => {
//                 if (option.inputValue) {
//                 return option.title;
//                 }
//                 return option;
//             }}
//             renderInput={(params) => (
//                 <TextField {...params} label="Subject" variant="outlined" />
//             )}
//         />
//     )
// }

export default function BlogEditor(props) {
    console.log(props);
    const classes = useStyles();
    const [blog, setBlog] = useState({
        author: [],
        modules: [],
        published: false,
        title: '',
        description: '',
    });
    let {id} = useParams();
    const [saving, setSaving] = useState(false);

    function setAuthors(authors){
        setBlog({...blog, authors: authors});
    }

    useEffect(() => {
        let ignore = false;
        async function fetchData(){
            API.get('/api/blog/', {id: id}).then(res => {
                if(res.status === 200){
                    setBlog(res.data);
                }
            });
        }
        fetchData();
        return () => {ignore = true;}
    }, []);
    async function handleSave(){
        setSaving(true);
        console.log(blog);
        API.put(`/api/blog/${id}`, blog).then(res => {
            if(res.status === 200){
                setSaving(false);
            }
        });
    }

    return (
        <Container maxWidth={false} style={{padding:25}}>
            <Box border={1}>
                <div className={classes.root}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography varient="h5">
                                Blog Details
                            </Typography>
                        </Grid>
                        <Grid item xs={6} style={{padding:15}}>
                            <TextField
                             variant="outlined"
                             margin="normal"
                             required
                             fullWidth
                             id="title"
                             label="Blog Title"
                             name="title"
                             value={blog.title}
                             onChange={(event) => setBlog({...blog, title: event.target.value})}></TextField>
                        </Grid>
                        <Grid item xs={6} style={{padding:15}}>
                            <TextField
                             variant="outlined"
                             margin="normal"
                             required
                             fullWidth
                             id="description"
                             label="Blog Description"
                             name="description"
                             value={blog.description}
                             onChange={(event) => setBlog({...blog, description: event.target.value})}></TextField>
                        </Grid>
                        {/* <Grid item xs={12} sm={6}>
                            <AuthorForm authors={blog.authors} setAuthors={setAuthors}/>
                        </Grid> */}
                    </Grid>
                    <Grid item container xs={12} style={{padding: 20}} justify='center'>
                            <Button startIcon={<SaveIcon/>} onClick={handleSave} color='primary' variant='outlined' size='large'>Save</Button>
                    </Grid>
                </div>
            </Box>
        </Container>
    );
}
