import { useEffect, useState } from 'react';

function App() {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    fetch('/api/pokemon')
      .then(res => res.json())
      .then(data => setPokemon(data));
  }, []);

  return (
    <div>
      <h1>Pokémon</h1>
      <ul>
        {pokemon.map(p => (
          <li key={p.id}>{p.name} - {p.type}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;