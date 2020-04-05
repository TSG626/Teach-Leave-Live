import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import { Button, ButtonGroup, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, ExpansionPanelActions } from '@material-ui/core';
import Hoverable from '../Interface/Hoverable';
import { UserContext } from '../../contexts/UserContext';

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
  <UserContext.Consumer>{context => {
    return(
    <Hoverable>{hovering => <div>
        <div className={classes.root}>
            <ExpansionPanel expanded={hovering}>
                <ExpansionPanelSummary>
                    <Typography className={classes.title}>{props.course.title}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography varient="subtitle" color={'textSecondary'}>{props.course.description}</Typography>
                </ExpansionPanelDetails>
                {(context.user.status === 1 || context.user.status === 0) ? 
                    <ExpansionPanelActions>
                        <ButtonGroup fullWidth varient="contained" color="secondary">
                            <Button component={Link} className={classes.action} to={`/Admin/Course/Edit/${props.course._id}`}>Edit Course</Button>
                            <Button component={Link} className={classes.action} to={`/Course/${props.course._id}`}>Course Info</Button>
                        </ButtonGroup>
                    </ExpansionPanelActions>
                : <React.Fragment/>}
            </ExpansionPanel>
        </div>
    </div>}</Hoverable>
    )
  }}</UserContext.Consumer>
  );
};


export default CourseCard;