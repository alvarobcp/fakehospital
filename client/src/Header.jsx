import React, { useEffect, useState } from 'react';


function Header({name, surname, logout, profile_pic}) {



  return (
    <nav>
      <div className='nav-container'>
        <div className="title"><span className="header-span material-symbols-outlined">emergency</span><h1>fakeHospital</h1></div>
        <div className='buttons-nav-container'>
            <div className="nav-user-container"> <img className="image-login" src={profile_pic} alt="avatar" ></img><p>{name} {surname}</p></div>
            <button className="button-style" onClick={logout}>Log Out</button>
        </div>
      </div>
    </nav>
  );
}

export default Header;

