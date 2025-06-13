import { useEffect, useState } from 'react';
import Header from './Header';
import Welcome from './Welcome';

function App() {
  const [doctor, setDoctor] = useState([]);

  useEffect(() => {
    fetch('https://fakehospital.onrender.com/api/hospital')
      .then(res => res.json())
      .then(data => setDoctor(data));
  }, []);

  return (
    <>
    <Header></Header>
    <Welcome></Welcome>
    <div>
      <h1>Doctors</h1>
      <ul>
        {doctor.map(p => (
          <li key={p.id}>{p.name} - {p.surname}</li>
        ))}
      </ul>
    </div>
    </>
  );
}

export default App;