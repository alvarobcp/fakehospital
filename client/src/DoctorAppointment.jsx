import React from 'react';

function DoctorAppointment({key, id, name, surname, date, time, button}) {

 

  const formatDate = (date) => {
  const formated_date = new Date(date);
  return new Intl.DateTimeFormat('es-ES').format(formated_date);
};

  return (
    <div className="appointment-component">
        <p>Patient:</p>
        <p>{name} {surname}</p>
        <p>{formatDate(date)}</p>
        <p>{time} h.</p>
        {button}
    </div>
  );
}

export default DoctorAppointment;

