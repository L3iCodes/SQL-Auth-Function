import express from 'express';
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'
import projectRoutes from './routes/project.routes.js'

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('Server is connected to https://localhost:' + PORT)
});

app.use('/api/auth', authRoutes);
app.use('/api/project', projectRoutes);



