import React, { useEffect, useState } from 'react';
import FreeAppointment from './FreeAppointment';
import DoctorAppointment from './DoctorAppointment';

function FreeDoctorAppnContainer({appointments, setAppointments, doctor_id}) {

  const removeFreeAppointment = async (id) => {
      console.log("Deleted appointment with id: " + id)
      try{
            const res = await fetch(`https://fakehospital.onrender.com/api/doctor/deleteappointment/${id}`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json',},
                body: JSON.stringify({
                    appointment_id: id  //REV
                }),
            });
           
            const result = await res.json();

            if (res.ok) {
                console.log('Done!');
                const resDoctor = await fetch(`https://fakehospital.onrender.com/api/doctor/appointments/${doctor_id}`); 
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
    
      <div className='appointments-container new-app-container'>
        <div className="title app-title"><span class="material-symbols-outlined" style={{ color: '#60afff' }}>event_available</span><h3>MY FREE <b style={{ color: '#60afff' }}>APPOINTMENTS:</b></h3></div>
        <div className='dr-app-container'>
          
           {appointments.map((appn, index) => (
            <FreeAppointment key={index}  date={appn.date}
            time ={appn.time} 
            button={<button className='button-style button-style-free-app' onClick={()=> removeFreeAppointment(appn.appointment_id)}><span class="app-button-icon material-symbols-outlined">close</span></button>}></FreeAppointment>
           ))}
           
        </div>
      </div>

  );
}

export default FreeDoctorAppnContainer;