import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import { Button, ButtonGroup, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, ExpansionPanelActions } from '@material-ui/core';
import Hoverable from '../Interface/Hoverable';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%"
    },
    title: {
    },
    content: {
    },
    action: {
        textTransform: 'capitalize',
    },
}));

const CourseCard = (props) => {
  const classes = useStyles();

  return (
    <Hoverable>{hovering => <div>
        <div className={classes.root}>
            <ExpansionPanel expanded={hovering}>
                <ExpansionPanelSummary>
                    <Typography className={classes.title}>{props.course.title}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography varient="subtitle" color={'textSecondary'}>{props.course.description}</Typography>
                </ExpansionPanelDetails>
                <ExpansionPanelActions>
                    <ButtonGroup fullWidth varient="contained" color="secondary">
                        <Button component={Link} className={classes.action} to={`/Admin/Course/Edit/${props.course._id}`}>Edit Course</Button>
                        <Button component={Link} className={classes.action} to={`/Admin/Course/View/${props.course._id}`}>Course Info</Button>
                    </ButtonGroup>
                </ExpansionPanelActions>
            </ExpansionPanel>
        </div>
    </div>}</Hoverable>
  );
};


export default CourseCard;