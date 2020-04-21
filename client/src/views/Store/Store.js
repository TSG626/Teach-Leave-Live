import React, {useState, useEffect, useContext} from 'react';
import { Route, Switch, Redirect, useLocation, Link } from 'react-router-dom';
import Cart from "./Cart/Cart";
import Summary from "./Summary/Summary";
import { UserContext } from '../../contexts/UserContext';
import { CssBaseline, Box, Grid, Fade, Grow } from '@material-ui/core';
import API from '../../modules/API';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { Popover } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';

const useStyles = makeStyles(theme => ({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));

const DefaultStore = () => {
    const [courses, setCourses] = useState([]);
    const [cart, setCart] = useState([]);
    const classes = useStyles();


    const userInfo = useContext(UserContext);
    const handleClick = (props) => {
        API.post('/api/user/addToCart',{'username': userInfo.user.username, 'title': props.title}).then(res =>{
            alert("Added " + props.title + " to Shopping Cart!");
            window.location.pathname = "/Store/Cart"; 
            return false;
        })
    }

    useEffect(() => {
        API.get('/api/course/').then(res=>{
            setCourses(res.data);
        }).catch(err=>{
            console.log(err);
        });
        API.get('/api/user/getCart', {username: userInfo.user.username}).then(res=>{
          if (res.data !== null)
            setCart(res.data);
        })
        API.get('/api/user/getCourses', {username: userInfo.user.username}).then(res=>{
            for (var i = 0; i < res.data.length; i++) {
              if (res.data[i] !== null)
                setCart(oldArr => [...oldArr, res.data[i]]);
            }
        })
    }, []);

    var count = 0
    if(useLocation().pathname === "/Store/")
    {
        return(
            <div>
            <header>
            <Fade  in="true" mountOnEnter timeout={2000}>
                <Box mt={3} mb={3}>
                <Typography variant="h2" align="center">
                    Course Store
                </Typography>
                </Box>
              </Fade>

            </header>

            <Grid container justify="center">
                {courses.map(course => {
                    var exists = false;
                    if(cart.length !== 0) {
                      cart.map(item => {
                        if (item === course._id)
                            exists = true;
                    })
                    }
                    if (exists === false && course.published === true) {
                      count += 1;
                        return(
                          <Grow in="true" mountOnEnter timeout={2000}>
                            <Grid item>
                            <Box width="25%" ml={3} mr={3} mb={3} alignItems="center">
                            <Card className={classes.root}>
                            <CardContent>
                              <Typography className={classes.title} color="textSecondary" gutterBottom align="center">
                                {course.subject}
                              </Typography>
                              <Typography variant="h6" component="h2" align="center">
                                {course.title}
                              </Typography>
                              <Box mt={1}>
                              {course.price === 0 ? <Typography className={classes.title} color="textSecondary" gutterBottom align="center">
                                FREE
                                </Typography>:<Typography className={classes.title} color="textSecondary" gutterBottom align="center">
                                  {"$" + course.price.toFixed(2)}
                                </Typography>}
                              </Box>
                            </CardContent>
                            <Grid container>
                                <Grid item>
                                    <Box ml={2} mr={7}><Button size="small" onClick={() => handleClick(course)}><AddIcon/></Button></Box>
                                </Grid>
                                <Grid item>
                                <PopupState variant="popover" popupId="demo-popup-popover">
                                {(popupState) => (
                                  <div>
                                    <Box mb={2} ml={7}><Button {...bindTrigger(popupState)}><OpenInNewIcon/></Button></Box>
                                    <Popover
                                      {...bindPopover(popupState)}
                                      anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'center',
                                      }}
                                      transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'center',
                                      }}
                                    >
                                      <Box p={2}>
                                        <Typography align="Center">Description</Typography>
                                        <Typography className={classes.title} color="textSecondary" gutterBottom align="center">
                                          {course.description}
                                        </Typography>                                      
                                        </Box>
                                        <Box p={2}>
                                        <Typography align="Center">Number of Modules</Typography>
                                        <Typography className={classes.title} color="textSecondary" gutterBottom align="center">
                                          {course.modules.length}
                                        </Typography> 
                                        </Box>
                                    </Popover>
                                    <Backdrop className={classes.backdrop} open={popupState.isOpen} onClick={popupState.close}/>
                                  </div>
                                )}
                              </PopupState>
                                </Grid>
                            </Grid>
                          </Card>   
                            </Box>
                            </Grid>
                            </Grow>
                        )
                    }
                    else {
                        return(<React.Fragment/>)
                    }
                })}
                {count === 0 ? <Grow in="true" mountOnEnter timeout={2000}><Typography>No courses available!</Typography></Grow>: <React.Fragment></React.Fragment>}
            </Grid>

        </div>
            );
    }
    return(<div></div>);
}

const Store = ({match}) => {
    return(
        <UserContext.Consumer>{context =>{
            if(context.isAuthenticated()) {
                return (
                    <CssBaseline>
                        <DefaultStore/>
                        <Switch>
                            <Route exact path={`${match.path}/Cart`} component={Cart} />
                            <Route exact path={`${match.path}/Summary`} component={Summary} />
                        </Switch>
                    </CssBaseline>
                );
            }
            else {
                return(
                    <Redirect to="/User/Login"/>
                );
            }
        }}</UserContext.Consumer>
    );
}

export default Store;
