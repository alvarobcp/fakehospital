import { useEffect, useState } from 'react';
import Header from './Header';
import Welcome from './Welcome';
import AppointmentsContainer from './AppointmentsContainer';

function App() {
  const [doctor, setDoctor] = useState(null);
  const [patient, setPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetch(`https://fakehospital.onrender.com/api/hospital/${3}`)
      .then(res => res.json())
      .then(data => setPatient(data));
  }, []);


  useEffect(() => {
    fetch(`https://fakehospital.onrender.com/api/hospital/appointments/${3}`)
      .then(res => res.json())
      .then(data => setAppointments(data));
  }, [patient]);

  return (
    <>
    <Header></Header>
    <Welcome name={patient.name} surname={patient.surname} phone={patient.phone} mail={patient.mail}></Welcome>
    <AppointmentsContainer></AppointmentsContainer>

    <div>
      <h1>Doctors</h1>
       {console.log("DATOS RECIBIDOS: ", doctor)}
      <ul>
         {doctor ? <li>{doctor.name}</li> : <li>Waiting...</li>}  
      </ul>
    </div>
    </>
  );
}

export default App;