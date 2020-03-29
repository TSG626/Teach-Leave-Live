// import React, {useState, useEffect, useRef} from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import { useParams } from 'react-router';
// import Grid from '@material-ui/core/Grid'
// import { Typography, Button, TextField, Input, Container, Tooltip, Box, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, ListItemIcon, ListItem, List, ListSubheader, ListItemText, Divider, Collapse, Link} from '@material-ui/core';
// import AddIcon from '@material-ui/icons/Add';
// import EditIcon from '@material-ui/icons/Edit';
// import {Delete as DeleteIcon, ExpandMore, ExpandLess, SaveTwoTone as SaveIcon} from '@material-ui/icons/';
// import Hoverable from '../../../../components/Interface/Hoverable'
// import API from '../../../../modules/API';
// import EditorJs from 'react-editor-js';
// import {COURSE_TOOLS} from '../../../../config/tools'

// const useStyles = makeStyles(theme => ({
//     root: {
//       flexGrow: 1,
//     },
//     moduleText: {
//         width: 200,
//         height: 50
        
//     }
// }));

// function DetailEditor(props){
//     return(
//         <ExpansionPanel>
//             <Tooltip title='Click to edit course details'>
//             <ExpansionPanelSummary
//                 expandIcon={<ExpandMore/>}
//             >
//                     <Typography variant='h3'>{props.course.title}</Typography>
//             </ExpansionPanelSummary>
//             </Tooltip>
//             <ExpansionPanelDetails>
//                 <Grid container>
//                     <Grid item>
//                         <TextField
//                             variant="outlined"
//                             margin="normal"
//                             required
//                             fullWidth
//                             id="title"
//                             label="Course Title"
//                             name="title"
//                             autoFocus
//                         />
//                     </Grid>
//                     <Grid item>
//                         <TextField
//                             variant="outlined"
//                             margin="normal"
//                             fullWidth
//                             multiline
//                             id="description"
//                             label="Description"
//                             name="description"
//                         />
//                     </Grid>
//                     <Grid item>
//                     </Grid>
//                     <Grid item>
//                     </Grid>
//                     <Grid item>
//                     </Grid>
//                 </Grid>
//             </ExpansionPanelDetails>
//         </ExpansionPanel>
//     )
// }

// function ModuleEditor(props){
//     // if(props.course.modules == undefined || props.course.modules.length == 0) return(<React.Fragment/>)
//     // if(props.selectedModule == 0 || props.selectedSection == 0) return('No sections');
//     return(
//         <Grid container>
//             <Grid item xs={12}>
//                 <Typography>Module Editor</Typography>
//             </Grid>
//             <Grid item xs={12}>
//                     {/* <Breadcrumbs aria-label="breadcrumb">
//                         <Link color="inherit" href="/" onClick={(e)=>{e.preventDefault()}}>
//                             {props.course.title}
//                         </Link>
//                         <Link color="inherit" href="/" onClick={(e)=>{e.preventDefault()}}>
//                             {JSON.stringify(props.course.modules[props.selectedModule])}
//                         </Link>
//                         <Typography color="textPrimary">{props.course.modules[props.selectedModule]}</Typography>
//                     </Breadcrumbs> */}
//                     <EditorJs 
//                         // data={} 
//                         tools={{ 
//                             // linkTool: { 
//                             //     class: LinkTool, 
//                             //     config: { endpoint: 'http://localhost:5000/api/course/' + props.id}
//                             // },
//                             ...COURSE_TOOLS
//                             }}
//                     />
//             </Grid>
//         </Grid>
//     )
// }

// function Section(props){
//     const [name, setName] = useState(props.section.name);

//     function handleSubmit(event){
//         if(event.key === 'Enter' || event.key === undefined){
//             props.renameSection(props.moduleIndex, props.index, name);
//         }
//     }

//     useEffect(()=>{
//         setName(props.section.name);      
//     },[props.section.name])

//     return(
//         <React.Fragment>
//             <Hoverable>{hovering => <div>
//                 <ListItem button
//                     onClick={() => props.selectSection(props.index)}
//                     selected={props.isSectionSelected(props.index)}
//                     dense
//                 >
//                     <ListItemText inset primary={
//                         <Tooltip arrow title='Edit Name'>
//                         <Input
//                             value={name}
//                             onChange={(event)=>{setName(event.target.value)}}
//                             onKeyPress={handleSubmit}
//                             onBlur={() => props.renameSection(props.moduleIndex, props.index, name)}
//                             inputProps={{style: {fontSize: 15}}}
//                             autoFocus
//                             disableUnderline={!props.isSectionSelected(props.index)}
//                             size='small'
//                     /></Tooltip>}/>
//                     <Box visibility={hovering ? 'visible' : 'hidden'}>
//                         <ListItemIcon>
//                             <Tooltip arrow title='Edit Section'>
//                                 <EditIcon onClick={() => { 
//                                     props.selectSection(props.index) 
//                                 }}/>
//                             </Tooltip>
//                         </ListItemIcon>
//                         <ListItemIcon>
//                             <Tooltip arrow title='Delete Section'>
//                                 <DeleteIcon onClick={() => props.removeSection(props.moduleIndex, props.index)} />
//                             </Tooltip>
//                         </ListItemIcon>
//                     </Box>
//                 </ListItem>
//             </div>}</Hoverable>
//         </React.Fragment>
//     )
// }

// function SectionList(props){
//     return(
//         <React.Fragment>
//             <List component="div" disablePadding>
//                 {props.module.sections.map((section, index) => {
//                     return(
//                         <React.Fragment key={index}>
//                             <Section
//                                 section={section}
//                                 moduleIndex={props.moduleIndex}
//                                 removeSection={props.removeSection}
//                                 renameSection={props.renameSection}
//                                 isSectionSelected={props.isSectionSelected}
//                                 selectSection={props.selectSection}
//                                 index={index}
//                             />
//                             <Divider/>
//                         </React.Fragment>
//                     )
//                 })}
//             </List>
//         </React.Fragment>
//     )
// }

// function Module(props){
//     const [name, setName] = useState('');
//     const [open, setOpen] = useState(false);

//     function handleSubmit(event){
//         if(event.key === 'Enter' || event.key === undefined){
//             props.renameModule(props.index, name);
//             props.selectModule(0);
//         }
//     }

//     useEffect(() => {
//         setOpen(props.isModuleSelected(props.index));
//     }, [props.selectedModule])

//     useEffect(() => {
//         setName(props.module.name);
//     }, [props.module.name])

//     return(
//         <React.Fragment>
//             <Hoverable>{hovering => <div>
//                 <ListItem button
//                     onClick={() => props.selectModule(props.index)}
//                     selected={props.isModuleSelected(props.index)}
//                     dense
//                 >
//                     <ListItemText primary={
//                         <Tooltip arrow title='Edit Name'>
//                         <Input
//                             value={name}
//                             onChange={(event)=>{setName(event.target.value)}}
//                             onKeyPress={handleSubmit}
//                             onBlur={() => props.renameModule(props.index, name)}
//                             onFocus={() => props.selectModule(props.index)}
//                             inputProps={{style: {fontSize: 15, }}}
//                             autoFocus
//                             disableUnderline={!props.isModuleSelected(props.index)}
//                             size='small'
//                     /></Tooltip>}/>
//                     <Box visibility={hovering ? 'visible' : 'hidden'}>
//                         <ListItemIcon>
//                             <Tooltip arrow title='Add Section'>
//                                 <AddIcon onClick={() => { 
//                                     props.selectModule(props.index)
//                                     props.addSection(props.index, props.increment)
//                                 }}/>
//                             </Tooltip>
//                         </ListItemIcon>
//                         <ListItemIcon>
//                             <Tooltip arrow title='Delete Module'>
//                                 <DeleteIcon onClick={() => props.removeModule(props.index)} />
//                             </Tooltip>
//                         </ListItemIcon>
//                     </Box>
//                     <Box visibility={props.module.sections.length > 0 ? 'visible' : 'hidden'} onClick={() => setOpen(!open)}>
//                         {open && props.isModuleSelected(props.index) ? <ExpandLess/> : <ExpandMore/>}
//                     </Box>
//                 </ListItem>
//             </div>}</Hoverable>
//             <Collapse in={open && props.isModuleSelected(props.index)} timeout="auto" unmountOnExit>
//                     <SectionList
//                         module={props.module}
//                         moduleIndex={props.index}
//                         increment={props.increment}
//                         removeSection={props.removeSection} 
//                         renameSection={props.renameSection}
//                         isSectionSelected={props.isSectionSelected}
//                         selectSection={props.selectSection}
//                     />
//             </Collapse>
//         </React.Fragment>
//     )
// }

// function ModuleList(props){
//     return(
//         <Grid container
//             direction='column'
//             justify='flex-start'
//             style={{padding: 10}}
//         >
//             <List component="nav"
//                 subheader={
//                     <ListSubheader component="div">
//                         Modules
//                     </ListSubheader>
//             }>
//                 {props.course.modules.map((module, index) => {
//                     return(
//                         <React.Fragment key={index}>
//                             <Module 
//                                 index={index}
//                                 module={module}
//                                 addSection={props.addSection}
//                                 selectSection={props.selectSection}
//                                 isSectionSelected={props.isSectionSelected}
//                                 renameSection={props.renameSection}
//                                 removeSection={props.removeSection}
//                                 removeModule={props.removeModule}
//                                 renameModule={props.renameModule}
//                                 selectModule={props.selectModule}
//                                 isModuleSelected={props.isModuleSelected}
//                                 deselectModule={props.deselectModule}
//                             />
//                             <Divider/>
//                         </React.Fragment>
//                     )})
//                 }
//             </List>
//             <Grid item xs={12}>
//                 <Button onClick={props.addModule} startIcon={<AddIcon/>} variant='outlined' color='primary'>
//                     Add Module
//                 </Button>
//             </Grid>
//         </Grid>
//     )
// }

// export default function CourseList() {
//     const classes = useStyles();
//     const [course, setCourse] = useState({
//         author: [],
//         free: false,
//         price: 0,
//         modules: [],
//         published: false,
//         title: '',
//         description: '',
//     });
//     const [selectedModule, setSelectedModule] = useState(0); 
//     const [selectedSection, setSelectedSection] = useState(0); 
//     const [selected, setSelected] = useState(0); 
//     const [increment, setStillIncrement] = useState(true);
//     let {id} = useParams();

//     useEffect(() => {
//         let ignore = false;
//         async function fetchData(){
//             API.get(`/api/course/`, {id: id}).then(res => {
//                 console.log(res);
//                 if(res.status === 200){
//                     setCourse(res.data);
//                 }
//             });   
//         }
//         fetchData();
//         return () => {ignore = true;}
//     }, []);

//     //Module functions
//     function selectModule(index){
//         setSelectedModule(index + 1)
//     }
//     function isModuleSelected(moduleIndex){
//         return (selectedModule === moduleIndex + 1);
//     }
//     function addModule(){
//         setCourse({...course, modules: [...course.modules, {
//             name: increment ? 'Module ' + (course.modules.length + 1) : 'Untitled Module',
//             sections: []
//         }]});
//         selectModule(course.modules.length);
//     }
//     function removeModule(index){
//         if(increment) setStillIncrement(false);
//         if(isModuleSelected(index)) selectModule(0);
//         setCourse({...course, modules: [...course.modules].filter((module, i) => i !== index)});
//     }
//     function renameModule(index, name){
//         setCourse({...course, modules: [...course.modules].map((module, i) =>{
//             if(i === index) module.name = name;
//             return module;
//         })});
//     }
//     //Section functions
//     function selectSection(index){
//         setSelectedSection(index + 1);
//     }
//     function isSectionSelected(sectionIndex){
//         return (selectedSection === sectionIndex + 1);
//     }
//     function addSection(moduleIndex){
//         selectModule(moduleIndex);
//         setCourse({...course, modules: [...course.modules].map((module, i) =>{
//             if(i !== moduleIndex) return module;
//             return ({...module, sections: [...module.sections, {
//                 name: 'Untitled Section',
//                 data: {}
//             }]});
//         })});
//     }
//     function renameSection(moduleIndex, sectionIndex, name){
//         setCourse({...course, modules: [...course.modules].map((module, i) =>{
//             if(i !== moduleIndex) return module;
//             return {...module, sections: [...module.sections].map((section, i) => {
//                 if(i !== sectionIndex) return section;
//                 return({...section, name: name})
//             })};
//         })});
//     }
//     function removeSection(moduleIndex, sectionIndex){
//         if(increment) setStillIncrement(false);
//         if(isSectionSelected(sectionIndex)) selectSection(0);
//         setCourse({...course, modules: [...course.modules].map((module, i) =>{
//             if(i !== moduleIndex) return module;
//             return {...module, sections: [...module.sections].filter((section, i) => i !== sectionIndex)};
//         })});
//     }

//     return (
//         <Grid container>
//             <Grid item>
//                 <ListItem button 
//                     selected={selected === index + 1}
//                     onClick={()=>setSelected(index + 1)}
//                     component={Link} 
//                     to={`/Admin/Course/Edit/${course._id}`}
//                 >
//                     <ListItemText inset>
//                         {course.title}
//                     </ListItemText>
//                 </ListItem>
//                 {selected == index + 1 && 
//                     <ModuleList 
//                         course={course}
//                         addModule={addModule}
//                         renameModule={renameModule}
//                         removeModule={removeModule}
//                         isSectionSelected={isSectionSelected}
//                         addSection={addSection}
//                         renameSection={renameSection}
//                         removeSection={removeSection}
//                         isModuleSelected={isModuleSelected}
//                         selectModule={selectModule}
//                         selectSection={selectSection}
//                     />
//                 }
//             </Grid>
//         </Grid>
//     );
// }