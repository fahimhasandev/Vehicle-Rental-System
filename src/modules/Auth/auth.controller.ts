import { Request, Response } from 'express';
import { userServices } from './auth.service';

const signupUser = async (req: Request, res: Response) => {
	const { name, email, phone, role } = req.body;

	// Query will be successful and fail --so add try_catch
	try {
		const result = await userServices.signupUser(req.body);

		res.status(201).json({
			success: true,
			message: 'User registered successfully',
			data: result.rows[0],
		});
	} catch (error: any) {
		res.status(500).json({
			success: false,
			message: error?.message,
		});
	}
};

const signinUser = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	// Query will be successful and fail --so add try_catch
	try {
		const result = await userServices.signinUser(email, password);

		res.status(201).json({
			success: true,
			message: 'Login successful',
			data: result,
		});
	} catch (error: any) {
		res.status(500).json({
			success: false,
			message: error?.message,
		});
	}
};

export const userControllers = {
	signupUser,
	signinUser,
};
