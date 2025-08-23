import express from 'express';
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'
import projectRoutes from './routes/project.routes.js'
import cors from 'cors'

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('Server is connected to https://localhost:' + PORT)
});

const ORIGIN_CLIENT = process.env.ORIGIN_CLIENT;
app.use(cors({
    origin: ORIGIN_CLIENT,
    credentials: true
}));

app.use('/api/auth', authRoutes);
app.use('/api/project', projectRoutes);



