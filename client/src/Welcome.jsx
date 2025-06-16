import React, { useEffect, useState } from 'react';


function Welcome({name, surname, phone, mail}) {

  return (
    <div className='container user-data-container'>
        <div>
            <h2>Welcome back {name}</h2>
            <h3>Your current data:</h3>
            <p>{name} {surname}</p>
            <p>{phone}</p>
            <p>{mail}</p>
            <button className="button-style user-button" >New appointment</button>
        </div>
    </div>
  );
}

export default Welcome;