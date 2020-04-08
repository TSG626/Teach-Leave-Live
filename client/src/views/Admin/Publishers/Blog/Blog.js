import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import BlogCard from '../../../../components/Blog/BlogCard';
import { Typography, Button, Grid, CardContent, Dialog} from '@material-ui/core';
import { Switch, Route} from 'react-router-dom';
import BlogCreator from './BlogCreator';
import {Add as AddIcon} from '@material-ui/icons/';
import API from '../../../../modules/API';
import BlogEditor from './BlogEditor';

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
              <BlogCreator blogList={props.blogList} setBlogList={props.setBlogList} setAdding={props.setAdding}/>
            </CardContent>
        </Container>
    </Dialog>
  );
}

export default function BlogRouter({match}) {
    const [blogList, setBlogList] = useState([]);
    const classes = useStyles();
    const [errors, setErrors] = useState({});
    const [adding, setAdding] = useState(false);

    const handleClickOpen = () => {
      setAdding(true);
    };
  
    const handleClose = () => {
      setAdding(false);
    };

    return(
      <Switch>
      {/* //Main router function */}
      <Route exact path={`${match.path}/`} component={function(){
        return(
          <Container component="main" maxWidth={false}>
            <Grid xs={12} container alignContent={'center'} justify={'space-between'}>
              <Typography className={classes.title}>
                  Blog
              </Typography>
              <Button onClick={handleClickOpen} endIcon={<AddIcon/>} varient={'contained'}>
                  Add Blog
              </Button>
              <SimpleDialog
                  open={adding}
                  onClose={handleClose}
                  blogList={blogList}
                  setBlogList={setBlogList}
                  setAdding={setAdding}
                  className={classes.blogCreatorWindow}/>
            </Grid>
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="flex-start"
              className={classes.cardList}>
                {blogList && blogList.map((blog, index) => {
                  return(
                    <Grid key={index} item container xs={12} className={classes.card}>
                      <BlogCard blog={blog}/>
                    </Grid>
                  )
                })}
            </Grid>
          </Container>
          )
      }}/>
      <Route path={`${match.path}/Create`} component={BlogCreator} />
      {/* <Route exact path={`${match.path}/Edit/:id`} component={BlogEditor}/> */}
    </Switch>)
}