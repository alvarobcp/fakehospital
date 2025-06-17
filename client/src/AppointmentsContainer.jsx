import React, { useEffect, useState } from 'react';
import Appointment from './Appointment';

function AppointmentsContainer({appointments}) {

  return (
    
      <div className='appointments-container'>
        <div className="title"><span className="material-symbols-outlined">emergency</span><h3>My Appointments:</h3></div>
        <div className='app-container'>
          
           {appointments.map((appn, index) => (
            <Appointment key={index} doctor_name={appn.doctor_name}
            doctor_surname={appn.doctor_surname} speciality={appn.speciality} date={appn.date}
            time ={appn.time} button={<button>Cancel</button>}></Appointment>
           ))}
           
        </div>
      </div>

  );
}

export default AppointmentsContainer;