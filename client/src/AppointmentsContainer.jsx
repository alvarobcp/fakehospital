import React, { useEffect, useState } from 'react';
import Appointment from './Appointment';

function AppointmentsContainer({appointments, setAppointments, hospital_id}) {

  const removeAppointment = async (id) => {
      console.log("Deleted appointment with id: " + id)
      try{
            const res = await fetch(`https://fakehospital.onrender.com/api/hospital/removeappointment/${id}`, {
                method: 'POST',
            });
           
            const result = await res.json();

            if (res.ok) {
                console.log('Done!');
                const resPatient = await fetch(`https://fakehospital.onrender.com/api/hospital/appointments/${hospital_id}`);
                const dataPatient = await resPatient.json();
                setAppointments(dataPatient);


            } else {
                console.log(`Error: ${result.error}`);
            }
          } catch (err) {
            console.log('Error' + err);
            }
  }

  return (
    
      <div className='appointments-container'>
        <div className="title app-title"><span class="material-symbols-outlined" style={{ color: '#60afff' }}>calendar_month</span><h3>UPCOMING <b style={{ color: '#60afff' }}>APPOINTMENTS:</b></h3></div>
        <div className='app-container'>

           {appointments.length === 0 ? <p className='welcome-text' >You don't have any appointments.</p> :  appointments.map((appn, index) => (
            <Appointment key={index} doctor_name={appn.doctor_name}
            doctor_surname={appn.doctor_surname} speciality={appn.speciality} date={appn.date}
            time ={appn.time} 
            button={<button className='button-style' onClick={()=> removeAppointment(appn.appointment_id)}><span class="app-button-icon material-symbols-outlined">close</span>Cancel</button>}></Appointment>
           ))}
           
        </div>
      </div>

  );
}

export default AppointmentsContainer;