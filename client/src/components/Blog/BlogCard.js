import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import { Button, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Box, ButtonGroup } from '@material-ui/core';
import Hoverable from '../Interface/Hoverable';
import { UserContext } from '../../contexts/UserContext';

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
    const userInfo = useContext(UserContext);
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
                                {((userInfo.user.status === 0) || (userInfo.user.status === 1)) ? <Button blog={props.blog} component={Link} className={classes.action} to={`/Admin/Blog/Edit/${props.blog._id}`}>Edit Blog</Button> : <div></div>}
                            </ButtonGroup>
                        </ExpansionPanelDetails> */}
                    </ExpansionPanel>
                </Box>
                
            </div>
        </div>}</Hoverable>
    );
};