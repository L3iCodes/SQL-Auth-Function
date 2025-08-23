import axios from 'axios'

const BACKEND_URL = 'http://localhost:5000'

export async function login(credentials){

    try{
        const res = await axios.post(
            `${BACKEND_URL}/api/auth/login`,
            credentials,
            {headers: {"Content-Type": "application/json"}}
        );

        console.log(res.data);
        return res.data
    }catch(error){
        throw new Error(error.response.data.message)
    }
}