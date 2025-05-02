import express from 'express';
import cors from 'cors';
import doctorRoutes from './routes/doctorRoutes.js';
import dbConnect from './dbConnect.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', doctorRoutes);


await dbConnect();
app.listen(5000, () => console.log(`Server running on port 5000`));

export default app;