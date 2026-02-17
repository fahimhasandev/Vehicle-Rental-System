import { Request, Response } from 'express';
import { vehicleServices } from './vehicle.service';

const createVehicle = async (req: Request, res: Response) => {
	console.log('BODY:', req.body);
	try {
		const result = await vehicleServices.createVehicle(req.body);

		res.status(201).json({
			success: true,
			message: 'Vehicles retrieved successfully',
			data: result.rows[0],
		});
	} catch (error: any) {
		res.status(500).json({
			success: false,
			message: error?.message,
		});
	}
};

const getAllVehicles = async (req: Request, res: Response) => {
	try {
		//database connection
		const result = await vehicleServices.getAllVehicles();

		if (!result.rows[0]) {
			res.status(200).json({
				success: true,
				message: 'No vehicles found',
				data: result.rows,
			});
		} else {
			res.status(200).json({
				success: true,
				message: 'Vehicles retrieved successfully',
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

const getVehiclebyID = async (req: Request, res: Response) => {
	console.log(req.params.id);
	try {
		const result = await vehicleServices.getSingleTodo(req.params.id! as string);

		if (result.rows.length === 0) {
			res.status(404).json({
				success: false,
				message: 'No Vehicle Found',
			});
		} else {
			res.status(200).json({
				success: true,
				message: 'Vehicle retrieved successfully',
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

export const updateVehicle = async (req: Request, res: Response) => {
	// console.log(req.params.id);
	const { name, email } = req.body;
	try {
		const result = await vehicleServices.updateVehicle(req.body, req.params.id! as string);

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

export const deleteVehicle = async (req: Request, res: Response) => {
	try {
		const result = await vehicleServices.deleteVehicle(req.params.id as string);

		if (result.rowCount === 0) {
			res.status(404).json({
				success: false,
				message: 'Vehicle Not Found',
			});
		} else {
			res.status(200).json({
				success: true,
				message: 'Vehicle Delete successfully.',
			});
		}
	} catch (err: any) {
		res.status(400).json({
			success: false,
			message: err?.message,
			details: err,
		});
	}
};

export const vehicleController = {
	createVehicle,
	getAllVehicles,
	getVehiclebyID,
	updateVehicle,
	deleteVehicle,
};
