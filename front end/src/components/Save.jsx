import React from "react";
import "../../src/App.css";
import "./Save.css";
import TransactionHistory from "./TransactionHistory";

function Save(props) {
  return (
    <div>
      {props.completed ? (
        <TransactionHistory txHash={props.txHash} />
      ) : (
        <div>
          <div className="inputs">
            <div className="inputs-form">
              <p className="merkleFields">Merkle Root: </p>
              <p className="hashRoot">{props.merkleRoot}</p>
            </div>
          </div>
          <button onClick={props.handleSave} className="saveInfo">
            Save information to data base
          </button>
        </div>
      )}
    </div>
  );
}

export default Save;
