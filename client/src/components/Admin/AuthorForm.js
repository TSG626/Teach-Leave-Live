import  React, { useState } from "react";
import { Delete as DeleteIcon } from '@material-ui/icons';
import { Grid, Tooltip, TextField, Button, useStyles } from "@material-ui/core";

export default function AuthorForm(props){
    const [author,setAuthor] = useState('');

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
            <Tooltip arrow title="Type a name and press Enter">
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
            </Tooltip>
            <Grid container>
                {props.authors.map((author, index) => {
                    return(
                        <Grid item key={index} style={{paddingRight: 5, paddingBottom: 5}}>
                            <Button
                                variant="contained"
                                color="secondary"
                                endIcon={<DeleteIcon/>}
                                onClick={(event) => removeAuthor(index)}
                            >
                                {author}
                            </Button>
                        </Grid>
                    )
                })}
            </Grid>
        </Grid>   
    )
}