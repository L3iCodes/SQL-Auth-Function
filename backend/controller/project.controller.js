import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

// Initialize DB Pool
const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'practice_database',
    connectionLimit: 10
});

export const get_project_list = async (req, res) => {
    // const {user_id} = req.user; // Once Auth is applied
    const { user_id } = req.body;

    try{
        const [projectList] = await pool.query(
            `SELECT pr.* 
            FROM practice_database.user_projects as up
            JOIN practice_database.users as us
                ON up.user_id = us.user_id
            JOIN practice_database.projects as pr
                ON up.project_id = pr.project_id
            WHERE up.user_id = ?`,
            [ user_id ]        
        )

        res.status(202).json({success: true, message: "Project list fetched", result: projectList})

    }catch(error){
        res.status(401).json({success: false, message: "Failed to fetch project list", error})
    }
}
    

export const add_project = async (req, res) => {
    // const {user_id} = req.user; // Once Auth is applied
    const {project_name, project_description, owner_id} = req.body;

    console.log('Adding Project: ' + project_name);

    try{
        // Add project in the Projects Table
        const [result] = await pool.query(
            'INSERT INTO practice_database.projects(project_name, project_description, owner_id) VALUES (?,?,?)',
            [ project_name, project_description, owner_id ]
        )

        // Add userId and ProjectID in the Associative Table
        const user_project = await pool.query(
            'INSERT INTO practice_database.user_projects(user_id, project_id) VALUES (?,?)',
            [ owner_id, result.insertId ]
        )

        res.status(202).json({success: true, message: "Project Added", result: [result, user_project]})
    }catch(error){
        res.status(401).json({success: false, message: "Failed to add project", error})
    }
}

export const delete_project = async (req, res) => {
    // const {user_id} = req.user; // Once Auth is applied
    const { owner_id, project_id } = req.body;

    console.log('Deleting Project: ' + project_id);

    try{
        const [result] = await pool.query(
            'DELETE FROM practice_database.projects WHERE project_id = ? AND owner_id = ?',
            [project_id, owner_id]
        )

        if(result.affectedRows > 0){
            res.status(202).json({success: true, message: "Project Deleted", result})
        }else{
            res.status(401).json({success: false, message: "Can't delete this project, user is not the owner"})
        }


    }catch(error){
        res.status(401).json({success: false, message: "Failed to delete project", error})
    }

}