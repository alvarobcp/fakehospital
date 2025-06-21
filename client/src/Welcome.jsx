import React, { useEffect, useState } from 'react';


function Welcome({name, surname, phone, mail}) {

  return (
    <div className='container user-data-container'>
        <div>
            <h2 className='one-click'>ONE CLICK<br></br><b style={{ color: 'rgb(255, 96, 96)' }}>APPOINTMENT</b><span class="appointment-span material-symbols-outlined">web_traffic</span></h2>
            <p className='welcome-text'>Hello and welcome! At Fake Hospital, we make it easy for you to book and manage your doctor’s appointments — all in one place.</p>
            <p className='welcome-text current-data-text'>Your hospital current data:</p>
            <div className='user-contact-container'>
            <p className='data-text'><span class="material-symbols-outlined">contacts_product</span>{name} {surname}</p>
            <p className='data-text'><span class="material-symbols-outlined">call</span>{phone}</p>
            <p className='data-text'><span class="material-symbols-outlined">alternate_email</span>{mail}</p>
            </div>
            
        </div>
    </div>
  );
}

export default Welcome;