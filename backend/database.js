import express from 'express';
import cookieParser from "cookie-parser";
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'
import projectRoutes from './routes/project.routes.js'
import cors from 'cors'

dotenv.config();

const app = express();
const ORIGIN_CLIENT = process.env.ORIGIN_CLIENT;
app.use(cors({
    origin: ORIGIN_CLIENT,
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('Server is connected to https://localhost:' + PORT)
});



app.use('/api/auth', authRoutes);
app.use('/api/project', projectRoutes);



