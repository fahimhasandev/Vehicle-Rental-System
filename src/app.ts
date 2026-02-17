import express, { Request, Response } from 'express';
import initDB from './config/db';
import { userRoutes } from './modules/Auth/auth.routes';
import { vehicleRoutes } from './modules/Vehicles/vehicle.routes';
import { bookingRoutes } from './modules/Bookings/booking.routes';
const app = express();

// parse -json data
app.use(express.json());

// Database Intialization
initDB();

// Home
app.get('/', (req: Request, res: Response) => {
	res.status(200).send('Hello world');
});

//user Routes
app.use('/api/v1/auth', userRoutes);

// Vehicles
app.use('/api/v1/vehicles', vehicleRoutes);

// Booking
app.use('/api/v1/bookings', bookingRoutes);

//handle route
app.use((req, res) => {
	res.status(404).json({
		success: false,
		message: 'Route not found',
		path: req.path,
	});
});

export default app;
