import React from 'react';
import './NewsletterPublisher.css';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

export default function NewsletterPublisher() {
    return (
        <div className="App">
            <header className="App-header">
            </header>
            <Grid container>
                <Paper className="Paper">
                    <TextField
                        variant="outlined"
                        required
                        id="enterEmail"
                        label="Email Title"
                        autoFocus
                        margin="normal"
                        className="enterTitle"
                    />
                    <TextField
                        variant="outlined"
                        required
                        id="enterEmailBody"
                        label="Email Body"
                        autoFocus
                        margin="normal"
                        className="enterBody"
                    />
                </Paper>
                <div className="Divider"></div>
                <Paper className="Paper">
                    <div class="container">

                        <div class="content">
                            <div class="emailHeader">Hello ,</div>
                            <div class="body"> To verify your email, click the link below.</div>
                            <div class="url">url</div>
                            <div class="body2">Get started by signing into our website or visiting our socials. Click the
                            icons below to be directed to our website or instagram.</div>

                        </div>
                    </div>
                </Paper>

            </Grid>
        </div >
    );
}