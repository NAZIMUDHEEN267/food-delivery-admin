
import { Pool } from 'pg'

const dbConnection = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWD,
    port: 5432
})

export default dbConnection;