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
    const [blogList, setBlogList] = useState([]);
    const classes = useStyles();
    const [errors, setErrors] = useState({});
    const [adding, setAdding] = useState(false);

    useEffect(() => {
      async function fetchData(){
          API.get('/api/blog/').then(res => {
              if(res.status == 200){
                  setBlogList(res.data);
              }
          });
      }
      fetchData();
    }, []);

    function handleAddBlog(event){
      setAdding(true);
    }

    return (
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
                          <BlogCreator setAdding={setAdding}/>
                        </CardContent>
                      </Card>
                    </Container>
                  </Modal>
                </Grid>
                <Grid
                  container
                  direction="column"
                  justify="flex-start"
                  alignItems="flex-start"
                  className={classes.cardList}
                >
                  {blogList && blogList.map((blog, index) => {
                    return(
                      <Grid key={index} item container sm className={classes.card}>
                        <BlogCard blog={blog}/>
                      </Grid>
                    )
                  })}
                </Grid>
              </Container>
              )
          }}/>
          <Route exact path={`${match.path}/Edit/:id`} component={BlogEditor}/>
      </Switch>
    )
}

export default BlogRouter;