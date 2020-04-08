import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import Hoverable from '../Interface/Hoverable';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%"
    },
    title: {
        width: "100%",
        varient: "h4"
    },
    content: {
    },
    action: {
        textTransform: 'capitalize',
    },
}));

export default function BlogCard(props){
    const classes = useStyles();

    return (
        <Hoverable>{hovering => <div>
            <div className={classes.root}>
                <ExpansionPanel expanded={hovering}>
                    <ExpansionPanelSummary>
                        <Typography className={classes.title}>{props.blog.title} ({props.blog.authors})</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography varient="body2" color={'textSecondary'}>{props.blog.body}</Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        </div>}</Hoverable>
    );
};