import React, {useState, useEffect, useContext} from 'react';
import { Route, Switch, Redirect, useLocation, Link } from 'react-router-dom';
import Cart from "./Cart/Cart";
import Summary from "./Summary/Summary";
import { UserContext } from '../../contexts/UserContext';
import { CssBaseline, Box, Grid, Fade, Grow, Tooltip, TextField, Select, MenuItem } from '@material-ui/core';
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
      minWidth: 700,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 20,
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
    const [priceFilter, setPriceFilter] = useState(null);
    const [search, setSearch] = useState('');
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

    const handlePriceFilterChange = (event) => {
        setPriceFilter(event.target.value);
    }

    var count = 0
    if(useLocation().pathname === "/Store/")
    {
        return(
            <div>
            <header>
            <Fade  in="true" mountOnEnter timeout={2000}>
                <Box mt={3} mb={3}>
                  <Grid container direction='column' alignContent='center'>
                    <Grid item>
                      <Typography variant="h2">
                          Course Store
                      </Typography>
                    </Grid>
                    <TextField
                    id='search'
                    variant='filled'
                    label='search'
                    onChange={() => setSearch(document.getElementById('search').value)}
                    />
                    <form>
                      <Select
                        id='priceFilter'
                        value={priceFilter}
                        onChange={handlePriceFilterChange}
                        displayEmpty
                      >
                        <MenuItem value={null}>Price filter</MenuItem>
                        <MenuItem value={0}>Free</MenuItem>
                        <MenuItem value={1}>$1 or less</MenuItem>
                        <MenuItem value={5}>$5 or less</MenuItem>
                      </Select>
                    </form>
                  </Grid>
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
                    if (exists === false && course.published === true
                      && (course.title.toLowerCase().includes(search.toLowerCase())
                        || course.subject.toLowerCase().includes(search.toLowerCase())
                        || course.description.toLowerCase().includes(search.toLowerCase())
                      ) && (priceFilter === null || course.price <= priceFilter)
                    ){
                      count += 1;
                      console.log(course.price + ' ' + priceFilter);
                        return(
                          <Grow in="true" mountOnEnter timeout={2000}>
                            <Grid item>
                            <Box width="50%">
                            <Card className={classes.root}>
                            <CardContent>
                              <Typography className={classes.title} color="textSecondary" gutterBottom align="center">
                                {course.subject}
                              </Typography>
                              <Typography variant="h6" component="h2" align="center">
                                {course.title}
                              </Typography>
                              <Box display="flex" justifyContent="center">
                                <Typography noWrap={true} color="textSecondary">{course.description}</Typography>
                              </Box>
                              <Box mt={1}>
                              {course.price === 0 ? <Typography className={classes.title} color="textSecondary" gutterBottom align="center">
                                FREE
                                </Typography>:<Typography className={classes.title} color="textSecondary" gutterBottom align="center">
                                  {"$" + course.price.toFixed(2)}
                                </Typography>}
                              </Box>
                            </CardContent>
                            <Grid container justify='space-between'>
                                <Grid item>
                                    <Box p={4} ml={6}>
                                      <Tooltip title='Add to cart'>
                                        <Button size="small" onClick={() => handleClick(course)}><AddIcon/></Button>
                                      </Tooltip>
                                    </Box>
                                </Grid>
                                <Grid item>
                                <PopupState variant="popover" popupId="demo-popup-popover">
                                {(popupState) => (
                                  <div>
                                    <Box p={4} mr={6}>
                                      <Tooltip title='More information'>
                                        <Button {...bindTrigger(popupState)}><OpenInNewIcon/></Button>
                                      </Tooltip>
                                    </Box>
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
                                        <Typography className={classes.title} color="textSecondary" gutterBottom align="center">
                                          {course.description}
                                        </Typography>
                                      </Box>
                                      <Box p={2}>
                                        <Typography align="Center" className={classes.title}>Number of Modules</Typography>
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
