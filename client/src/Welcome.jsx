import React, { useEffect, useState } from 'react';


function Welcome() {

  return (
    <div className='container user-data-container'>
        <div>
            <h2>Welcome back Álvaro</h2>
            <h3>Your current data:</h3>
            <p>Álvaro Delgado Ramos</p>
            <p>658487001</p>
            <p>alvaro@gmail.com</p>
            <button className="button-style user-button" >New appointment</button>
        </div>
    </div>
  );
}

export default Welcome;