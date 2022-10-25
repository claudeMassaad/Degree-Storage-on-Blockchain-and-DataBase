import { useState } from "react";
import "./App.css";
import logo from "./assets/austLogo.png";
import Get from "./components/Get";
import Save from "./components/Save";

function App() {
  // state variable indicated if user pressed save Tree and Root so if they were generated or not
  const [generated, setGenerated] = useState(true);

  return (
    <div className="App">
      <div className="card">
        <img src={logo} className="logo" />
        {generated ? <Save /> : <Get />}
      </div>
    </div>
  );
}

export default App;
