import React, { createContext, useState, useEffect } from "react";
import API from '../../modules/API'

const BlogContext = createContext();

const BlogProvider = (props) => {
    const [blog, setBlog] = useState({});
    const [id, setId] = useState('');


    useEffect(() => {
        if(id){
            let ignore = false;
            async function fetchData(){
                API.get('/api/blog/', {id : id}).then(res => {
                    if(res.status == 200){
                        setBlog(res.data);
                    }
                });
            }
            fetchData();
            return () => {ignore = true;}
        }else{
            return;
        }
    }, [id]);

    function updateBlog(){
        API.post(`/api/blog/${id}`, {id : id}).then(res => {
            if(res.status == 200){
                setBlog('');
            }
        });
    };

    const data = {
        blog,
        setBlog,
        setId,
        updateBlog,
    };

    return (
        <BlogContext.Provider value={data}>
            {props.children}
        </BlogContext.Provider>
    );
};

export {BlogContext, BlogProvider};