import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Railway te da esta URL
  ssl: {
    rejectUnauthorized: false
  }
});

export default pool;