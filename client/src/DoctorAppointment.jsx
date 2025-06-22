import React from 'react';

function DoctorAppointment({key, id, name, surname, date, time, button}) {

 

  const formatDate = (date) => {
  const formated_date = new Date(date);
  return new Intl.DateTimeFormat('es-ES').format(formated_date);
};

const formatTime = (time) => {
  return time.slice(0, -3);
}

  return (
    <div className="appointment-component new-app">
        <p className='app-speciality-dr'>Patient:</p>
        <p className='app-name-dr'>{name} {surname}</p>
        <p className='app-date'><span class="material-symbols-outlined" style={{ color: '#60afff' }}>event</span>{formatDate(date)}</p>
        <p className='app-time'><span class="material-symbols-outlined" style={{ color: '#60afff' }}>nest_clock_farsight_analog</span>{formatTime(time)} h.</p>
        {button}
    </div>
  );
}

export default DoctorAppointment;

