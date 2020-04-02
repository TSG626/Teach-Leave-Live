import React, {useState, useEffect} from 'react';
import EditorJs from 'react-editor-js';
import {COURSE_TOOLS} from '../../../../../config/tools'
import { Grid, Typography, Button } from '@material-ui/core';


function ModuleEditor(props){
    const [editorInstance, setEditorInstance] = useState(null);
    const [display, setDisplay] = useState(false)

    async function handleSave(){
        const saveData = await editorInstance.save();
        props.editSection(props.selectedModule, props.selectedSection, saveData);
    }

    useEffect(()=>{
        if(props.course.modules.length > 0 && props.course.modules[props.selectedModule].sections.length > 0){
            setDisplay(true);
        }else{
            setDisplay(false);
        }
    },[props.course])

    useEffect(()=>{
        if(display && editorInstance){
            if(!props.course.modules[props.selectedModule].sections[props.selectedSection] || 
                !props.course.modules[props.selectedModule].sections[props.selectedSection].data ||
                Object.keys(props.course.modules[props.selectedModule].sections[props.selectedSection].data).length == 0){
                editorInstance.clear();
            }else{
                editorInstance.render(props.course.modules[props.selectedModule].sections[props.selectedSection].data);
            }
        }
    },[props.selectedSection])

    if(props.course.modules.length == 0 || props.course.modules[props.selectedModule].sections.length == 0) return('No sections');
        
    return(
        <Grid container>
            <Grid item xs={12}>
                <Typography>Module Editor</Typography>
            </Grid>
            <Grid item xs={12}>
                {display ? 
                    <EditorJs
                        data={props.course.modules[props.selectedModule].sections[props.selectedSection].data}
                        instanceRef={instance => setEditorInstance(instance)}
                        tools={{
                            ...COURSE_TOOLS
                        }}
                    />
                    : 'Wow'
                }
                <Button onClick={handleSave}>Save</Button>
            </Grid>
        </Grid>
    )
}

export default ModuleEditor;