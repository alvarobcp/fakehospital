import React, { useEffect, useState } from 'react';


function Login({button}) {

  return (
    <div className='login-container'>
        
        <h2 className='one-click'>ONE CLICK<br></br><b style={{ color: 'rgb(255, 96, 96)' }}>APPOINTMENT</b><span class="appointment-span material-symbols-outlined">web_traffic</span></h2>
        {button}
        <p className='intro-text'>An appointment manager from Fake Hospital.</p>
        <p className='end-text'>You may be registered in our hospital data to use the system — If not, please contact us at +34 655 788 000</p>
        <div className="title"><span className="header-span material-symbols-outlined">emergency</span><h1>fakeHospital</h1></div>
        
        <footer className='container' style={{ textAlign: 'center' }}><p className='footer-text'>Developed by Álvaro Delgado to practise React, CSS, Firebase, Auth0, Databases and Node.js with Express.</p></footer>
    </div>
  );
}

export default Login;