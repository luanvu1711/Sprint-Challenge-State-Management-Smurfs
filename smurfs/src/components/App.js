import React, { useState, useEffect } from "react";
import axios from "axios";

// Context
import { SmurfContext } from "../contexts/SmurfContext";

import Smurf from "./Smurf";

import "./App.css";

function App() {
  const [smurfs, setSmurfs] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:3333/smurfs")
      .then((res) => {
        console.log("axios res ", res.data);
        setSmurfs(res.data);
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  }, []);

  console.log("smurfs ", smurfs);

  return (
    <div className="App">
      <h1>SMURFS! 2.0 W/ Redux</h1>
      <SmurfContext.Provider value={{ smurfs }}>
        <Smurf />
      </SmurfContext.Provider>
    </div>
  );
}

export default App;