import axios from 'axios'

const BACKEND_URL = 'http://localhost:5000'

export async function get_Project(token){

    try{
        const res = await axios.get(
            `${BACKEND_URL}/api/project/get_project`,

            {
                headers: {"Authorization": `Bearer ${token}`},
                withCredentials: true
            }, 
        );

        return res.data
    }catch(error){
        throw new Error(error.response.data.message)
    }
}