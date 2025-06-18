import React, { useEffect, useState } from 'react';
import Appointment from './Appointment';
import DoctorAppointment from './DoctorAppointment';

function AddAppointment({appointments, setAppointments}) {

    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

  const addAppointment = async (date, time) => {
      console.log(`Added appointment on ${date} and ${time}`);
      try{
            const res = await fetch(`https://fakehospital.onrender.com/api/doctor/newappointment/`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json',},
                body: JSON.stringify({
                    doctor_id: 3, //REV
                    date: date,
                    time: time  
                }),
            });
           
            const result = await res.json();

            if (res.ok) {
                console.log('Done!');
                const resDoctor = await fetch(`https://fakehospital.onrender.com/api/doctor/appointments/${3}`); //remember id must be from global, now 3 just to develop
                const dataDoctor = await resDoctor.json();
                setAppointments(dataDoctor);


            } else {
                console.log(`Error: ${result.error}`);
            }
          } catch (err) {
            console.log('Error' + err);
            }
  }

   const submitAppointment = (e) => {
    e.preventDefault();
    if (!date || !time) {
      alert("Por favor, completa ambos campos.");
      return;
    }

    const updateDate = date;
    const updateTime = `${time}:00`;

    addAppointment(updateDate, updateTime);



    setDate("");
    setTime("");




}


  return (
    
      <div className='appointments-container'>
        <div className="title"><span className="material-symbols-outlined">emergency</span><h3>Add a free appointment:</h3></div>
        <div className='add-container'>
           <form onSubmit={submitAppointment} className="add-form">
                <label>
                    Fecha:
                    <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    />
                </label>

                <label>
                    Hora:
                    <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    />
                </label>

                <button type="submit">Agregar Cita</button>
            </form>
           
        </div>
      </div>

  );
}

export default AddAppointment;