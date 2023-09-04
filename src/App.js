import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    fetch('/api/animals')
      .then((res) => res.json())
      .then((data) => setAnimals(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <div className="app-container">
      <ul className="animal-list">
        {animals.map((animal, index) => (
          <li className="animal-item animal-card" key={index}>
            <img className="animal-image" src={animal.image} alt={animal.name} />
            <div className="animal-details">
              <p className="animal-name">Name: {animal.name}</p>
              <p className="animal-type">Type: {animal.type}</p>
              <p className="animal-weight">Weight: {animal.weight} lbs</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
