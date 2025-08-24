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

export async function add_Project(token, newProject){
    try{
        const res = await axios.post(
            `${BACKEND_URL}/api/project/add_project`,
            { project_name:newProject.project_name, project_description:newProject.project_description  },
            {
                headers: {"Authorization": `Bearer ${token}`, "Content-Type": 'application/json'},
                withCredentials: true
            }, 
        );

        return res.data
    }catch(error){
        throw new Error(error.response.data.message)
    }
}

export async function delete_Project(token, project_id){
    try{
        const res = await axios.post(
            `${BACKEND_URL}/api/project/delete_project`,
            { project_id },
            {
                headers: {"Authorization": `Bearer ${token}`, "Content-Type": 'application/json'},
                withCredentials: true
            }, 
        );

        return res.data
    }catch(error){
        throw new Error(error.response.data.message)
    }
}