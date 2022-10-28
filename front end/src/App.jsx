import { useEffect, useState } from "react";
import "./App.css";
import logo from "./assets/austLogo.png";
import Get from "./components/Get";
import Save from "./components/Save";
import axios from "axios";
import Modal from "react-modal";
import TransactionLoader from "./components/TransactionLoader";
import abi from "./smartContractABI.json";
import { ethers } from "ethers";

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
  const [generated, setGenerated] = useState(false);
  const [merkleTree, setMerkleTree] = useState([]);
  const [merkleRoot, setMerkleRoot] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [txHash, setTxHash] = useState();
  const [txCompleted, setTxCompleted] = useState(false);
  const [allDataReceived, setAllDataReceived] = useState([]);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQVVTVCIsImlhdCI6MTY2Njk0NDQ5OCwiZXhwIjoxNjY5NTM2NDk4fQ.vP2cKPI3FBCXu7_nU6GIhauBXl5jlAlhNmRswkQGxa4";
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const contractAddress = "0xd4f3f2f91840672358abc69eaf9bf7bafbd78906";

  let hexMerkleRoot = "";
  let data = [];

  useEffect(() => {
    // setMerkleRoot(data[data.length - 1][0].data);
    // setMerkleTree(data[0]);
    // console.log(merkleTree);
    // console.log(merkleRoot);
    console.log(allDataReceived);
  }, [merkleRoot, merkleTree]);

  async function handleGetInfo() {
    setIsLoading(true);

    const response = await axios.get("http://localhost:3500");
    data = await response.data.layers;

    setAllDataReceived(response.data);
    setMerkleTree(data[0]);
    // console.log(data);
    hexMerkleRoot = "0x" + bufferToHex(data[data.length - 1][0].data);
    setMerkleRoot(hexMerkleRoot);

    console.log(hexMerkleRoot);

    //Convert Merkle Root from buffer type to hex type
    function bufferToHex(buffer) {
      return [...new Uint8Array(buffer)]
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    }

    setIsLoading(false);
    setGenerated(true);
  }

  const handleSave = async (e) => {
    e.preventDefault();

    // starting the loading screen transaction takes place
    setIsLoading(true);

    // Invoke web3 in the browser, call smart contract and console log event
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();

    const contractInstance = new ethers.Contract(contractAddress, abi, signer);
    contractInstance.setMerkleRoot(merkleRoot);
    contractInstance.on("merkleRootUpdated", (root1, event) => {
      const hash = event.transactionHash;
      console.log("entered event");
      setTxHash(hash);
      setTxCompleted(true);
      console.log("finished blockchain tx");

      console.log("started posting to mongo");
      postToMongo();
      console.log("finished posting to mongo");

      setIsLoading(false);

      console.log(event.transactionHash);
    });

    // POST request to mongoDB
  };

  async function postToMongo() {
    try {
      const sendRequest = await axios.post(
        "http://localhost:3000/pdf/postPDF",
        allDataReceived,
        config
      );
      console.log(sendRequest);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div>
        <div>
          <img src={logo} className="logo" />
          {generated ? (
            <Save
              handleSave={handleSave}
              completed={txCompleted}
              txHash={txHash}
              merkleRoot={merkleRoot}
            />
          ) : (
            <Get handleGetInfo={handleGetInfo} />
          )}
        </div>
      </div>
      <Modal isOpen={isLoading} style={customStyles}>
        <TransactionLoader generated={generated} />
      </Modal>
    </>
  );
}

export default App;
