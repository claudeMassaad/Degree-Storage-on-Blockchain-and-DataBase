import { useEffect, useState } from "react";
import "./App.css";
import logo from "./assets/austLogo.png";
import Get from "./components/Get";
import Save from "./components/Save";
// import axios from "./axios";
import Modal from "react-modal";
import TransactionLoader from "./components/TransactionLoader";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#0a0b0d",
    padding: 0,
    border: "none",
  },
  overlay: {
    backgroundColor: "rgba(10, 11, 13, 0.75)",
  },
};

function App() {
  // state variable indicated if user pressed save Tree and Root so if they were generated or not
  const [generated, setGenerated] = useState(true);
  const [merkleTree, setMerkleTree] = useState("");
  const [merkleRoot, setMerkleRoot] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleGetInfo() {
    setIsLoading(true);
    // const request = await axios.get();
    //set state variables merkle root and merkle tree
    // setIsLoading(false);
    // console.log(request);
  }

  return (
    <div className="App">
      <div className="card">
        <img src={logo} className="logo" />
        {generated ? <Save /> : <Get handleGetInfo={handleGetInfo} />}
      </div>
      <Modal isOpen={isLoading} style={customStyles}>
        <TransactionLoader />
      </Modal>
    </div>
  );
}

export default App;
