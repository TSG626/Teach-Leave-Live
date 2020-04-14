import React, { createContext, useState, useEffect } from "react";
import API from '../../modules/API'

const CourseContext = createContext();

const CourseProvider = (props) => {
    const [courseList, setCourseList] = useState([]);
    const [subjectList, setSubjectList] = useState([]);
    const [course, setCourse] = useState({});
    const [id, setId] = useState('');

    useEffect(() => {
        async function fetchData(){
            API.get('/api/course/').then(res => {
                if(res.status === 200){
                    setCourseList(res.data);
                }
            });
            API.get('/api/course/subjects/').then(res => {
                if(res.status === 200){
                    if(!Object.keys(res.data).length) return;
                    setSubjectList(res.data);
                }
            });
        }
        fetchData();
    }, []);

    useEffect(() => {
        if(id){
            let ignore = false;
            async function fetchData(){
                API.get('/api/course/', {id : id}).then(res => {
                    if(res.status === 200){
                        setCourse(res.data);
                    }
                });
            }
            fetchData();
            return () => {ignore = true;}
        }else{
            return;
        }
    }, [id]);

    function updateCourse(){
        API.post(`/api/course/${id}`, {id : id}).then(res => {
            if(res.status === 200){
                setCourse('');
            }
        });
    };

    const data = {
        courseList, 
        setCourseList,
        course,
        setId,
        updateCourse,
        subjectList,
    };

    return (
        <CourseContext.Provider value={data}>
            {props.children}
        </CourseContext.Provider>
    );
};

export {CourseContext, CourseProvider};