import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import pool from './db.js';

dotenv.config();
console.log('Conectando a:', process.env.DATABASE_URL);

const app = express();
app.use(cors());
app.use(express.json());


app.get('/api/hospital/appointment', async (req, res) => {
  const speciality = req.query.speciality;
  console.log(speciality)
  try {
    const result = await pool.query('SELECT doctor_name, doctor_surname, date, time, doctor_credential, speciality, patient_id FROM appointment JOIN doctor ON appointment.doctor_id = doctor.id WHERE doctor.speciality = $1 AND patient_id IS NULL', [speciality]);
    res.json(result.rows);
    console.log(result.rows);
  } catch (err) {
    console.error('Error al consultar la base de datos:', err);
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/hospital/:id', async (req, res) => {
  const {id} = req.params;
  try {
    const result = await pool.query('SELECT * FROM patient WHERE id = $1', [id]);
    res.json(result.rows[0]);
    console.log(result.rows[0]);
  } catch (err) {
    console.error('Error al consultar la base de datos:', err);
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/hospital/appointments/:id', async (req, res) => {
  const {id} = req.params;
  try {
    const result = await pool.query('SELECT doctor_name, doctor_surname, date, time, doctor_credential, speciality FROM appointment JOIN patient ON appointment.patient_id = patient.id JOIN doctor ON appointment.doctor_id = doctor.id WHERE patient.id = $1', [id]);
    res.json(result.rows);
    console.log(result.rows);
  } catch (err) {
    console.error('Error al consultar la base de datos:', err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend escuchando en http://localhost:${PORT}`);
});


//https://fakehospital.onrender.com/api/hospital/appointment?speciality=${speciality}