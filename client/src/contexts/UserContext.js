import React, { createContext, useState, useEffect } from "react";
import API from '../modules/API'

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
            API.get('/api/user/').then(res => {
                if(res.status === 200){
                    const {username, email, firstname, lastname, status, avatar} = res.data;
                    setUser({
                        username: username,
                        email: email,
                        firstname: firstname,
                        lastname: lastname,
                        avatar: avatar,
                        status: status,
                    });
                }

            });
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
