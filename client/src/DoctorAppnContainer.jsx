import React, { useEffect, useState } from 'react';
import Appointment from './Appointment';
import DoctorAppointment from './DoctorAppointment';

function DoctorAppnContainer({appointments, setAppointments, setFreeAppointments, doctor_id}) {

  const removeAppointment = async (id) => {
      console.log("Deleted appointment with id: " + id)
      try{
            const res = await fetch(`https://fakehospital.onrender.com/api/doctor/removeappointment/${id}`, {
                method: 'POST',
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
                const resFreeDoctor = await fetch(`https://fakehospital.onrender.com/api/doctor/freeappointments/${doctor_id}`);
                const dataFreeDoctor = await resFreeDoctor.json();
                setFreeAppointments(dataFreeDoctor);


            } else {
                console.log(`Error: ${result.error}`);
            }
          } catch (err) {
            console.log('Error' + err);
            }
  }

  return (
    
      <div className='appointments-container new-dr-app-container'>
        <div className="title app-title"><span class="material-symbols-outlined" style={{ color: '#60afff' }}>calendar_month</span><h3>UPCOMING <b style={{ color: '#60afff' }}>APPOINTMENTS:</b></h3></div>
        <div className='app-container'>
          
           {appointments.length === 0 ? <p className='welcome-text' >You don't have any appointments.</p> : appointments.map((appn, index) => (
            <DoctorAppointment key={index} name={appn.name}
            surname={appn.surname} date={appn.date}
            time ={appn.time} 
            button={<button className='button-style' onClick={()=> removeAppointment(appn.appointment_id)}><span class="app-button-icon material-symbols-outlined">close</span>Cancel</button>}></DoctorAppointment>
           ))}
           
        </div>
      </div>

  );
}

export default DoctorAppnContainer;