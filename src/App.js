import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [animals, setAnimals] = useState([]);
  const [newAnimal, setNewAnimal] = useState({
    name: '',
    image: '',
    type: '',
    weight: '',
  });

  useEffect(() => {
    // Fetch the animals data when the component mounts
    fetch('/api/animals')
      .then((res) => res.json())
      .then((data) => setAnimals(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send a POST request to add the new animal
    fetch('/api/animals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAnimal),
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the animals state with the new animal
        setAnimals([...animals, data]);
        // Reset the form fields
        setNewAnimal({
          name: '',
          image: '',
          type: '',
          weight: '',
        });
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <div>
      <h1>Animals</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={newAnimal.name}
          onChange={(e) => setNewAnimal({ ...newAnimal, name: e.target.value })}
        />
        <label>Image URL:</label>
        <input
          type="text"
          value={newAnimal.image}
          onChange={(e) => setNewAnimal({ ...newAnimal, image: e.target.value })}
        />
        <label>Type:</label>
        <input
          type="text"
          value={newAnimal.type}
          onChange={(e) => setNewAnimal({ ...newAnimal, type: e.target.value })}
        />
        <label>Weight:</label>
        <input
          type="number"
          value={newAnimal.weight}
          onChange={(e) => setNewAnimal({ ...newAnimal, weight: e.target.value })}
        />
        <button type="submit">Add Animal</button>
      </form>
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
    </div>
  );
}

export default App;
