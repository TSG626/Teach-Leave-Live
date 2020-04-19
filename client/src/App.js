import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {UserContext, UserProvider} from "./contexts/UserContext";
import { MuiThemeProvider, makeStyles } from '@material-ui/core';
import NavBar from "./components/Header/NavBar";
import Landing from "./views/Landing/Landing";
import Home from "./views/Home/Home";
import Admin from "./views/Admin/Admin";
import User from "./views/User/User";
import Blog from "./views/Blog/Blog";
import Catalogue from "./views/Catalogue/Catalogue";
import Course from "./views/Course/Course";
import Store from "./views/Store/Store";
import NotFound from "./views/NotFound";
import Login from './views/User/Login/Login';
import SignUp from './views/User/SignUp/SignUp';
import ForgotPassword from './views/User/ForgotPassword/ForgotPassword';
import Contact from './views/Contact/Contact.js';
import themes from './themes'

const useStyles = makeStyles(theme => ({
    toolbar: theme.mixins.toolbar,
    overrides: {
        MuiTypography: {
            color: {
                textPrimary: '#ffffff',
                textSecondary: '#ffffff',
            }
        },
    },
}));

//Checks if user is signed in. If not, only allow them to access landing and signup/login
//Redirect everything else to login.
const Authorization = () => {
  return(
    <UserContext.Consumer>{(context) => {
      if(context.isAuthenticated() === false){
        return(
          <Switch>
            <Route exact path="/" component={Landing}/>
            <Route exact path="/User/SignUp" component={SignUp}/>
            <Route exact path="/User/Login" component={Login}/>
            <Route exact path="/User/ForgotPassword" component={ForgotPassword}/>
            <Route path="/Contact" component={Contact} />
            <Route path="*" component={NotFound}/>
            {/* <Route path="/" component={() => {
              return(<React.Fragment/>)
            }}/> */}
          </Switch>
        )
      }else{
        return(<Routes/>);
      }
    }}</UserContext.Consumer>
  )
}

const Routes = () => {
  return(
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route exact path="/Home" component={Home} />
      <Route path="/Admin" component={Admin} />
      <Route path="/User" component={User}/>
      <Route path="/Blog" component={Blog} />
      <Route path="/Catalogue" component={Catalogue} />
      <Route path="/Course" component={Course} />
      <Route path="/Store" component={Store} />
      <Route path="/Contact" component={Contact} />
    </Switch>
  )
}

const App = (props) => {
  const classes = useStyles();
  return (
    <UserProvider>
      <MuiThemeProvider theme={themes.default}>
        <NavBar/>
          <div className={classes.toolbar}/>
        <Authorization/>
      </MuiThemeProvider>
    </UserProvider>
  );
}

export default App;
