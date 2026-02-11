import { isTMA, init, showPopup, closeMiniApp, openLink  } from "@telegram-apps/sdk-react";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [status, setStatus] = useState("Проверка...");
  const [inited, setInited] = useState(false);
  const [isTMA2, setIsTMA] = useState(false);
  
  console.log(inited);
  

  const processPopup = async () => {
    const buttonId = await showPopup({
          message: "Хотите перейти в веб версию?",
          buttons: [{text: "Перейти", id: "ok", type: "default"}, {text: "Закрыть", id: "cancel", type: "default"}],
          title: "ТМА больше не работает",
        })
    if(buttonId === "ok") {
      const linkUrl = 'https://tma-test-lake.vercel.app/' // should be same
        try {
          window.open(linkUrl);
          openLink(linkUrl);
          setTimeout(() => {
            closeMiniApp()
          }, 1000)
        } catch (e) {
          setStatus(`${e}`)
        }
    } else if(buttonId === "cancel") {
                  closeMiniApp()
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
      <h3 style={{color: "red"}}>{status}</h3>
    </div>
  );
}

export default App;
