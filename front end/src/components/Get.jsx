import React from "react";
import "../../src/App.css";

function Get(props) {
  return (
    <div>
      <button onClick={props.handleGetInfo}>
        Get Merkle Tree and Merkle Root
      </button>
    </div>
  );
}

export default Get;
