import bcrypt from 'bcryptjs';
import { pool } from '../../config/db';
import config from '../../config';
import jwt from 'jsonwebtoken';

const signupUser = async (payload: Record<string, unknown>) => {
	const { name, email, password, phone, role } = payload;

	//password hash
	const salt = await bcrypt.genSalt(10);
	// const hashedPass = await bcrypt.hash(password as string, 10);
	const hashedPass = await bcrypt.hash(password as string, salt);

	console.log(hashedPass);

	const result = await pool.query(
		`INSERT INTO users(name, email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING id, name, email, phone, role`,
		[name, email, hashedPass, phone, role],
	);

	// console.log(result.rows.length); //1

	return result;
};

// Sign In
const signinUser = async (email: string, password: string) => {
	const lowerCaseEmail = email.trim().toLowerCase();
	const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [lowerCaseEmail]);

	// if it finds something
	if (result.rows.length === 0) {
		return null;
	}

	const userWithPassword = result.rows[0];

	const match = await bcrypt.compare(password, userWithPassword.password);

	if (!match) {
		return false;
	}

	const token = jwt.sign(
		{ userId: userWithPassword.id, role: userWithPassword.role, email: userWithPassword.email },
		config.jwtSecret as string,
		{
			expiresIn: '30d',
		},
	);

	console.log({ token });

	// pulling the password from this user with ...rest operator and show that rest below.
	const { password: _, ...user } = userWithPassword;

	return { token, user };
};

export const userServices = {
	signupUser,
	signinUser,
};
