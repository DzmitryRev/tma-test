import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");

  const [storageItem, setStorageItem] = useState("");

  const setItem = () => {
    localStorage.setItem(input1, input2);
  };

  const getFromLs = (key) => {
    setStorageItem(localStorage.getItem(key) || "");
  };

  const clean = () => {
    setStorageItem("");
  };

  return (
    <div className="App">
      TEST LocalStorage
      <div>
        SET ITEM:
        <div>
          KEY:
          <input
            value={input1}
            onChange={(e) => {
              setInput1(e.target.value);
            }}
          />
        </div>
        <div>
          VALUE:
          <input
            value={input2}
            onChange={(e) => {
              setInput2(e.target.value);
            }}
          />
        </div>
        <div>
          GET FROM LS:
          <input
            value={input3}
            onChange={(e) => {
              setInput3(e.target.value);
            }}
          />
        </div>
        <button onClick={setItem}>SET ITEM</button>
        <div>
          <button
            onClick={() => {
              getFromLs(input3);
            }}
          >
            GET ITEM FROM LS
          </button>
          <button onClick={clean}>CLEAN</button>
        </div>
        <div>{storageItem}</div>
      </div>
    </div>
  );
}

export default App;
