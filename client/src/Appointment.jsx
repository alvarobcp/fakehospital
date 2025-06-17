import React from 'react';

function Appointment({key, id, doctor_name, doctor_surname, speciality, date, time, button}) {

 

  const formatDate = (date) => {
  const formated_date = new Date(date);
  return new Intl.DateTimeFormat('es-ES').format(formated_date);
};

  return (
    <div className="appointment-component">
        <p>Dr. {doctor_name} {doctor_surname}</p>
        <p>{speciality}</p>
        <p>{formatDate(date)}</p>
        <p>{time} h.</p>
        {button}
    </div>
  );
}

export default Appointment;

