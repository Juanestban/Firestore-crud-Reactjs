import React from "react";
import logo from "./logo.svg";
import "./App.css";

// components
import Links from "./components/Links/Links";

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="content-form d-flex justify-content-around align-items-center">
          <div className="content-forms d-flex flex-column">
            <Links />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
