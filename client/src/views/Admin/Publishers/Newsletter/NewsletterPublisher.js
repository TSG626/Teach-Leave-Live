import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import API from '../../../../modules/API'

const useStyles = makeStyles((theme) => ({
    center: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    heading: {
        marginTop: "2.5%"
    },
    container: {
        width: "70%",
        marginLeft: "2.5%",
        marginRight: "2.5%",
        marginBottom: "2.5%",
        marginTop: "2.5%"
    },
    textfield: {
        marginLeft: "2.5%",
        marginRight: "2.5%",
        marginBottom: "2.5%",
        marginTop: "2.5%"
    },
    button: {
        marginTop: "1.5%",
    }
}));


export default function NewsletterPublisher() {
    const [text, setText] = useState()
    const [text1, setText1] = useState()
    const [text2, setText2] = useState()
    const classes = useStyles();
    const handleChange = (event) => {
        setText(event.target.value);
    };
    const handleChange1 = (event) => {
        setText1(event.target.value);
    };
    const handleChange2 = (event) => {
        setText2(event.target.value);
    };

    const submitEmail = (event) => {
        API.post('/api/admin/newsletter/', { text, text1, text2 });
    }
    return (
        <div className="App">
            <header className="App-header">
            </header>
            <div className={classes.center}>
                <Paper className={classes.container}>
                    <Typography variant="h1 " component="h2" className={classes.heading}>
                        Newsletter Publisher
                    </Typography>
                    <Grid container className={classes.textfield}>
                        <form>
                            <TextField
                                id="Title"
                                label="Email Title"
                                variant="outlined"
                                value={text} onChange={handleChange}
                                margin="normal"
                                required
                                autoFocus
                                fullWidth
                            />
                            <TextField
                                id="Title"
                                label="Email Body"
                                variant="outlined"
                                value={text1}
                                onChange={handleChange1}
                                margin="normal"
                                multiline
                                rows="10"
                                required
                                fullWidth
                                autoFocus
                            />
                            <TextField
                                id="Title"
                                label="Email Links"
                                variant="outlined"
                                value={text2}
                                onChange={handleChange2}
                                margin="normal"
                                fullWidth
                                multiline
                                rows="2"
                            />
                            <Button
                                className={classes.button}
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={submitEmail}
                            >Send Newsletter
                        </Button>
                        </form>
                    </Grid>
                </Paper>
            </div >
        </div>
    );
}