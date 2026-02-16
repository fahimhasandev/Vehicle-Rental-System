import express, { Request, Response } from 'express';
import initDB from './config/db';
import { userRoutes } from './modules/Auth/auth.routes';
const app = express();

// parse -json data
app.use(express.json());

initDB();

app.get('/', (req: Request, res: Response) => {
	res.status(200).send('Hello world');
});

app.use('/api/v1/auth', userRoutes);

// Vehicles

//handle route
app.use((req, res) => {
	res.status(404).json({
		success: false,
		message: 'Route not found',
		path: req.path,
	});
});

export default app;
