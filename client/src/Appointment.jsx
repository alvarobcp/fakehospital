import React from 'react';

function Appointment({key, id, doctor_name, doctor_surname, speciality, date, time, button}) {

 

  const formatDate = (date) => {
  const formated_date = new Date(date);
  return new Intl.DateTimeFormat('es-ES').format(formated_date);
};

const formatTime = (time) => {
  return time.slice(0, -3);
}

  return (
    <div className="appointment-component">
        <p className='app-name'>Dr. {doctor_name} {doctor_surname}</p>
        <p className='app-speciality'>{speciality}</p>
        <p className='app-date'><span class="material-symbols-outlined" style={{ color: '#60afff' }}>event</span>{formatDate(date)}</p>
        <p className='app-time'><span class="material-symbols-outlined" style={{ color: '#60afff' }}>nest_clock_farsight_analog</span>{formatTime(time)} h.</p>
        {button}
    </div>
  );
}

export default Appointment;

