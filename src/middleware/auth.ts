import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';

const setAuthHeader = (...roles: string[]) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			// get the token in the header
			const jwtToken = req?.headers?.authorization; // "Bearer xxx"

			if (!jwtToken) {
				return res.status(500).json({ message: 'You are nto allowed!!' });
			}

			const token = jwtToken.trim().split(' ')[1];

			console.log(token);

			const decoded = jwt.verify(token, config.jwtSecret as string) as JwtPayload;
			console.log('Line 20: ', decoded);

			// why did I set req.user into decodec? --> any can access and compare (jwt email === )
			// req.role = decoded as JwtPayload;

			if (roles.length && !roles.includes(decoded.role as string)) next();
		} catch (error: any) {
			res.status(500).json({
				success: false,
				message: error.message,
			});
		}
	};
};

export default setAuthHeader;
