import React from "react";
import "./Get.css";

function Get(props) {
  return (
    <div>
      <button className="getButton" onClick={props.handleGetInfo}>
        Get Merkle Tree and Merkle Root
      </button>
    </div>
  );
}

export default Get;
