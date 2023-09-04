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
  const [editingIndex, setEditingIndex] = useState(-1);

  useEffect(() => {
    // Fetch the animals data when the component mounts
    fetch('/api/animals')
      .then((res) => res.json())
      .then((data) => setAnimals(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingIndex === -1) {
      // Send a POST request to add a new animal
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
          // Reset the form fields and editing state
          setNewAnimal({
            name: '',
            image: '',
            type: '',
            weight: '',
          });
          setEditingIndex(-1);
        })
        .catch((error) => console.error('Error:', error));
    } else {
      // Send a PUT request to edit the existing animal
      fetch(`/api/animals/${editingIndex}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAnimal),
      })
        .then((response) => response.json())
        .then((data) => {
          // Update the animals state with the edited animal
          const updatedAnimals = [...animals];
          updatedAnimals[editingIndex] = data;
          setAnimals(updatedAnimals);
          // Reset the form fields and editing state
          setNewAnimal({
            name: '',
            image: '',
            type: '',
            weight: '',
          });
          setEditingIndex(-1);
        })
        .catch((error) => console.error('Error:', error));
    }
  };

  // Function to handle the editing of an animal
  const handleEdit = (index) => {
    setEditingIndex(index);
    // Populate the form with the animal's data
    const editedAnimal = animals[index];
    setNewAnimal(editedAnimal);
  };

  return (
    <div>
<div className="form-container">
  <h2>Add/Edit Animal</h2>
  <form onSubmit={handleSubmit}>
    <label>Name:</label>
    <input
      className="form-input"
      type="text"
      value={newAnimal.name}
      onChange={(e) => setNewAnimal({ ...newAnimal, name: e.target.value })}
    />
    <label>Image URL:</label>
    <input
      className="form-input"
      type="text"
      value={newAnimal.image}
      onChange={(e) => setNewAnimal({ ...newAnimal, image: e.target.value })}
    />
    <label>Type:</label>
    <input
      className="form-input"
      type="text"
      value={newAnimal.type}
      onChange={(e) => setNewAnimal({ ...newAnimal, type: e.target.value })}
    />
    <label>Weight:</label>
    <input
      className="form-input"
      type="number"
      value={newAnimal.weight}
      onChange={(e) => setNewAnimal({ ...newAnimal, weight: e.target.value })}
    />
    <button className="form-button" type="submit">
      {editingIndex === -1 ? 'Add Animal' : 'Save Animal'}
    </button>
  </form>
</div>

      <div className="app-container">
        <ul className="animal-list">
          {animals.map((animal, index) => (
            <li className="animal-item animal-card" key={index}>
              <img className="animal-image" src={animal.image} alt={animal.name} />
              <div className="animal-details">
                <p className="animal-name">Name: {animal.name}</p>
                <p className="animal-type">Type: {animal.type}</p>
                <p className="animal-weight">Weight: {animal.weight} lbs</p>
                <button onClick={() => handleEdit(index)}>Edit</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
