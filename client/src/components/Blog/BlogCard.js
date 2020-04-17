import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import { Button, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Box, ButtonGroup } from '@material-ui/core';
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
                        {/* <ExpansionPanelDetails>
                            <ButtonGroup>
                                <Button component={Link} className={classes.action} to={`/Admin/Blog/Edit/${props.blog._id}`}>Edit Course</Button>
                            </ButtonGroup>
                        </ExpansionPanelDetails> */}
                    </ExpansionPanel>
                </Box>
                
            </div>
        </div>}</Hoverable>
    );
};