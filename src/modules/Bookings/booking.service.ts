import { pool } from '../../config/db';

const createBooking = async (payload: Record<string, unknown>) => {
	const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

	const result = await pool.query(
		`INSERT INTO bookings (customer_id, vehicle_id, rent_start_date, rent_end_date) VALUES($1, $2, $3, $4) RETURNING *`,
		[customer_id, vehicle_id, rent_start_date, rent_end_date],
	);
	return result;
};

const getAllBookings = async () => {
	const result = await pool.query(`SELECT *  FROM vehicles`);
	return result;
};

export const updateBooking = async (payload: Record<string, unknown>, id: string) => {
	const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = payload;
	const result = await pool.query(
		`UPDATE vehicles SET vehicle_name=$1, type=$2,registration_number=$3, daily_rent_price=$4, availability_status=$5    WHERE id=$6 RETURNING *`,
		[vehicle_name, type, registration_number, daily_rent_price, availability_status, id],
	);
	return result;
};

export const bookingServices = {
	createBooking,
	getAllBookings,
	updateBooking,
};
