import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import pool from './db.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/hospital', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM doctor');
    res.json(result.rows);
  } catch (err) {
    console.error('Error al consultar la base de datos:', err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend escuchando en http://localhost:${PORT}`);
});