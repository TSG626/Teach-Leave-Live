import React, {useState, useEffect, useRef} from 'react';
import './CoursePublisher.css';
import { makeStyles } from '@material-ui/core/styles';
import {UserContext} from '../../../../contexts/UserContext';
import { Route, useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid'
import { Typography, Button, TextField, InputBase } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Zoom from '@material-ui/core/Zoom'

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    moduleText: {
        width: 200,
        height: 50
        
    }
}));

function DetailEditor(){
    return('')
}

function ModuleEditor(props){
    return('')
}

const Module = (props) => {
    const classes = useStyles();
    const [name, setName] = useState(props.module.name);
    const [hovering, setHovering] = useState(false);

    function handleSubmit(event){
        if(event.key === 'Enter' || event.key == undefined){
            props.renameModule(props.index, name);
            props.setSelected(0);
        }
    }

    useEffect(()=>{
        setName(props.module.name);        
    },[props.module.name])

    return(
        <Grid 
            item 
            container 
            spacing={2}
            direction="row"
            justify="center"
            // alignItems="center"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
        >
            <Grid 
                item 
                onClick={() => props.setSelected(props.index + 1)}
            >
                <div className={classes.moduleText}>
                    {(props.selectedIndex == props.index + 1)
                    ?   <InputBase
                            value={name}
                            onChange={(event)=>{setName(event.target.value)}}
                            onKeyPress={handleSubmit}
                            onBlur={handleSubmit}
                            inputProps={{style: {fontSize: 15, justifyContent: 'center'}}}
                            autoFocus={true}
                            className={classes.moduleText}
                    />: <Typography fontSize={15}>
                            {name}
                        </Typography>}
                </div>
            </Grid>
            <Grid item>
                <Zoom in={hovering}>
                    <Button
                        variant='outlined'
                        onClick={() => props.removeModule(props.index)}
                    >
                        <DeleteIcon/>
                    </Button>
                </Zoom>
                <Zoom in={hovering} style={{ transitionDelay: hovering ? '100ms' : '0ms' }}>
                <Button
                        variant='outlined'
                        onClick={() => props.removeModule(props.index)}
                    >
                        <EditIcon/>
                    </Button>
                </Zoom>
            </Grid>
        </Grid>
    )
}

function ModuleList(){
    const [modules, setModules] = useState([]);
    const [selectedIndex, setSelected] = useState(0)

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
        console.log(modules);
    }

    function renameModule(index, name){
        const newModules = modules.map((module, i) =>{
            if(i == index) module.name = name;
            return module;
        })
        setModules(newModules);
        console.log(modules);
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
                        selectedIndex={selectedIndex}
                        setSelected={setSelected}
                        module={module}
                        key={index} 
                        index={index} 
                        removeModule={removeModule}
                        renameModule={renameModule}
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