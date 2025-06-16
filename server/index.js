import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import pool from './db.js';

dotenv.config();
console.log('Conectando a:', process.env.DATABASE_URL);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/hospital/:id', async (req, res) => {
  const {id} = req.params;
  try {
    const result = await pool.query('SELECT * FROM doctor WHERE id = $1', [id]);
    res.json(result.rows[0]);
    console.log(result.rows[0]);
  } catch (err) {
    console.error('Error al consultar la base de datos:', err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend escuchando en http://localhost:${PORT}`);
});