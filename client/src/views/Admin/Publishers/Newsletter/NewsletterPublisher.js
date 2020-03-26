import React, { useState } from 'react';
import './NewsletterPublisher.css';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Grow from '@material-ui/core/Grow';

const options = [
    "Header",
    "Paragraph",
    "Link",
    "Footer"
]



export default function NewsletterPublisher() {
    const [parts, set_parts] = useState([reactCode(0, "Title")]);
    const [email, set_email] = useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const [index, setIndex] = React.useState(1);

    const handleMenuItemClick = (event, index, popupState) => {
        setSelectedIndex(index);
        setAnchorEl(null);
        popupState.close();
    };

    function htmlCode(props, type) {
        if (type === "Header")
            return (<h>{props}</h>)
        else if (type === "Paragraph")
            return (<p>{props}</p>)
        else if (type === "Link")
            return (<a> href={props}</a>)
        else if (type === "Footer")
            return (<div>{props}</div>)
    }

    function reactCode(key, type) {
        if (type === "Title") {
            return (<Grid item>
                < TextField
                    variant="outlined"
                    required
                    id={key}
                    label="Email Title"
                    autoFocus
                    margin="normal"
                    className="enterTitle"
                    onChange={(e) => { console.log(e.target.id, e.target.value) }}

                />
            </Grid>)
        }
        else if (type === "Header") {
            return (<Grid item>
                < TextField
                    variant="outlined"
                    required
                    id={key}
                    label="Header"
                    autoFocus
                    margin="normal"
                    className="enterBody"
                    onChange={(e) => { updateHTML(e.target.id, e.target.value, "Header") }}
                />
            </Grid>)
        }
        else if (type === "Paragraph") {
            return (<Grid item>
                < TextField
                    variant="outlined"
                    required
                    id={key}
                    label="Paragraph"
                    autoFocus
                    margin="normal"
                    className="enterBody"
                    onChange={(e) => { updateHTML(e.target.id, e.target.value, "Paragraph") }}
                />
            </Grid>)
        }
        else if (type === "Link") {
            return (<Grid item>
                < TextField
                    variant="outlined"
                    required
                    id={key}
                    label="Link"
                    autoFocus
                    margin="normal"
                    className="enterBody"
                    onChange={(e) => { updateHTML(e.target.id, e.target.value, "Link") }}
                />
            </Grid>)
        }
        else if (type === "Footer") {
            return (<Grid item>
                < TextField
                    variant="outlined"
                    required
                    id={key}
                    label="Footer"
                    autoFocus
                    margin="normal"
                    className="enterBody"
                    onChange={(e) => { updateHTML(e.target.id, e.target.value, "Footer") }}
                />
            </Grid>)
        }
    }

    function updateHTML(key, input, label) {
        console.log(key, input, label)
        let newEmail = email
        newEmail.splice(key - 1, 1, htmlCode(input, label))
        console.log(email)
        console.log(newEmail)
        //let newEmail = email.forEach(function (item, i) { if (i = key - 1) email[key - 1] = htmlCode(input, label); })
        set_email(newEmail);
    }

    const addItem = () => {
        if (options[selectedIndex] === "Header") {
            set_parts(parts => [...parts, reactCode(index, "Header")])
            setIndex(index + 1)
            set_email(email => [...email, htmlCode("Header", "Header")])
            console.log(email)
        }
        else if (options[selectedIndex] === "Paragraph") {
            set_parts(parts => [...parts, reactCode(index, "Paragraph")])
            setIndex(index + 1)
            set_email(email => [...email, htmlCode("Paragraph", "Paragraph")])
        }
        else if (options[selectedIndex] === "Link") {
            set_parts(parts => [...parts, reactCode(index, "Link")])
        }
        else if (options[selectedIndex] === "Footer") {
            set_parts(parts => [...parts, reactCode(index, "Footer")])
        }
    }

    function seeEmail() {
        console.log(email)
    }
    return (
        <div className="App">
            <header className="App-header">
            </header>
            <Grid container>
                <Paper className="Paper">
                    {parts.map((e) => <div>{e}</div>)}
                    <Grid container>
                        <Grid item>
                            <PopupState variant="popover" popupId="demo-popup-menu">
                                {popupState => (
                                    <React.Fragment>
                                        <Button variant="contained" color="primary"
                                            {...bindTrigger(popupState)}>
                                            {options[selectedIndex]}
                                        </Button>
                                        <Menu
                                            {...bindMenu(popupState)}>
                                            {options.map((option, index) => (
                                                <MenuItem
                                                    key={option}
                                                    selected={index === selectedIndex}
                                                    onClick={event => handleMenuItemClick(event, index, popupState)}
                                                >
                                                    {option}
                                                </MenuItem>
                                            ))}

                                        </Menu>
                                    </React.Fragment>
                                )}
                            </PopupState>
                        </Grid>
                        <Grid item>
                            <Button onClick={addItem}
                                fullWidth
                                variant="contained"
                                color="primary"
                            >Add component</Button>
                        </Grid>
                        <Grid item>
                            <Button onClick={seeEmail}>See html</Button>
                        </Grid>
                    </Grid>
                </Paper>
                <Paper className="Paper" align="left">

                    <div class="container">
                        <div class="content">
                            {email.map((e) => <div>{e}</div>)}
                        </div>
                    </div>
                </Paper>
            </Grid>
        </div >
    );
}