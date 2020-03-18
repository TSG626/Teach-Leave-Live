import React, { createContext, useState, useEffect } from "react";
import axios from 'axios';

const UserContext = createContext();

const UserProvider = (props) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState({});

    const deauthenticateUser = () => {
        localStorage.removeItem('token');
        setAuthenticated(false);
    }

    const authenticateUser = (token) => {
        localStorage.setItem('token', token);
        setAuthenticated(true);
    }

    const isAuthenticated = () => {
        return authenticated;
    }

    useEffect(() => {
        if(user.username) return;
        if(localStorage.getItem('token') !== null){
            setAuthenticated(true);
        }
    }, [user]);

    useEffect(() => {
        let ignore = false;
        async function fetchData(){
            const response = await axios.get('/api/user/', {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }
            })
            if(response.status == 200){
                const {username, email, firstname, lastname, admin} = response.data;
                setUser({
                    username: username,
                    email: email,
                    firstname: firstname,
                    lastname: lastname,
                    admin: admin,
                });
            }
        }
        fetchData();
        return () => {ignore = true;}
    }, [authenticated]);

    const data = {
        //data
        user,
        setUser,
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