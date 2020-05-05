import React, { useContext, useState } from "react";
import axios from "axios";

import { SmurfContext } from "../contexts/SmurfContext";

function Smurf() {
  const value = useContext(SmurfContext);
    // console.log('value', value);
  const [newSmurfText, setNewSmurfText] = useState({
    name: "",
    age: "",
    height: "",
  });

  const handleChanges = (e) => {
    setNewSmurfText({
      ...newSmurfText,
      [e.target.name]: e.target.value,
    });
    console.log("new smurf: ", newSmurfText);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3333/smurfs", newSmurfText)
      .then((res) => value.smurfs.push("/"))
      .catch((err) => console.log(err))
      .finally(() => window.location.reload());
  };

  function deleteSmurf(e, id) {
    e.preventDefault();
    console.log("deleting");
    axios
      .delete(`http://localhost:3333/smurfs/${id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log('delete error ', err))
      .finally(() => window.location.reload());
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        Name: &nbsp;
        <input
          type="text"
          name="name"
          value={newSmurfText.value}
          onChange={handleChanges}
        />
        <br />
        Age: &nbsp;&nbsp;&nbsp;&nbsp;
        <input
          type="text"
          name="age"
          value={newSmurfText.value}
          onChange={handleChanges}
        />
        <br />
        Height:{" "}
        <input
          type="text"
          name="height"
          value={newSmurfText.value}
          onChange={handleChanges}
        />
        <br />
        <button type="submit">Add Smurf</button>
      </form>
      {value.smurfs
        ? value.smurfs.map((smurf) => (
            <div key={smurf.id}>
              <p>
                Name: {smurf.name}
                <br />
                Age: {smurf.age}
                <br />
                Height: {smurf.height}
              </p>
              <button onClick={(e) => deleteSmurf(e, smurf.id)}>Delete</button>
            </div>
          ))
        : "Getting Smurfs"}
    </div>
  );
}

export default Smurf;