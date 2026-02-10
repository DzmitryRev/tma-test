import {  isTMA ,init, openLink } from "@telegram-apps/sdk-react";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [status, setStatus] = useState("Проверка...");
  const [inited, setInited] = useState(false);
  const [isTMA2, setIsTMA] = useState(false);


  useEffect(() => {
      if(inited) {
        setStatus(JSON.stringify(window?.Telegram?.WebApp));
       if (openLink) {
        openLink("https://google.com/");
        } else {
        setStatus(`openLink не достsdsdfsdfsdfsdfупен`);
        }
      }
    }, [inited])

  useEffect(() => {
    if(isTMA2) {
    try {
      init();
      setInited(true);
      setStatus("TMA инициализирован");
    } catch (error) {
      setStatus(`Ошибка инициализации: ${error}`);
    }
    }
  }, [isTMA2]);

  const checkIsTMA = async () => {
    const isa = await isTMA('complete');

    setIsTMA(isa);
  }

  useEffect(() => {checkIsTMA()}, [checkIsTMA]);

  return (
    <div className="App">
      <h3 style={{color: "white"}}>{status}</h3>
    </div>
  );
}

export default App;
