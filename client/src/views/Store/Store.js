import React, { useState } from "react";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import Cart from "./Cart/Cart";
import Checkout from "./Checkout/Checkout";
import Confirmation from "./Confirmation/Confirmation";
import Summary from "./Summary/Summary";
import { UserContext } from "../../contexts/UserContext";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";

const DefaultStore = () => {
  const [courses, setCourses] = useState("No courses available!");
  if (useLocation().pathname === "/Store") {
    return (
      <div className="App">
        <header className="App-header">
          <TextField
            variant="outlined"
            margin="normal"
            style={{ width: 1000 }}
            id="search"
            label="Search"
            name="search"
            autoComplete="search"
          />
          {courses}
        </header>
      </div>
    );
  }
  return <div></div>;
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
