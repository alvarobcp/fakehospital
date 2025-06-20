import { useEffect, useState } from 'react';
import Header from './Header';
import Welcome from './Welcome';
import AppointmentsContainer from './AppointmentsContainer';
import NewAppointment from './NewAppointment';
import DoctorAppnContainer from './DoctorAppnContainer';
import FreeDoctorAppnContainer from './FreeDoctorAppnContainer';
import AddAppointment from './AddAppointment';

function App() {

  const globalVAriable = 'hospital'; //hospital for user
  const [role, SetRole] = useState('hospital'); //must change after login as the id
  const [id, SetId] = useState(1);
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);

  const [freeAppointments, setFreeAppointments] = useState([]);
  

  useEffect(() => {

    fetch(`https://fakehospital.onrender.com/api/${role}/${id}`)
      .then(res => res.json())
      .then(data => setUser(data));
  }, []);


  useEffect(() => {
    fetch(`https://fakehospital.onrender.com/api/${role}/appointments/${id}`)
      .then(res => res.json())
      .then(data => setAppointments(data));
  }, [user]);

  useEffect(() => {
    fetch(`https://fakehospital.onrender.com/api/${role}/freeappointments/${id}`)
      .then(res => res.json())
      .then(data => setFreeAppointments(data));
  }, [appointments]);

  return (
    <>
    {role === 'doctor' ? (

    <>
        {user ? <Header name={user.doctor_name} surname={user.doctor_surname}></Header> : <div></div>}
        {appointments ? <DoctorAppnContainer appointments={appointments} setAppointments={setAppointments} patient_id={1}></DoctorAppnContainer> : <div>Waiting data</div>}
        {appointments ? <FreeDoctorAppnContainer appointments={freeAppointments} setAppointments={setAppointments} patient_id={1}></FreeDoctorAppnContainer> : <div>Waiting data</div>}
        {appointments ? <AddAppointment setAppointments={setAppointments}></AddAppointment> : <div>Waiting data</div>}
    </>

     ) : (
   <>
    {user ? <Header name={user.name} surname={user.surname}></Header> : <div></div>}
    {user ? <Welcome name={user.name} surname={user.surname} phone={user.phone} mail={user.mail}></Welcome> : <div>Waiting...</div>}
    {appointments ? <AppointmentsContainer appointments={appointments} setAppointments={setAppointments} patient_id={1}></AppointmentsContainer> : <div></div>}
    {user ? <NewAppointment setAppointments={setAppointments} patient_id={1}></NewAppointment> : <div></div>}
   </>
  
  )}
 </>
  );

}

export default App;


//Cosas que hacer:
// [] tengo va cariable patient_id que la paso a los componentes, rev y quitar
// [] login que me de role e id