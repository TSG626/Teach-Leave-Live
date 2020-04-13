import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router';
import Grid from '@material-ui/core/Grid'
import { Button, Container, Box, } from '@material-ui/core';
import { SaveTwoTone as SaveIcon} from '@material-ui/icons/';
import API from '../../../../modules/API';
import ModuleList from './Editor/ModuleList'
import ModuleEditor from './Editor/ModuleEditor'
import DetailEditor from './Editor/DetailEditor'

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    moduleText: {
        width: 200,
        height: 50
    }
}));

export default function CourseEditor() {
    const classes = useStyles();
    const [course, setCourse] = useState({
        author: [],
        free: false,
        price: 0,
        modules: [],
        published: false,
        title: '',
        description: '',
        subject: '',
    });
    const [selectedModule, setSelectedModule] = useState(0);
    const [selectedSection, setSelectedSection] = useState(0);
    const [increment, setStillIncrement] = useState(true);
    let {id} = useParams();
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        let ignore = false;
        async function fetchData(){
            API.get('/api/course/', {id: id}).then(res => {
                if(res.status === 200){
                    if(res.data.modules.length > 0){
                        setStillIncrement(false);
                    }
                    setCourse(res.data);
                }
            });
        }
        fetchData();
        return () => {ignore = true;}
    }, []);

    //Module functions
    function selectModule(index){
        if(index !== selectedModule){
            setSelectedModule(index);
            setSelectedSection(0);
        }
    }

    function isModuleSelected(moduleIndex){
        return (selectedModule === moduleIndex);
    }

    function addModule(){
        setCourse({...course, 
            modules: [...course.modules, 
                {
                    name: increment ? 'Module ' + (course.modules.length + 1) : 'Untitled Module',
                    sections: []
                }
        ]
        });
        selectModule(course.modules.length);
        selectSection(0);
    }

    function removeModule(index){
        if(increment) setStillIncrement(false);
        if(isModuleSelected(index)) selectModule(0);
        setCourse({...course, 
            modules: [...course.modules].filter((module, i) => i !== index)
        });
    }

    function renameModule(index, name){
        setCourse({...course, 
            modules: [...course.modules].map((module, i) => {
                if(i === index) module.name = name;
                return module;
        })});
    }

    //Section functions
    function selectSection(index){
        if(selectedSection !== index){
            setSelectedSection(index);
        }
    }

    function isSectionSelected(sectionIndex){
        return (selectedSection === sectionIndex);
    }

    function addSection(moduleIndex){
        setCourse({...course, 
            modules: [...course.modules].map((module, i) =>{
                if(i !== moduleIndex) return module;
                return ({...module, 
                    sections: [...module.sections, {
                        name: 'Untitled Section',
                        data: {}
                    }]
                });
            })
        });
        selectModule(moduleIndex);
        selectSection(course.modules[moduleIndex].sections.length);
    }

    function renameSection(moduleIndex, sectionIndex, name){
        setCourse({...course, 
            modules: [...course.modules].map((module, i) =>{
                if(i !== moduleIndex) return module;
                return {...module, 
                    sections: [...module.sections].map((section, i) => {
                        if(i !== sectionIndex) return section;
                        return({...section, name: name})
                    }
                    )};
            })
        });
    }

    function editSection(moduleIndex, sectionIndex, data){
        console.log(data);
        setCourse({...course, 
            modules: [...course.modules].map((module, i) =>{
                if(i !== moduleIndex) return module;
                return {...module, 
                    sections: [...module.sections].map((section, i) => {
                        if(i !== sectionIndex) return section;
                        return({...section, data: data})
                })};
        })});
    }

    function removeSection(moduleIndex, sectionIndex){
        if(increment) setStillIncrement(false);
        if(isSectionSelected(sectionIndex)) selectSection(0);
        setCourse({...course, 
            modules: [...course.modules].map((module, i) =>{
                if(i !== moduleIndex) return module;
                return {...module, 
                    sections: [...module.sections].filter((section, i) => i !== sectionIndex)};
            })
        });
    }

    async function handleSave(){
        setSaving(true);
        console.log(course);
        API.put(`/api/course/${id}`, course).then(res => {
            if(res.status === 200){
                setSaving(false);
            }
        });
    }

    return (
        <Container maxWidth={false} style={{padding:25}}>
            <Box border={1}>
                <div className={classes.root}>
                    <Grid container>
                        <Grid item xs={12} style={{padding: 20}}>
                            <Button startIcon={<SaveIcon/>} onClick={handleSave} color='primary' variant='outlined' size='large'>Save</Button>
                        </Grid>
                        <Grid item xs={12} style={{padding:15}}>
                            <Box>
                                <DetailEditor course={course} setCourse={setCourse}/>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4} style={{padding:15}}>
                            <Box component='div' border={1} overflow='visible'>
                                <ModuleList
                                    course={course}
                                    addModule={addModule}
                                    renameModule={renameModule}
                                    removeModule={removeModule}
                                    isSectionSelected={isSectionSelected}
                                    addSection={addSection}
                                    renameSection={renameSection}
                                    removeSection={removeSection}
                                    isModuleSelected={isModuleSelected}
                                    selectModule={selectModule}
                                    selectSection={selectSection}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={8} style={{padding:15}}>
                            <Box>
                                <ModuleEditor
                                    id={id}
                                    course={course}
                                    setCourse={setCourse}
                                    selectedModule={selectedModule}
                                    selectedSection={selectedSection}
                                    editSection={editSection}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid item container xs={12} style={{padding: 20}} justify='center'>
                            <Button startIcon={<SaveIcon/>} onClick={handleSave} color='primary' variant='outlined' size='large'>Save</Button>
                    </Grid>
                </div>
            </Box>
        </Container>
    );
}
