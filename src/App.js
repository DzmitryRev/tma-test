import {  init, openLink } from "@telegram-apps/sdk-react";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [status, setStatus] = useState("Проверка...");
  const [inited, setInited] = useState(false);

  useEffect(() => {
      if(inited) {
        setStatus(`INITED, OPENLINK`);
       if (openLink) {
        openLink("https://google.com/");
        } else {
        setStatus(`openLink не достsdsdfsdfsdfsdfупен`);
        }
      }
    }, [inited])

  useEffect(() => {
    try {
      init();
      setInited(true);
      setStatus("TMA инициализирован");
    } catch (error) {
      setStatus(`Ошибка инициализации: ${error}`);
    }
  }, []);

  return (
    <div className="App">
      <h3 style={{color: "white"}}>{status}</h3>
    </div>
  );
}

export default App;
