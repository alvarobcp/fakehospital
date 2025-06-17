import React, { useEffect, useState } from 'react';
import Appointment from './Appointment';

function AppointmentsContainer({appointments, setAppointments}) {

  const removeAppointment = async (id) => {
      console.log("Deleted appointment with id: " + id)
      try{
            const res = await fetch(`https://fakehospital.onrender.com/api/hospital/removeappointment/${id}`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json',},
                body: JSON.stringify({
                    appointment_id: id  //REV
                }),
            });
           
            const result = await res.json();

            if (res.ok) {
                console.log('Done!');
                const resPatient = await fetch(`https://fakehospital.onrender.com/api/hospital/appointments/${1}`);
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
        <div className="title"><span className="material-symbols-outlined">emergency</span><h3>My Appointments:</h3></div>
        <div className='app-container'>
          
           {appointments.map((appn, index) => (
            <Appointment key={index} doctor_name={appn.doctor_name}
            doctor_surname={appn.doctor_surname} speciality={appn.speciality} date={appn.date}
            time ={appn.time} 
            button={<button onClick={()=> removeAppointment(appn.appointment_id)}>Cancel</button>}></Appointment>
           ))}
           
        </div>
      </div>

  );
}

export default AppointmentsContainer;