import React, { useEffect, useState } from 'react';


function Header({name, surname, logout}) {

  return (
    <nav>
      <div className='nav-container'>
        <div className="title"><span className="header-span material-symbols-outlined">emergency</span><h1>WebAppointment</h1></div>
        <div className='buttons-nav-container'>
            <div className="nav-user-container"> <img className="image-login" src="https://api.dicebear.com/9.x/fun-emoji/svg?seed=Alexander&randomizeIds=true&eyes=cute,closed&mouth=faceMask" alt="avatar" ></img><p>{name} {surname}</p></div>
            <button className="button-style" onClick={logout}>Log Out</button>
        </div>
      </div>
    </nav>
  );
}

export default Header;

