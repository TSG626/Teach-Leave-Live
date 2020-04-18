import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext";

export default function LogOut() {
  return (
    <UserContext.Consumer>
      {(context) => {
        context.deauthenticateUser();
        return <Redirect to="/" />;
      }}
    </UserContext.Consumer>
  );
}
