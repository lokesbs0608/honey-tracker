import express from 'express';
import connectDB from './config/db';
import userRoutes from './routes/userRoutes';

const app = express();
app.use(express.json());

connectDB();

app.use('/api', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
