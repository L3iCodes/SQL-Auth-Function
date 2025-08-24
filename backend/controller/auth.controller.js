import mysql from 'mysql2/promise';
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

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

    try{
        const hashed_password = await bcrypt.hash(password, 10);

        const [result] = await pool.query(
            `INSERT INTO practice_database.users (username, hashed_password) VALUES (?, ?)`,
            [username.toLowerCase(), hashed_password]
        );

        return res.status(201).json({success: true, message: "Succesfully created user", result})

    }catch(error){
        if(error.code === 'ER_DUP_ENTRY'){
            return res.status(409).json({success: false, message: 'Username already used'})
        
        }else{
            return res.status(500).json({success: false, message: 'Failed to add user', error})
        }
    }
}

export const login = async (req, res) => {
    const { username, password } = req.body;    
    
    try{
        const [row] = await pool.query(
            `SELECT user_id, username, hashed_password FROM practice_database.users WHERE username = ?`,
            [ username ],
        );

        // Check if user exists
        if(row.length < 1){
            return res.status(401).json({success: false, message: 'User does not exists'})
        };

        // Compare input password to hashed password
        const match = await bcrypt.compare(password, row[0].hashed_password);
        if(!match) {
            return res.status(401).json({success: false, message: 'Incorrect password or username'})
        };

        // Create ACCESS TOKEN
        const accessToken = jwt.sign(
            {user_id: row[0].user_id, username: row[0].username,}, 
            process.env.SECRET, 
            {expiresIn: '15m'}
        );

        // Create REFRESH TOKEN 
        const refreshToken = jwt.sign(
            {user_id: row[0].user_id, username: row[0].username,}, 
            process.env.SECRET, 
            {expiresIn: '7d'}
        );
        
        // Store REFRESH TOKEN in HttpOnly Cookie
        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days 24hr 60min 60sec 1000ms
        })

        return res.status(200).json({
            success: true, 
            message: 'Login complete', 
            credentials: {
                user_id: row[0].user_id,
                username: row[0].username,
                token: accessToken
            }
        });
        
    }catch(error){
        return res.status(500).json({success: false, message: 'Login failed', error})
    }
}

export const logout = async (req, res) => {
    res.clearCookie("jwt", {
        httpOnly: true,
        secure: true,
        sameSite: "lax"
    });
    return res.status(200).json({ success: true, message: "Logged out" });
};


export const refresh = (req, res) => {
    const cookies = req.cookies;

    if(!cookies?.jwt){
        return res.status(401).json({success:false, message: 'No refresh token found'});
    }

    const refreshToken = cookies.jwt;

    jwt.verify(refreshToken, process.env.SECRET, (err, decoded) => {
        if (err) return res.status(401).json({success:false, message: 'Invalid refresh token found'});

        // Create new access token
        const accessToken = jwt.sign(
            {user_id: decoded.user_id, username: decoded.username},
            process.env.SECRET,
            { expiresIn: '15m' }
        );

        return res.json({ accessToken })
    });
};

export const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({success:false, message: 'No token found'});

    const token = authHeader.split(" ")[1]; //Bearer <token>
    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) res.status(401).json({success:false, message: 'Invalid token'});

        req.user = user;
        next();

    });
};

export const verifyToken = (req, res) => {
    return res.status(200).json({ message: "You are authenticated!", user: req.user });
}

