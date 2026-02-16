import { Pool } from 'pg';
import config from '.';

export const pool = new Pool({
	connectionString: `${config.connection_str}`,
});

const initDB = async () => {
	await pool.query(`
    CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL CHECK(email = LOWER(email)),
        password TEXT NOT NULL CHECK(CHAR_LENGTH(password) >= 6),
        phone VARCHAR(20) NOT NULL,
        role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'customer'))
    )`);
};

export default initDB;
