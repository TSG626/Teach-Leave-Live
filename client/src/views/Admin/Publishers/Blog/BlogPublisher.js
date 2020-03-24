import React, { createContext, useState, useEffect } from 'react';
import './BlogPublisher.css';
import API from '../../../../modules/API'

const UserContext = createContext();

// const UserProvider = (props) => {
//     const [authenticated, setAuthenticated] = useState(false);
//     const [user, setUser] = useState({});

//     const deauthenticateUser = () => {
//         localStorage.removeItem('token');
//         setAuthenticated(false);
//     }

//     const authenticateUser = (token) => {
//         localStorage.setItem('token', token);
//         setAuthenticated(true);
//     }

//     const isAuthenticated = () => {
//         return authenticated;
//     }

//     useEffect(() => {
//         if(user.username) return;
//         if(localStorage.getItem('token') !== null){
//             setAuthenticated(true);
//         }
//     }, [user]);

//     useEffect(() => {
//         let ignore = false;
//         async function fetchData(){
//             API.get('/api/user/').then(res => {
//                 if(res.status == 200){
//                     const {username, email, firstname, lastname, admin} = res.data;
//                     setUser({
//                         username: username,
//                         email: email,
//                         firstname: firstname,
//                         lastname: lastname,
//                         admin: admin,
//                     });
//                 }
//             });
//         }
//         fetchData();
//         return () => {ignore = true;}
//     }, [authenticated]);

//     const data = {
//         //data
//         user,
//         setUser,
//         authenticated,
//         //functions
//         authenticateUser,
//         deauthenticateUser,
//         isAuthenticated
//     }; 

//     return (
//         <UserContext.Provider value={data}>
//             {props.children}
//         </UserContext.Provider>
//     );
// };

// export {UserContext, UserProvider};

export default function BlogPublisher() {
    return (
        <div className="App">
            <header className="App-header">
                Blog Post
            </header>
            <form>
                <input type="text" id="title" name="title"></input>
                <textarea id="blogBody" name="blogBody"></textarea>
                <br></br>
                <button class = "button publishBlog">Publish!</button>
            </form>
        </div>
    );
}//onClick = {(e) => AddNewBuilding(e)}