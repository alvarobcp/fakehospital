import React, { useEffect, useState } from 'react';


function Header() {

  return (
    <nav>
      <div className='nav-container'>
        <div className="title"><span className="material-symbols-outlined">emergency</span><h1>WebAppointment</h1></div>
        <div className='buttons-nav-container'>
            <div className="nav-user-container"><span className="material-symbols-outlined">account_circle</span><p>Alvaro Delgado</p></div>
            <button className="button-style" >Log Out</button>
        </div>
      </div>
    </nav>
  );
}

export default Header;