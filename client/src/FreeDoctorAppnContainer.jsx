import React, { useEffect, useState } from 'react';
import FreeAppointment from './FreeAppointment';
import DoctorAppointment from './DoctorAppointment';

function FreeDoctorAppnContainer({appointments, setAppointments}) {

  const removeFreeAppointment = async (id) => {
      console.log("Deleted appointment with id: " + id)
      try{
            const res = await fetch(`https://fakehospital.onrender.com/api/doctor/deleteappointment/${id}`, {
                method: 'DELETE', //must be delete??
                headers: {'Content-Type': 'application/json',},
                body: JSON.stringify({
                    appointment_id: id  //REV
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

  return (
    
      <div className='appointments-container'>
        <div className="title"><span className="material-symbols-outlined">emergency</span><h3>My free Appointments:</h3></div>
        <div className='app-container'>
          
           {appointments.map((appn, index) => (
            <FreeAppointment key={index}  date={appn.date}
            time ={appn.time} 
            button={<button onClick={()=> removeFreeAppointment(appn.appointment_id)}>Delete</button>}></FreeAppointment>
           ))}
           
        </div>
      </div>

  );
}

export default FreeDoctorAppnContainer;