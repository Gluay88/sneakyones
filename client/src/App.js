import React, { useState } from "react";
import "./App.css";
import Axios from "axios";
// Library axios

function App() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState(0);
  const [breed, setBreed] = useState("");
  const [weight, setWeight] = useState(0);

  const [catList, setCatList] = useState([]);

  const addKitty = () => {
    // server: http://localhost:3001/
    Axios.post("http://localhost:3001/create", {
      name: name,
      gender: gender,
      age: age,
      breed: breed,
      weight: weight,
    }).then(() => {
      setCatList([
        ...catList,
        { name: name, gender: gender, age: age, breed: breed, weight: weight },
      ]);
    });
  };

  // get request get all cats..
  const getKitties = () => {
    Axios.get("http://localhost:3001/kitties").then((response) => {
      setCatList(response.data);
    });
  };

  return (
    <div className="App">
      <div className="information">
        <label>Name:</label>
        <input type="text" onChange={(e) => setName(e.target.value)} />
        <label>Gender:</label>
        <input type="text" onChange={(e) => setGender(e.target.value)} />
        <label>Age:</label>
        <input type="number" onChange={(e) => setAge(e.target.value)} />
        <label>Breed:</label>
        <input type="text" onChange={(e) => setBreed(e.target.value)} />
        <label>Weight:</label>
        <input type="number" onChange={(e) => setWeight(e.target.value)} />
        <button onClick={addKitty}>Add A Sneaky</button>
      </div>
      <div className="cats">
        <button onClick={getKitties} className="showAll">
          Show All Sneakies
        </button>
        {catList.map((cat, index) => {
          return (
            <div key={index} className="cat">
              <h3>Name: {cat.name}</h3>
              <h3>Gender: {cat.gender}</h3>
              <h3>Age: {cat.age}</h3>
              <h3>Breed: {cat.breed}</h3>
              <h3>Weight: {cat.weight}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
