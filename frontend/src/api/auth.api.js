import axios from 'axios'

const BACKEND_URL = 'http://localhost:5000'

export async function login(credentials){

    try{
        const res = await axios.post(
            `${BACKEND_URL}/api/auth/login`,
            credentials,
            {
                headers: {"Content-Type": "application/json"},
                withCredentials: true
            }, 
        );

        return res.data
    }catch(error){
        throw new Error(error.response.data.message)
    }
}

export async function verify(token){
    try{
        const res = await axios.get(
            `${BACKEND_URL}/api/auth/verify`,
            {headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }}
        );
        // console.log(res.data)
        return res.data
    }catch(error){
        throw new Error(error.response.data.message)
    }
}

export async function refresh(){
    try{
        const res = await axios.get(
            `${BACKEND_URL}/api/auth/refresh`,
            {
                withCredentials: true // This is essential to send cookies!
            }
        );
        return res.data
    }catch(error){
        throw new Error(error.response.data.message)
    }
}