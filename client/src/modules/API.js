import axios from 'axios';

export default {
    get: async function(path, params){

        return await axios.get(path, {
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            },
            params: params
        })
    },
    post: async function(path, body){
        return await axios.post(path, JSON.stringify(body),{
            headers: {
                "Content-Type" : "application/json",
                "Authorization": `JWT ${localStorage.getItem('token')}`
            },
        })
    },
    postMP: async function(path, body){
        return await axios.post(path, body,{
            headers: {
                // "Content-Type" : "multipart/form-data",
                "Authorization": `JWT ${localStorage.getItem('token')}`
            },
        })
    },
    put: async function(path, body){
        return await axios.put(path, JSON.stringify(body),{
            headers: {
                "Content-Type" : "application/json",
                "Authorization": `JWT ${localStorage.getItem('token')}`
            },
        })
    },
    delete: async function(path, body){
        return await axios.delete(path, {
            headers: {
                "Content-Type" : "application/json",
                "Authorization": `JWT ${localStorage.getItem('token')}`
            },
        })
    },
}
