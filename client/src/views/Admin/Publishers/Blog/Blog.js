import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import API from '../../../../modules/API';
import BlogCard from '../../../../components/Blog/BlogCard';
import { Typography, ListItem, List, Button, CircularProgress, Grid, IconButton, Modal, CardContent, Card} from '@material-ui/core';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import BlogCreator from './BlogCreator';
import BlogEditor from './BlogEditor';
import {Add as AddIcon, Edit as EditIcon, Close} from '@material-ui/icons/';
import { BlogContext } from '../../../../contexts/Admin/BlogContext';

const useStyles = makeStyles(theme => ({
  title: {
    padding: theme.spacing(2,2),
    alignText: "center"
  },
  card: {
    padding: theme.spacing(1,1)
  },
  cardList: {
    padding: theme.spacing(1, 1),
    backgroundColor: 'grey'
  },
  blogCreatorWindow: {
    padding: theme.spacing(4, 2),
  },
}));

function BlogRouter({match}) {
    const classes = useStyles();
    const [errors, setErrors] = useState({});
    const [adding, setAdding] = useState(false);

    function handleAddBlog(event){
      setAdding(true);
    }

    return (
    <BlogContext.Consumer>{context=>{
      return(
        <Switch>
            {/* //Main router function */}
            <Route exact path={`${match.path}/`} component={function(){
              return(
                <Container component="main" maxWidth={false}>
                  <Grid container alignContent={'center'} justify={'space-between'}>
                    <Typography className={classes.title}>
                      Blog
                    </Typography>
                    <Button onClick={handleAddBlog} endIcon={<AddIcon/>} varient={'contained'}>
                      Add Blog
                    </Button>
                    <Modal open={adding} onClose={() => setAdding(false)} className={classes.blogCreatorWindow}>
                      <Container>
                        <Card elevation={2}>
                          <CardContent>
                            <BlogCreator context={context} setAdding={setAdding}/>
                          </CardContent>
                        </Card>
                      </Container>
                    </Modal>
                  </Grid>
                  
                </Container>
                )
            }}/>
            <Route exact path={`${match.path}/Edit/:id`} component={BlogEditor}/>
        </Switch>
      )
    }}</BlogContext.Consumer>
  );
}

export default BlogRouter;