const { Pool } = require('pg');
require('dotenv').config();

console.log("DATABASE_URL:", process.env.DATABASE_URL ? "Loaded" : "Not Found");

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false, // Required for Render
    }
});

module.exports = pool;
