import React, { useState, useContext, useEffect } from "react";
import { Route, Switch, Redirect, useLocation, Link } from "react-router-dom";
import Cart from "./Cart/Cart";
import Checkout from "./Checkout/Checkout";
import Confirmation from "./Confirmation/Confirmation";
import Summary from "./Summary/Summary";
import { UserContext } from "../../contexts/UserContext";
import { Box, Grid, Collapse } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import API from "../../modules/API";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
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
  const [changed, setChange] = useState(false);
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const userInfo = useContext(UserContext);
  const handleClick = (props) => {
    API.post("/api/user/addToCart", {
      username: userInfo.user.username,
      title: props.title,
    }).then((res) => {
      alert("Added " + props.title + " to Shopping Cart!");
    });
  };

  useEffect(() => {
    API.get("/api/course/getAllCourses")
      .then((res) => {
        setCourses(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [counter]);

<<<<<<< HEAD
    if(counter === 0) {
        setCounter(1);
        setChange(true);
    }
    if(useLocation().pathname === "/Store")
    {
        return(
            <div className="App">
                <Grid container>
                    <Box p={1}>
                        <Typography>Course Store</Typography>
                        <Button component={Link} to="/Store/Cart"><ShoppingCartIcon/></Button>
                    </Box>
                </Grid>
                <Grid container justify="center">
                    {courses.map(course => {
                        return(
                            <Grid item>
                            <Box width="25%" ml={3} mr={3} mb={3} alignItems="center">
                            <Card className={classes.root}>
                                <CardContent>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    {course.title}
                                </Typography>
                                <Typography variant="h5" component="h2">
                                    {course.subject}
                                </Typography>
                                <Typography className={classes.pos} color="textSecondary">
                                    {courses.author ? courses.author.map((a, i, arr) => {
                                        if (i == arr.length - 1)
                                            return(a);
                                        else
                                            return(a + ", ");
                                    }) : <React.Fragment></React.Fragment>}
                                </Typography>
                                <Typography variant="body2" component="p">
                                    {course.description}
                                </Typography>
                                </CardContent>
                                <Button size="small" onClick={() => handleClick(course)}><AddIcon/></Button>
                            </Card>   
                            </Box>
                            </Grid>
                        )
                    })}
                </Grid>
=======
  if (counter === 0) {
    setCounter(1);
    setChange(true);
  }

  if (useLocation().pathname === "/Store") {
    return (
      <div className="App">
        <header className="App-header">
          Course Store
          <div>
            <Button component={Link} to="/Store/Cart">
              <ShoppingCartIcon />
            </Button>
          </div>
        </header>
>>>>>>> cfb6e6cc9f2baabd40fe118e7304706513fc28c7

        <Grid container justify="center">
          {courses.map((course) => {
            return (
              <Grid item>
                <Box width="25%" ml={3} mr={3} mb={3} alignItems="center">
                  <Card className={classes.root}>
                    <CardContent>
                      <Typography
                        className={classes.title}
                        color="textSecondary"
                        gutterBottom
                      >
                        {course.title}
                      </Typography>
                      <Typography variant="h5" component="h2">
                        {course.subject}
                      </Typography>
                      <Typography className={classes.pos} color="textSecondary">
                        {courses.author ? (
                          courses.author.map((a, i, arr) => {
                            if (i == arr.length - 1) return a;
                            else return a + ", ";
                          })
                        ) : (
                          <React.Fragment></React.Fragment>
                        )}
                      </Typography>
                      <Typography variant="body2" component="p">
                        {course.description}
                      </Typography>
                    </CardContent>
                    <Button size="small" onClick={() => handleClick(course)}>
                      <AddIcon />
                    </Button>
                  </Card>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  } else return <React.Fragment />;
};

const Store = ({ match }) => {
  return (
    <UserContext.Consumer>
      {(context) => {
        if (context.isAuthenticated()) {
          return (
            <div>
              <DefaultStore />
              <Switch>
                <Route exact path={`${match.path}/Cart`} component={Cart} />
                <Route
                  exact
                  path={`${match.path}/Checkout`}
                  component={Checkout}
                />
                <Route
                  exact
                  path={`${match.path}/Confirmation`}
                  component={Confirmation}
                />
                <Route
                  exact
                  path={`${match.path}/Summary`}
                  component={Summary}
                />
              </Switch>
            </div>
          );
        } else {
          return <Redirect to="/User/Login" />;
        }
      }}
    </UserContext.Consumer>
  );
};

export default Store;
