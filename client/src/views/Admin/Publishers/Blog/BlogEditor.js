import React, {useState, useEffect, useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router';
import Grid from '@material-ui/core/Grid'
import { Typography, Button, TextField, Input, Container, Tooltip, Box, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, ListItemIcon, ListItem, List, ListSubheader, ListItemText, Divider, Collapse} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import {Delete as DeleteIcon, ExpandMore, ExpandLess, SaveTwoTone as SaveIcon} from '@material-ui/icons/';
import Hoverable from '../../../../components/Interface/Hoverable'
import API from '../../../../modules/API';
import EditorJs from 'react-editor-js';
import {COURSE_TOOLS} from '../../../../config/tools'

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    moduleText: {
        width: 200,
        height: 50
    }
}));

export default function BlogEditor() {
    const classes = useStyles();
    const [blog, setBlog] = useState({
        author: [],
        modules: [],
        published: false,
        title: '',
        description: '',
    });
    let {id} = useParams();


    useEffect(() => {
        async function fetchData(){
            API.get('/api/blog/', {id: id}).then(res => {
                console.log(res);
                if(res.status === 200){
                    setBlog(res.data);
                }
            });
        }
        fetchData();
    }, []);

    return (
        <Container maxWidth={false} style={{padding:25}}>
            <Box border={1}>
                <div className={classes.root}>
                    <Grid container>
                        <Grid item xs={12} style={{padding: 20}}>
                            <Button startIcon={<SaveIcon/>} color='primary' variant='outlined' size='large'>Save</Button>
                        </Grid>
                        <Grid item xs={12} style={{padding:15}}>
                            <Box>
                                {/* <DetailEditor course={course} setCourse={setCourse}/> */}
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid item container xs={12} style={{padding: 20}} justify='center'>
                            <Button startIcon={<SaveIcon/>} color='primary' variant='outlined' size='large'>Save</Button>
                    </Grid>
                </div>
            </Box>
        </Container>
    );
}
