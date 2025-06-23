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
    const result = await pool.query('SELECT appointment.id AS appointment_id, doctor_name, doctor_surname, date, time, doctor_credential, speciality, patient_id FROM appointment JOIN doctor ON appointment.doctor_id = doctor.id WHERE doctor.speciality = $1 AND patient_id IS NULL ORDER BY date', [speciality]);
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

app.get('/api/doctor/:id', async (req, res) => { //get doctor data
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

app.get('/api/hospital/appointments/:id', async (req, res) => { 
  const {id} = req.params;
  try {
    const result = await pool.query('SELECT appointment.id AS appointment_id, doctor_name, doctor_surname, date, time, doctor_credential, speciality FROM appointment JOIN patient ON appointment.patient_id = patient.id JOIN doctor ON appointment.doctor_id = doctor.id WHERE patient.id = $1 ORDER BY date' , [id]);
    res.json(result.rows);
    console.log(result.rows);
  } catch (err) {
    console.error('Error al consultar la base de datos:', err);
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/doctor/appointments/:id', async (req, res) => { //get array appointments by doctor id
  const {id} = req.params;
  try {
    const result = await pool.query('SELECT appointment.id AS appointment_id, name, surname, date, time, doctor_credential, speciality FROM appointment JOIN patient ON appointment.patient_id = patient.id JOIN doctor ON appointment.doctor_id = doctor.id WHERE doctor.id = $1 ORDER BY date' , [id]);
    res.json(result.rows);
    console.log(result.rows);
  } catch (err) {
    console.error('Error al consultar la base de datos:', err);
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/doctor/freeappointments/:id', async (req, res) => { //get FREE array appointments by doctor id
  const {id} = req.params;
  try {
    const result = await pool.query('SELECT appointment.id AS appointment_id, date, time FROM appointment WHERE doctor_id = $1 AND patient_id IS NULL ORDER BY date', [id]);
    res.json(result.rows);
    console.log(result.rows);
  } catch (err) {
    console.error('Error al consultar la base de datos:', err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/hospital/addappointment/:id/:patientId', async (req, res) => {

  const appointment_id = req.params.id;
  const patient_id = req.params.patientId;

  try {
    const result = await pool.query(
      'UPDATE appointment SET patient_id = $1 WHERE id = $2 RETURNING *',
      [patient_id, appointment_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error diving the appointment' });
  }

});


app.post('/api/hospital/removeappointment/:id', async (req, res) => {

  const appointment_id = req.params.id;

  try {
    const result = await pool.query(
      'UPDATE appointment SET patient_id = NULL WHERE id = $1 RETURNING *',
      [appointment_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error diving the appointment' });
  }

});


app.post('/api/doctor/removeappointment/:id', async (req, res) => { //remove appointment setting the patient id to null

  const appointment_id = req.params.id;

  try {
    const result = await pool.query(
      'UPDATE appointment SET patient_id = NULL WHERE id = $1 RETURNING *',
      [appointment_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error diving the appointment' });
  }

});

app.post('/api/doctor/newappointment', async (req, res) => { //NEW APPOINTMENT

  const {doctor_id, date, time} = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO appointment (date, time, doctor_id) VALUES($1, $2, $3)',
      [date, time, doctor_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error diving the appointment' });
  }

});


app.delete('/api/doctor/deleteappointment/:id', async (req, res) => { //DELETE a free appointment

  const appointment_id = req.params.id;

  try {
    const result = await pool.query(
      'DELETE FROM appointment WHERE id = $1',
      [appointment_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error diving the appointment' });
  }

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend escuchando en http://localhost:${PORT}`);
});


//https://fakehospital.onrender.com/api/hospital/appointment?speciality=${speciality}