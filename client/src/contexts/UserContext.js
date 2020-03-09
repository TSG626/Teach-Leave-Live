import React, { createContext, useState, useEffect } from "react";
import axios from 'axios';
import User from "../views/User/User";

const UserContext = createContext();

const UserProvider = (props) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState({});
    const [email, setEmail] = useState({});

    const deauthenticateUser = () => {
        localStorage.removeItem('token');
        setAuthenticated(false);
    }

    const authenticateUser = (token) => {
        localStorage.setItem('token', token);
        setAuthenticated(true);
    }

    const isAuthenticated = () => {
        return (localStorage.getItem('token') !== null);
    }

    const data = {
        //data
        user,
        setUser,
        email,
        setEmail,
        authenticated,
        //functions
        authenticateUser,
        deauthenticateUser,
        isAuthenticated
    }; 

    return (
        <UserContext.Provider value={data}>
            {props.children}
        </UserContext.Provider>
    );
};

export {UserContext, UserProvider};