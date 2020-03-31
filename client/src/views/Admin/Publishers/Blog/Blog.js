import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import API from '../../../../modules/API';
import BlogCard from '../../../../components/Blog/BlogCard';
import { Typography, ListItem, List, Button, CircularProgress, Grid, IconButton, Modal, CardContent, Card, Dialog} from '@material-ui/core';
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

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <Container>
            <CardContent>
              <BlogCreator context={props.context} setAdding={props.setAdding}/>
            </CardContent>
        </Container>
    </Dialog>
  );
}

function BlogRouter({match}) {
    const classes = useStyles();
    const [errors, setErrors] = useState({});
    const [adding, setAdding] = useState(false);

    const handleClickOpen = () => {
      setAdding(true);
    };
  
    const handleClose = () => {
      setAdding(false);
    };

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
                    <Button onClick={handleClickOpen} endIcon={<AddIcon/>} varient={'contained'}>
                      Add Blog
                    </Button>
                    <SimpleDialog open={adding} onClose={handleClose} context={context} setAdding={setAdding} className={classes.courseCreatorWindow}/>
                    {/* <Modal open={adding} onClose={() => setAdding(false)} className={classes.blogCreatorWindow}>
                      <Container>
                        <Card elevation={2}>
                          <CardContent>
                            <BlogCreator context={context} setAdding={setAdding}/>
                          </CardContent>
                        </Card>
                      </Container>
                    </Modal> */}
                  </Grid>
                  <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="flex-start"
                    className={classes.cardList}
                  >
                    {/* {context.blogList && context.blogList.map((blog, index) => {
                      return(
                        <Grid key={index} item container sm className={classes.card}>
                          <BlogCard blog={blog}/>
                        </Grid>
                      )
                    })} */}
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