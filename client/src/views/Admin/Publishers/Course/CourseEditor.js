import React, {useState} from 'react';
import './CoursePublisher.css';
import { makeStyles } from '@material-ui/core/styles';
import {UserContext} from '../../../../contexts/UserContext';
import { Route, useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid'
import { Typography, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
}));

function DetailEditor(){
    return('')
}

function ModuleEditor(){
    return('')
}

function Module(props){
    return(
        <Grid 
            item 
            container
            spacing={2}
        >
            <Grid item>
                <Typography>
                    {props.module.name}
                </Typography>
            </Grid>
            <Grid item>
                <Button
                    variant='outlined'
                    onClick={() => props.removeModule(props.index)}
                >
                    <DeleteIcon/>
                </Button>
            </Grid>
        </Grid>
    )
}

function ModuleList(){
    const [modules, setModules] = useState([]);

    function addModule(){
        setModules(modules.concat({
            name: 'Module ' + (modules.length + 1),
        }));
    }
    function removeModule(index){
        const newModules = modules.filter((module, i) => {
            if(i !== index) return(module);
        })
        setModules(newModules);
    }

    function moveModule(oldIndex, newIndex){

    }

    return(
        <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="stretch"
            spacing={1}
        >
            <Grid item>
                <Typography>Modules</Typography>
            </Grid>
            {modules.map((module, index) => {
                return(
                    <Module 
                        module={module} 
                        key={index} 
                        index={index} 
                        removeModule={removeModule}
                    />
                )
            })}
            <Grid item>
                <Button onClick={addModule}>
                    <AddIcon/>
                </Button>
            </Grid>
        </Grid>
    )
}

export default function CourseEditor() {
    const classes = useStyles();

    let {id} = useParams();
    return (
        <UserContext.Consumer>{(context) => {
            return(
                <div className={classes.root}>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="flex-start"
                    spacing={3}
                >
                    <Grid item xs={12}>
                        <DetailEditor/>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <ModuleList/>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <ModuleEditor/>
                    </Grid>
                </Grid>
                </div>
            )}}
        </UserContext.Consumer>
    );
}