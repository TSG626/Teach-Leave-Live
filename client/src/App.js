import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import {UserContext, UserProvider} from "./contexts/UserContext";

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

const App = (props) => {
  return (
    <div>
      <UserProvider>
        <NavBar/>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/Home" component={Home} />
          <Route path="/Admin" component={Admin} />
          <Route path="/User" component={User}/>
          <Route exact path="/Blog" component={Blog} />
          <Route exact path="/Catalogue" component={Catalogue} />
          <Route exact path="/Course" component={Course} />
          <Route path="/Store" component={Store} />
          <Route component={NotFound}/>
        </Switch>
      </UserProvider>
    </div>
  );
}

export default App;
