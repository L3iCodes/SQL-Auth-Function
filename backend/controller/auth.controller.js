import mysql from 'mysql2';
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'

dotenv.config();

// Initialize DB Pool
const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'practice_database',
    connectionLimit: 10
});


// Insert User in DB
export const sign_up = async (req, res) =>{
    const {username, password} = req.body;
    console.log(username)

    try{
        const hashed_password = await bcrypt.hash(password, 10);
        console.log(`Creating New User: \nUsername: ${username} \nHashedPaswword: ${hashed_password}`)

        // username has a UNIQUE Constraint
        pool.query(
            `INSERT INTO practice_database.users (username, hashed_password) VALUES (?, ?)`,
            [username.toLowerCase(), hashed_password],
            (err, result) => {
                if(err){
                    if (err.code === "ER_DUP_ENTRY") {
                        // Duplicate username case
                        return res.status(409).json({
                            success: false,
                            message: "Username already exists"
                        });
                    }
                    // Other DB errors
                    return res.status(500).json({
                        success: false,
                        message: "Database error",
                    });
                }
                
                return res.status(201).json({success: true, message: result})
            }
        )

    }catch(error){
        return res.status(401).json({success: false, message: 'Failed to add user' + error})
    }
}