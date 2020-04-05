import React, {useState, useEffect} from 'react';
import {Grid, Button, Input, Tooltip, Box, ListItemIcon, ListItem, List, ListSubheader, ListItemText, Divider, Collapse} from '@material-ui/core';
import {Add as AddIcon, Edit as EditIcon} from '@material-ui/icons'
import {Delete as DeleteIcon, ExpandMore, ExpandLess, SaveTwoTone as SaveIcon} from '@material-ui/icons/';
import Hoverable from '../../../../../components/Interface/Hoverable'

function Section(props){
    const [name, setName] = useState(props.section.name);

    function handleSubmit(event){
        if(event.key === 'Enter' || event.key === undefined){
            props.renameSection(props.moduleIndex, props.index, name);
        }
    }

    useEffect(()=>{
        setName(props.section.name);
    },[props.section.name])

    return(
        <React.Fragment>
            <Hoverable>{hovering => <div>
                <ListItem button
                    onClick={() => props.selectSection(props.index)}
                    selected={props.isSectionSelected(props.index)}
                    dense
                >
                    <ListItemText inset primary={
                        <Tooltip arrow title='Edit Name'>
                        <Input
                            value={name}
                            onChange={(event)=>{setName(event.target.value)}}
                            onKeyPress={handleSubmit}
                            onBlur={() => props.renameSection(props.moduleIndex, props.index, name)}
                            inputProps={{style: {fontSize: 15}}}
                            autoFocus={props.isSectionSelected(props.index)}
                            disableUnderline={!props.isSectionSelected(props.index)}
                            size='small'
                    /></Tooltip>}/>
                    <Box visibility={hovering ? 'visible' : 'hidden'}>
                        <ListItemIcon>
                            <Tooltip arrow title='Delete Section'>
                                <DeleteIcon onClick={() => props.removeSection(props.moduleIndex, props.index)} />
                            </Tooltip>
                        </ListItemIcon>
                    </Box>
                </ListItem>
            </div>}</Hoverable>
        </React.Fragment>
    )
}

function SectionList(props){
    return(
        <React.Fragment>
            <List component="div" disablePadding>
                {props.module.sections.map((section, index) => {
                    return(
                        <React.Fragment key={index}>
                            <Section
                                section={section}
                                moduleIndex={props.moduleIndex}
                                removeSection={props.removeSection}
                                renameSection={props.renameSection}
                                isSectionSelected={props.isSectionSelected}
                                selectSection={props.selectSection}
                                index={index}
                            />
                            <Divider/>
                        </React.Fragment>
                    )
                })}
            </List>
        </React.Fragment>
    )
}

function Module(props){
    const [name, setName] = useState('');

    function handleSubmit(event){
        if(event.key === 'Enter' || event.key === undefined){
            props.renameModule(props.index, name);
        }
    }

    useEffect(() => {
        setName(props.module.name);
    }, [props.module])

    return(
        <React.Fragment>
            <Hoverable>{hovering => <div>
                <ListItem button
                    onClick={() => props.selectModule(props.index)}
                    selected={props.isModuleSelected(props.index)}
                    dense
                >
                    <ListItemText primary={
                        <Tooltip arrow title='Edit Name'>
                        <Input
                            value={name}
                            onChange={(event)=>{setName(event.target.value)}}
                            onKeyPress={handleSubmit}
                            onFocus={() => props.selectModule(props.index)}
                            onBlur={() => props.renameModule(props.index, name)}
                            inputProps={{style: {fontSize: 15, }}}
                            // autoFocus={props.isModuleSelected(props.index)}
                            disableUnderline={!props.isModuleSelected(props.index)}
                            size='small'
                    /></Tooltip>}/>
                    <Box visibility={hovering ? 'visible' : 'hidden'}>
                        <ListItemIcon>
                            <Tooltip arrow title='Add Section'>
                                <AddIcon onClick={() => {props.addSection(props.index)}}/>
                            </Tooltip>
                        </ListItemIcon>
                        <ListItemIcon>
                            <Tooltip arrow title='Delete Module'>
                                <DeleteIcon onClick={() => props.removeModule(props.index)} />
                            </Tooltip>
                        </ListItemIcon>
                    </Box>
                </ListItem>
            </div>}</Hoverable>
            <Collapse in={props.isModuleSelected(props.index)} timeout="auto" unmountOnExit>
                <SectionList
                    module={props.module}
                    moduleIndex={props.index}
                    increment={props.increment}
                    removeSection={props.removeSection}
                    renameSection={props.renameSection}
                    isSectionSelected={props.isSectionSelected}
                    selectSection={props.selectSection}
                />
            </Collapse>
        </React.Fragment>
    )
}

function ModuleList(props){
    return(
        <Grid container
            direction='column'
            justify='flex-start'
            style={{padding: 10}}
        >
            <List component="nav"
                subheader={
                    <ListSubheader component="div">
                        Modules
                    </ListSubheader>
            }>
                {props.course.modules.map((module, index) => {
                    return(
                        <React.Fragment key={index}>
                            <Module
                                index={index}
                                module={module}
                                addSection={props.addSection}
                                selectSection={props.selectSection}
                                isSectionSelected={props.isSectionSelected}
                                renameSection={props.renameSection}
                                removeSection={props.removeSection}
                                removeModule={props.removeModule}
                                renameModule={props.renameModule}
                                selectModule={props.selectModule}
                                isModuleSelected={props.isModuleSelected}
                                deselectModule={props.deselectModule}
                            />
                            <Divider/>
                        </React.Fragment>
                    )})
                }
            </List>
            <Grid item xs={12}>
                <Button onClick={props.addModule} startIcon={<AddIcon/>} variant='outlined' color='primary'>
                    Add Module
                </Button>
            </Grid>
        </Grid>
    )
}

export default ModuleList;