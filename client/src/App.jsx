import { useEffect, useState } from 'react';
import Header from './Header';
import Welcome from './Welcome';
import AppointmentsContainer from './AppointmentsContainer';
import NewAppointment from './NewAppointment';
import DoctorAppnContainer from './DoctorAppnContainer';
import FreeDoctorAppnContainer from './FreeDoctorAppnContainer';
import AddAppointment from './AddAppointment';
import { useAuth0 } from "@auth0/auth0-react";
import Login from './LogIn';

function App() {


  const [role, SetRole] = useState('');
  const [id, SetId] = useState(null);
  const [userData, setUserData] = useState(null);
  const [appointments, setAppointments] = useState([]);

  const [freeAppointments, setFreeAppointments] = useState([]);
  
  const { loginWithRedirect, logout, isAuthenticated, user, isLoading } = useAuth0();

  useEffect(() => { //get token with role and id from useAth0
    if (isAuthenticated && user) {
      const role = user["https://fakehospital.com/role"];
      const id = user["https://fakehospital.com/id"];

      SetRole(role);
      SetId(id);
      console.log(`Role: ${role} id: ${id}`);
    }
  }, [userData, isAuthenticated]);

  useEffect(() => {
    if(role && id) {
    fetch(`https://fakehospital.onrender.com/api/${role}/${id}`)
      .then(res => res.json())
      .then(data => setUserData(data));
    }
  }, [role, id]);


  useEffect(() => {
    if(role && id && userData){
    fetch(`https://fakehospital.onrender.com/api/${role}/appointments/${id}`)
      .then(res => res.json())
      .then(data => setAppointments(data));
    }
  }, [role, id, userData, appointments]);

  useEffect(() => {
    if(role==='doctor' && id && userData){
    fetch(`https://fakehospital.onrender.com/api/${role}/freeappointments/${id}`)
      .then(res => res.json())
      .then(data => setFreeAppointments(data));
    }
  }, [role, id, userData, appointments]);


  if (isLoading) return <div>Cargando...</div>;

  if (!isAuthenticated) {
    return (
      <Login button={<button className='button-style' onClick={() => loginWithRedirect()}>Log In</button>}></Login>
    );
  }

  return (
    <>
    {role === 'doctor' ? (

    <>
        {userData ? <Header name={userData.doctor_name} surname={userData.doctor_surname} logout={() => logout({ returnTo: window.location.origin })}></Header> : <div></div>}
        {userData ? <Welcome name={userData.doctor_name} surname={userData.doctor_surname} phone={userData.phone} mail={userData.mail} credential={userData.doctor_credential} role={'doctor'}></Welcome> : <div>Waiting...</div>}
        {appointments ? <DoctorAppnContainer appointments={appointments} setAppointments={setAppointments} doctor_id={id}></DoctorAppnContainer> : <div>Waiting data</div>}
        {appointments ? <FreeDoctorAppnContainer appointments={freeAppointments} setAppointments={setAppointments} doctor_id={id}></FreeDoctorAppnContainer> : <div>Waiting data</div>}
        {appointments ? <AddAppointment setAppointments={setAppointments} doctor_id={id}></AddAppointment> : <div>Waiting data</div>}
    </>

     ) : (
   <>
        {userData ? <Header name={userData.name} surname={userData.surname} logout={() => logout({ returnTo: window.location.origin })}></Header> : <div></div>}
        {userData ? <Welcome name={userData.name} surname={userData.surname} phone={userData.phone} mail={userData.mail} credential={''} role={'hospital'}></Welcome> : <div>Waiting...</div>}
        {appointments ? <AppointmentsContainer appointments={appointments} setAppointments={setAppointments} hospital_id={id}></AppointmentsContainer> : <div></div>}
        {userData ? <NewAppointment setAppointments={setAppointments} patient_id={id}></NewAppointment> : <div></div>}
   </>
  
  )}
  <div className='container help-container'><p className='end-text'>In case you need some help, please contact us at +34 655 788 000 or send an email to info@fakehospital.com — We will contact you as soon as posible.</p></div>
  <footer className='container' style={{ textAlign: 'center' }}><p className='footer-text'>Developed by Álvaro Delgado to practise React, CSS, Firebase, Auth0, Databases and Node.js with Express.</p></footer>
  <button onClick={() => logout({ returnTo: window.location.origin})}>Cerrar la sesión (dev)</button>
 </>
 
  );

}

export default App;


//Cosas que hacer:
// [] tengo va cariable patient_id que la paso a los componentes, rev y quitar
// [x] login que me de role e id