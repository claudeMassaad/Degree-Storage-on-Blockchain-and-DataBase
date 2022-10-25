import React from "react";
import "../../src/App.css";
import "./Save.css";

function Save() {
  return (
    <div>
      <div className="inputs">
        <div className="inputs-form">
          <p>Merkle Root </p>
          <input />
        </div>
        <div className="inputs-form">
          <p>Merkle Tree </p>
          <input />
        </div>
      </div>
      <button>Save information to data base</button>
    </div>
  );
}

export default Save;
