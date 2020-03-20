import axios from 'axios';

export default {
    get: async function(path, body){
        console.log(path);

        return await axios.get(path, {
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }
        })
    },
    post: async function(path, body){
        console.log(path);
        return await axios.post(path, JSON.stringify(body),{
            headers: {
                "Content-Type" : "application/json",
                "Authorization": `JWT ${localStorage.getItem('token')}`
            },
        })
    }
}