import sql from 'mssql';
import { config } from 'dotenv';
config();

const dbSetting = {
    user: process.env.USER_SQL,
    password: process.env.PASSWORD_SQL,
    server: process.env.SERVER_SQL,
    database: process.env.DATABASE_SQL,
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
}

async function getConnection() {
    try {
        const pool = await sql.connect(dbSetting);
        return pool;
    } catch (error) {
        console.log(error);
    }
}

export {
    getConnection,
    sql
}