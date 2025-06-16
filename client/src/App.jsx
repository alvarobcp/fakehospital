import { useEffect, useState } from 'react';
import Header from './Header';
import Welcome from './Welcome';
import AppointmentsContainer from './AppointmentsContainer';

function App() {
  const [doctor, setDoctor] = useState([]);

  useEffect(() => {
    fetch(`https://fakehospital.onrender.com/api/hospital/${3}`)
      .then(res => res.json())
      .then(data => setDoctor(data));
  }, []);

  return (
    <>
    <Header></Header>
    <Welcome></Welcome>
    <AppointmentsContainer></AppointmentsContainer>

    <div>
      <h1>Doctors</h1>
      <ul>
          {console.log("DATOS RECIBIDOS: " + doctor)}
          {doctor.map(p => (
          <li key={p.id}>{p.name} - {p.surname}</li>
        ))}
      </ul>
    </div>
    </>
  );
}

export default App;