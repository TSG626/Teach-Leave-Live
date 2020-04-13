import React, { useEffect, useState } from 'react';
import { Grid, Typography, Stepper, Step, StepLabel, StepContent, Button, makeStyles, Paper } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import API from '../../../modules/API';
import EJSContentViewer from '../../../components/Interface/EJSContentViewer';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    actionsContainer: {
      marginBottom: theme.spacing(2),
    },
    resetContainer: {
      padding: theme.spacing(3),
    },
  }));

function CourseViewer(props){
    const classes = useStyles();
    let {id} = useParams();
    const [course, setCourse] = useState({});
    const [error, setError] = useState({});

    useEffect(()=>{
        async function fetchData(){
            console.log(id);
            API.get(`/api/course/`, {id: id}).then((res)=>{
                console.log(res);
                if(res.status === 200){
                    setCourse(res.data);
                }else{
                    setError(res.data);
                }
            });
        }
        fetchData();
    },[])

    const [activeStep, setActiveStep] = useState({module: 0, section: 0});
  
    const handleNext = () => {
        if(activeStep.section === course.modules[activeStep.module].sections.length){
            setActiveStep({module: activeStep.module + 1, section: 0});
        }else{
            setActiveStep({...activeStep, section: activeStep.section + 1});
        }
        console.log(activeStep);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleReset = () => {
      setActiveStep(0);
    };

    return(
        <React.Fragment>
            {Object.keys(course).length > 0 ? 
                <Grid>
                    <Typography>{course.title}</Typography>
                    <div className={classes.root}>
                    <Stepper activeStep={activeStep.module} orientation="vertical">
                        {course.modules.map((module, i) => (
                        <Step key={i}>
                            <StepLabel>{module.name}</StepLabel>
                            <StepContent>
                                <Stepper activeStep={activeStep.section} orientation="vertical">
                                {course.modules[i].sections.map((section, j) => (
                                    <Step key={j}>
                                        <StepLabel>{section.name}</StepLabel>
                                        <StepContent>
                                            <EJSContentViewer data={course.modules[i].sections[j].data}/>
                                            <div className={classes.actionsContainer}>
                                                <div>
                                                <Button
                                                    disabled={activeStep.section === 0}
                                                    onClick={handleBack}
                                                    className={classes.button}
                                                >
                                                    Back
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={handleNext}
                                                    className={classes.button}
                                                >
                                                    {activeStep.module === course.modules.length - 1 ? 'Finish' : 'Next'}
                                                </Button>
                                                </div>
                                            </div>
                                        </StepContent>
                                    </Step>
                                ))}
                                </Stepper>
                                {activeStep.section === course.modules[i].sections.length && (
                                    <Paper square elevation={0} className={classes.resetContainer}>
                                        <Typography>All sections finished! Time to move on to the next module!</Typography>
                                        <Button onClick={handleNext} className={classes.button}>
                                            Next Module!
                                        </Button>
                                    </Paper>
                                )}
                            </StepContent>
                        </Step>
                        ))}
                    </Stepper>
                    {activeStep.module === course.modules.length && (
                        <Paper square elevation={0} className={classes.resetContainer}>
                        <Typography>All modules completed!</Typography>
                        <Button onClick={handleReset} className={classes.button}>
                            Reset
                        </Button>
                        </Paper>
                    )}
                    </div>
                </Grid> 
            :
                <Typography>Cannot display course ID: {id}</Typography>
            }
        </React.Fragment>
    );
}

export default CourseViewer;