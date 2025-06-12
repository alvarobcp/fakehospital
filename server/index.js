require('dotenv').config();
const express = require('express');
const cors = require('cors');
import pool from './db.js';
const app = express();

app.use(cors());
app.use(express.json());



app.get('/api/pokemon', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM pokemon');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend escuchando en http://localhost:${PORT}`));