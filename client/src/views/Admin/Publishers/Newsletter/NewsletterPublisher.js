import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import CssBaseline from '@material-ui/core/CssBaseline';
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
        marginBottom: "2.5%",
        marginTop: "2.5%"
    },
    title: {
        marginBottom: "2.5%",
        marginTop: "2.5%"
    },
    heading: {
        marginBottom: "2.5%",
        marginTop: "2.5%",
        marginLeft: "4.5%",
        marginRight: "4.5%",
    },
    textfield: {
        width: "90%",
        marginLeft: "4.5%",
        marginRight: "2.5%",
        marginBottom: "2.5%",
        marginTop: "2.5%",
    },
    button: {
        marginTop: "1.5%",
    },
    failTry: {
        fontSize: "14px",
        marginBottom: "1.5%",
        marginTop: "1.5%"
    }
}));


export default function NewsletterPublisher() {
    const [text, setText] = useState()
    const [text1, setText1] = useState()
    const [text2, setText2] = useState()
    const [checked, setChecked] = useState(false)
    const [failTry, setFailTry] = useState(false)
    const classes = useStyles();

    const handleChange = (event) => {
        setText(event.target.value);
        setFailTry(false);
    };
    const handleChange1 = (event) => {
        setText1(event.target.value);
        setFailTry(false);
    };
    const handleChange2 = (event) => {
        setText2(event.target.value);
        setFailTry(false);
    };

    const approveNewsletter = (event) => {
        setChecked(event.target.checked)
        setFailTry(false);
    }

    const submitEmail = (event) => { 
        if (checked === true) {
            API.post('/api/admin/newsletter/', { text, text1, text2 });
            setChecked(false);
            setText("")
            setText1("")
            setText2("")
            alert("Newsletter was sent");
        }
        else
            setFailTry(true);


    }
    return (
        <div className="App">
            <header className="App-header">
            </header>
            <div className={classes.center}>
                <Paper className={classes.container}>
                    <Typography variant="h1 " component="h2" className={classes.title}>
                        Newsletter Publisher:
                    </Typography>
                    <Typography className={classes.heading}>
                        Enter the email's subject, body, and any links to include in their respective fields.
                        Once you you are ready to send, click the checkbox and press send.
                    </Typography>
                    <Grid container className={classes.textfield}>
                        <form>
                            <TextField
                                id="Title"
                                label="Email Subject"
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
                            <CssBaseline>
                                {failTry ? <Typography color="primary" className={classes.failTry}>Please confirm your newsletter first</Typography> : ""}
                            </CssBaseline>
                            <Grid item>
                                <FormControlLabel
                                    control={<Checkbox checked={checked} onChange={approveNewsletter} />}
                                    label="Approve to Send" />
                                <Button
                                    className={classes.button}
                                    variant="contained"
                                    color="primary"
                                    onClick={submitEmail}
                                >Send Newsletter
                            </Button>
                            </Grid>
                        </form>
                    </Grid>
                </Paper>
            </div >
        </div>
    );
}
