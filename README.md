# Install The Package

- `npm install express jsonwebtoken dotenv bcryptjs pg`
- `npm i --save-dev @types/express`
- `npm i --save-dev @types/pg`

## Folder and Files

**Folder:**

- src/config
    - index.ts
    - db.ts
- src/middleware
- src/modules
- src/types

**File System**

- src/app.ts
- src/server.ts

**src/config/index.ts**

```ts
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const config = {
	connection_str: process.env.POSTGRESS_CONNECTION_STRING,
	port: process.env.PORT,
	jwtSecret: process.env.JWT_SECRET,
};

export default config;
```

## What did I learn?

- Controller passed `const { name, email, phone, role } = req.body;` to service
- Service then, hashed the password:

```ts
//password hash
const salt = await bcrypt.genSalt(10);
// const hashedPass = await bcrypt.hash(password as string, 10);
const hashedPass = await bcrypt.hash(password as string, salt);

console.log(hashedPass);
```

- In the service layer, Interacting with database

```ts
const result = await pool.query(
	`INSERT INTO users(name, email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING id, name, email, phone, role`,
	[name, email, hashedPass, phone, role],
);
```

**RETURNING id, name, email, phone, role**
