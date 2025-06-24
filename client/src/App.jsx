import { useEffect, useState } from 'react';
import Header from './Header';
import Welcome from './Welcome';
import AppointmentsContainer from './AppointmentsContainer';
import NewAppointment from './NewAppointment';
import DoctorAppnContainer from './DoctorAppnContainer';
import FreeDoctorAppnContainer from './FreeDoctorAppnContainer';
import AddAppointment from './AddAppointment';
import WaitingData from './WaitingData'
import { useAuth0 } from "@auth0/auth0-react";
import Login from './LogIn';

function App() {


  const [role, SetRole] = useState('');
  const [id, SetId] = useState(null);
  const [userData, setUserData] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [start, setStart] = useState(true);

  const [freeAppointments, setFreeAppointments] = useState([]);
  
  const { loginWithRedirect, logout, isAuthenticated, user, isLoading } = useAuth0();

  const defaultProfilePic = 'https://api.dicebear.com/9.x/fun-emoji/svg?seed=Alexander&randomizeIds=true&eyes=cute,closed&mouth=faceMask';

  useEffect(() => { //get token with role and id from useAth0
    if (isAuthenticated && user) {
      const role = user["https://fakehospital.com/role"];
      const id = user["https://fakehospital.com/id"];

      SetRole(role);
      SetId(id);
      console.log(`Role: ${role} id: ${id}`);
    }
  }, [isAuthenticated, user]);

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
  }, [role, id, userData]);

  useEffect(() => {
    if(role==='doctor' && id && userData){
    fetch(`https://fakehospital.onrender.com/api/${role}/freeappointments/${id}`)
      .then(res => res.json())
      .then(data => setFreeAppointments(data));
    }
  }, [role, id, userData]);


  if (isLoading) return <WaitingData></WaitingData>;

  if (!isAuthenticated) {
    return (
      <Login button={<button className='button-style' onClick={() => loginWithRedirect()}>Log In</button>}></Login>
    );
  }

  return (
    <>
    {role === 'doctor' ? (

    <>
        {userData ? <Header name={userData.doctor_name} surname={userData.doctor_surname} logout={() => logout({ returnTo: window.location.origin })} profile_pic={userData.profile_pic}></Header> : <Header name={''} surname={''} logout={() => logout({ returnTo: window.location.origin })} profile_pic={defaultProfilePic}></Header>}
        {userData ? <Welcome name={userData.doctor_name} surname={userData.doctor_surname} phone={userData.phone} mail={userData.mail} credential={userData.doctor_credential} role={'doctor'}></Welcome> : <WaitingData></WaitingData>}
        {appointments ? <DoctorAppnContainer appointments={appointments} setAppointments={setAppointments} setFreeAppointments={setFreeAppointments} doctor_id={id}></DoctorAppnContainer> : <div></div>}
        {appointments ? <FreeDoctorAppnContainer appointments={freeAppointments} setAppointments={setAppointments} setFreeAppointments={setFreeAppointments} doctor_id={id}></FreeDoctorAppnContainer> : <div></div>}
        {appointments ? <AddAppointment setAppointments={setAppointments} setFreeAppointments={setFreeAppointments} doctor_id={id}></AddAppointment> : <WaitingData></WaitingData>}
    </>

     ) : (
   <>
        {userData ? <Header name={userData.name} surname={userData.surname} logout={() => logout({ returnTo: window.location.origin })} profile_pic={userData.profile_pic}></Header> : <Header name={''} surname={''} logout={() => logout({ returnTo: window.location.origin })} profile_pic={defaultProfilePic}></Header>}
        {userData ? <Welcome name={userData.name} surname={userData.surname} phone={userData.phone} mail={userData.mail} credential={''} role={'hospital'}></Welcome> : <WaitingData></WaitingData>}
        {appointments ? <AppointmentsContainer appointments={appointments} setAppointments={setAppointments} hospital_id={id}></AppointmentsContainer> : <div></div>}
        {userData ? <NewAppointment setAppointments={setAppointments} patient_id={id} isStart={start} setStart={setStart} ></NewAppointment> : <div></div>}
   </>
  
  )}
 
  <div className='container help-container'><p className='end-text'>In case you need some help, please contact us at +34 655 788 000 or send an email to info@fakehospital.com — We will contact you as soon as posible.</p></div>
  <footer className='container' style={{ textAlign: 'center' }}><p className='footer-text'>Developed by Álvaro Delgado to practise React, CSS, Firebase, Auth0, Databases and Node.js with Express.</p></footer>
 </>
 
  );

}

export default App;