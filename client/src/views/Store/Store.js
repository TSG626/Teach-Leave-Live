import React, {useState, useEffect, useContext} from 'react';
import { Route, Switch, Redirect, useLocation, Link } from 'react-router-dom';
import Cart from "./Cart/Cart";
import Summary from "./Summary/Summary";
import { UserContext } from '../../contexts/UserContext';
import { CssBaseline, Box, Grid, Collapse } from '@material-ui/core';
import API from '../../modules/API';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

const useStyles = makeStyles({
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
  });

const DefaultStore = () => {
    const [courses, setCourses] = useState([]);
    const [counter, setCounter] = useState(0);
    const [cart, setCart] = useState([]);
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
      };

    const userInfo = useContext(UserContext);
    const handleClick = (props) => {
        API.post('/api/user/addToCart',{'username': userInfo.user.username, 'title': props.title}).then(res =>{
            alert("Added " + props.title + " to Shopping Cart!");
            window.location.pathname = "/Store/Cart"; 
            return false;
        })
    }

    useEffect(() => {
        API.get('/api/course/getAllCourses').then(res=>{
            setCourses(res.data);
        }).catch(err=>{
            console.log(err);
        });
        API.get('/api/user/getCart', {username: userInfo.user.username}).then(res=>{
            setCart(res.data);
        })
        API.get('/api/user/getCourses', {username: userInfo.user.username}).then(res=>{
            for (var i = 0; i < res.data.length; i++) {
                setCart(oldArr => [...oldArr, res.data[i]]);
            }
        })
    }, []);

    console.log(cart)
    if(useLocation().pathname === "/Store/")
    {
        return(
            <div>
            <header>
                <Box mt={3}>
                <Typography variant="h2" align="center">
                    Course Store
                </Typography>
                </Box>
                <div>
                    <Box align="center" mb={3}>
                      <Button component={Link} to="/Store/Cart"><ShoppingCartIcon/></Button>
                    </Box>
                </div>
            </header>

            <Grid container justify="center">
                            {courses.map(course => {
                                var exists = false;
                                cart.map(item => {
                                    if (item === course._id)
                                        exists = true;
                                })
                                if (exists === false) {
                                    return(
                                        <Grid item>
                                        <Box width="25%" ml={3} mr={3} mb={3} alignItems="center">
                                        <Card className={classes.root}>
                                        <CardContent>
                                          <Typography className={classes.title} color="textSecondary" gutterBottom>
                                            {course.subject}
                                          </Typography>
                                          <Typography variant="h5" component="h2">
                                            {course.title}
                                          </Typography>
                                        </CardContent>
                                        <Grid container>
                                            <Grid item>
                                                <Box ml={2} mr={7}><Button size="small" onClick={() => handleClick(course)}><AddIcon/></Button></Box>
                                            </Grid>
                                            <Grid item>
                                            <Box mb={2} ml={7}><Button><OpenInNewIcon/></Button></Box>
                                            </Grid>
                                        </Grid>
                                      </Card>   
                                        </Box>
                                        </Grid>
                                    )
                                }
                                else {
                                    return(<React.Fragment/>)
                                }
                })}
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
