import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import EditIcon from '@material-ui/icons/Edit';
import { Button, ButtonGroup, CssBaseline, Divider, Grid, CardActionArea, Collapse, CardHeader, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, ExpansionPanelActions } from '@material-ui/core';
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