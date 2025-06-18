import React from 'react';

function FreeAppointment({key, id, date, time, button}) {

 

  const formatDate = (date) => {
  const formated_date = new Date(date);
  return new Intl.DateTimeFormat('es-ES').format(formated_date);
};

  return (
    <div className="appointment-component">
        <p>{formatDate(date)}</p>
        <p>{time} h.</p>
        {button}
    </div>
  );
}

export default FreeAppointment;

