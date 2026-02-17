import { Request, Response } from 'express';
import { bookingServices } from './booking.service';

const createBooking = async (req: Request, res: Response) => {
	console.log('BODY:', req.body);
	try {
		const result = await bookingServices.createBooking(req.body);

		res.status(201).json({
			success: true,
			message: 'Booking created successfully',
			data: result.rows[0],
		});
	} catch (error: any) {
		res.status(500).json({
			success: false,
			message: error?.message,
		});
	}
};

const getAllBookings = async (req: Request, res: Response) => {
	try {
		//database connection
		const result = await bookingServices.getAllBookings();

		if (!result.rows[0]) {
			res.status(200).json({
				success: true,
				message: 'Bookings retrieved No found',
				data: result.rows,
			});
		} else {
			res.status(200).json({
				success: true,
				message: 'Bookings retrieved successfully',
				data: result.rows,
			});
		}
	} catch (error: any) {
		res.status(500).json({
			message: error?.message,
			success: false,
			detail: error,
		});
	}
};

export const updateBooking = async (req: Request, res: Response) => {
	// console.log(req.params.id);
	const { name, email } = req.body;
	try {
		const result = await bookingServices.updateBooking(req.body, req.params.id! as string);

		if (result.rows.length === 0) {
			res.status(404).json({
				success: false,
				message: 'Vehicle Not Found',
			});
		} else {
			res.status(200).json({
				success: true,
				message: 'Vehicle updated successfully',
				data: result.rows[0],
			});
		}
	} catch (err: any) {
		res.status(500).json({
			success: false,
			message: err?.message,
			detail: err,
		});
	}
};

export const bookingController = {
	createBooking,
	getAllBookings,
	updateBooking,
};
