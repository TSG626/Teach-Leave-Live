import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Box } from '@material-ui/core';
import Hoverable from '../Interface/Hoverable';

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
                <Box >
                    <ExpansionPanel expanded={hovering}>
                        <ExpansionPanelSummary>
                            <Typography className={classes.title}>{props.blog.title} (By {props.blog.authors})</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            {props.blog.body}
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </Box>
                
            </div>
        </div>}</Hoverable>
    );
};