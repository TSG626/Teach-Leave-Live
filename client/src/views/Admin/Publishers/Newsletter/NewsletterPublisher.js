import React, { useState } from 'react';
import './NewsletterPublisher.css';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import IconButton from '@material-ui/core/IconButton';

const options = [
    "Header",
    "Paragraph",
    "Link",
    "Footer"
]

export default function NewsletterPublisher() {
    const [parts, set_parts] = useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const [index, setIndex] = React.useState(1);
    const [bool, setBool] = React.useState(false);

    const handleMenuItemClick = (event, index, popupState) => {
        setSelectedIndex(index);
        setAnchorEl(null);
        popupState.close();
    };

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
                    multiline
                />
            </Grid>)
        }
        else if (type === "Paragraph") {
            return (
                < TextField
                    variant="outlined"
                    required
                    id={key}
                    label="Paragraph"
                    autoFocus
                    margin="normal"
                    className="enterBody"
                    multiline
                />)
        }
        else if (type === "Link") {
            return (
                < TextField
                    variant="outlined"
                    required
                    id={key}
                    label="Link"
                    autoFocus
                    margin="normal"
                    className="enterBody"
                    multiline />)
        }
        else if (type === "Footer") {
            return (
                < TextField
                    variant="outlined"
                    required
                    id={key}
                    label="Footer"
                    autoFocus
                    margin="normal"
                    className="enterBody"
                    multiline
                />)
        }
    }



    const addItem = () => {
        if (options[selectedIndex] === "Header") {
            set_parts(parts => [...parts, reactCode(index, "Header")])
            setIndex(index + 1)
        }
        else if (options[selectedIndex] === "Paragraph") {
            set_parts(parts => [...parts, reactCode(index, "Paragraph")])
            setIndex(index + 1)
        }
        else if (options[selectedIndex] === "Link") {
            set_parts(parts => [...parts, reactCode(index, "Link")])
            setIndex(index + 1)
        }
        else if (options[selectedIndex] === "Footer") {
            set_parts(parts => [...parts, reactCode(index, "Footer")])
            setIndex(index + 1)
        }
    }

    function printCode() {
        console.log(parts)
    }

    const changeOrderUp = (props) => {
        if (props > 0) {
            const shallow = [...parts]
            const temp1 = parts[props]
            console.log(temp1)
            const temp2 = parts[props - 1]
            console.log(temp2)
            shallow[props] = temp2;
            shallow[props - 1] = temp1;
            set_parts(shallow);
        }
    }
    const changeOrderDown = (props) => {
        const shallow = [...parts]
        const temp1 = parts[props]
        const temp2 = parts[props + 1]
        shallow[props + 1] = temp1;
        shallow[props] = temp1;

        set_parts(shallow)
    }



    return (
        <div className="App">
            <header className="App-header">
            </header>
            <Grid container>
                <Paper className="Paper">
                    {reactCode(0, "Title")}
                    {parts.map((e, i) =>
                        <div>
                            <Grid item >
                                {e}
                                <Button color="primary" size="small" id={i} onClick={e => changeOrderUp(e.currentTarget.id)} >
                                    <ArrowUpwardIcon className="arrows" />
                                </Button>
                                <Button color="primary" size="small"
                                    id={i}
                                    onClick={e => changeOrderDown(e.currentTarget.id)}>
                                    <ArrowDownwardIcon className="arrows" />
                                </Button>
                            </Grid>
                        </div>)}
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
                            <Button
                                onClick={addItem}
                                fullWidth
                                variant="contained"
                                color="primary"
                            >Add component</Button>
                        </Grid>
                        <Grid item>
                            <Button
                                onClick={printCode}
                                fullWidth
                                variant="contained"
                                color="primary">
                                Show react code</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </div >
    );
}