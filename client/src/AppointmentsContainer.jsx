import React, { useEffect, useState } from 'react';
import Appointment from './Appointment';

function AppointmentsContainer() {

  return (
    
      <div className='appointments-container'>
        <div className="title"><span class="material-symbols-outlined">emergency</span><h3>My Appointments:</h3></div>
        <div className='app-container'>
           <Appointment></Appointment>
           <Appointment></Appointment>
           <Appointment></Appointment>
           <Appointment></Appointment>
           <Appointment></Appointment>
           <Appointment></Appointment>
           
        </div>
      </div>

  );
}

export default AppointmentsContainer;