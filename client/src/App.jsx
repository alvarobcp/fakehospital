import { useEffect, useState } from 'react';
import Header from './Header';
import Welcome from './Welcome';
import AppointmentsContainer from './AppointmentsContainer';
import NewAppointment from './NewAppointment';

function App() {

  const globalVAriable = 'hospital'; //hospital for user
  
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  

  useEffect(() => {
    fetch(`https://fakehospital.onrender.com/api/doctor/${3}`)
      .then(res => res.json())
      .then(data => setUser(data));
  }, []);


  useEffect(() => {
    fetch(`https://fakehospital.onrender.com/api/${globalVAriable}/appointments/${1}`)
      .then(res => res.json())
      .then(data => setAppointments(data));
  }, [user]);

  return (
    <>
    {user ? <Header name={user.name} surname={user.surname}></Header> : <div></div>}
    {user ? <Welcome name={user.name} surname={user.surname} phone={user.phone} mail={user.mail}></Welcome> : <div>Waiting...</div>}
    {appointments ? <AppointmentsContainer appointments={appointments} setAppointments={setAppointments} patient_id={1}></AppointmentsContainer> : <div></div>}
    {user ? <NewAppointment setAppointments={setAppointments} patient_id={1}></NewAppointment> : <div></div>}
    </>
  );
}

export default App;