import { useEffect, useState } from 'react';
import Header from './Header';
import Welcome from './Welcome';
import AppointmentsContainer from './AppointmentsContainer';
import NewAppointment from './NewAppointment';

function App() {
  const [doctor, setDoctor] = useState(null);
  const [patient, setPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetch(`https://fakehospital.onrender.com/api/hospital/${1}`)
      .then(res => res.json())
      .then(data => setPatient(data));
  }, []);


  useEffect(() => {
    fetch(`https://fakehospital.onrender.com/api/hospital/appointments/${1}`)
      .then(res => res.json())
      .then(data => setAppointments(data));
  }, [patient]);

  return (
    <>
    {patient ? <Header name={patient.name} surname={patient.surname}></Header> : <div></div>}
    {patient ? <Welcome name={patient.name} surname={patient.surname} phone={patient.phone} mail={patient.mail}></Welcome> : <div>Waiting...</div>}
    {appointments ? <AppointmentsContainer appointments={appointments} setAppointments={setAppointments} patient_id={1}></AppointmentsContainer> : <div></div>}
    {patient ? <NewAppointment setAppointments={setAppointments} patient_id={1}></NewAppointment> : <div></div>}
    </>
  );
}

export default App;