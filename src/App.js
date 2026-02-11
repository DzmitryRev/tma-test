import { isTMA, init, openLink, showPopup  } from "@telegram-apps/sdk-react";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [status, setStatus] = useState("Проверка...");
  const [inited, setInited] = useState(false);
  const [isTMA2, setIsTMA] = useState(false);
  
  console.log(inited);
  

  const processPopup = async () => {
    

    const buttonId = await showPopup({
          message: "Custom message",
          buttons: [{text: "Перейти", id: "ok", type: "ok"}, {text: "Отмена", id: "cancel", type: "destructive"}],
          title: "Custom title",
        })
    if(buttonId === "ok") {
      const linkUrl = 'https://tma-test-lake.vercel.app/' // should be same
      openLink(linkUrl);
    }
  }

  useEffect(() => {
      if(inited ) {
        setStatus("Редирект через openLink");
        processPopup();
      }
      
  }, [inited]);

  useEffect(() => {
    if (isTMA2) {
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
  };

  useEffect(() => {
    checkIsTMA();
  }, []);

  return (
    <div className="App">
      <h3 style={{color: "white"}}>{status}</h3>
    </div>
  );
}

export default App;
