import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Button, ButtonGroup, CssBaseline, Divider, Grid, CardActionArea, Collapse, IconButton, CircularProgress, Box, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary } from '@material-ui/core';
import Hoverable from '../Interface/Hoverable';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import CourseCard from './CourseCard';
import API from '../../modules/API';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%"
    },
    title: {
    },
    menu: {
        // backgroundColor: theme.palette.background.paper,
    },
    content: {
    },
    card: {
        paddingBottom: theme.spacing(2)
    },
    cardList: {
        padding: theme.spacing(2,2,0,2)
    }
}));

const SubjectCard = (props) => {
    const [courses, setCourses] = useState({})
    const classes = useStyles();
    
    useEffect(()=>{
        API.get('/api/course/', {subject: props.subject}).then(res => {
            if(res.status == 200){
                setCourses(res.data);
            }
        }).catch((err) => {
            console.log(err);
        });
    },[])

    return (
        <div className={classes.root}>
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography className={classes.title}>{props.subject}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid container direction={'column'} alignContent='stretch'>
                        {courses.length && courses.map((course, index) => {
                            return(
                                <div className={classes.card}>
                                    <CourseCard course={course}/>
                                </div>
                            )
                        })}
                    </Grid>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
};


export default SubjectCard;