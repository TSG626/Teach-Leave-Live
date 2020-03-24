import React, {useState} from 'react';
import './Course.css';
import {UserContext} from '../../contexts/UserContext';
import {Redirect} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';    //Baseline of look for entire page
import TextField from '@material-ui/core/TextField';

export default function Course() {
    const[courses] = useState("No courses listed!");
    return(
    <UserContext.Consumer>{context => {
        if(context.isAuthenticated()) {
            return (      
                <CssBaseline>
                    <div className="App">
                        <header className="App-header">
                            <TextField
                            variant="outlined"
                            margin="normal"
                            style={{width: 1000}}
                            id="search"
                            label="Search"
                            name="search"
                            autoComplete="search"
                            />
                            {courses}
                        </header>
                    </div>
                </CssBaseline>);
        }
        else {
            return(
                <Redirect to="/User/Login"/>
            );
        }
    }}</UserContext.Consumer>
    );
}