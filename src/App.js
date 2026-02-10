import { isTMA, openLink } from "@telegram-apps/sdk-react";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [status, setStatus] = useState("Проверка...");
  const [inited, setInited] = useState(false);

  useEffect(
    () => {
      if(inited) {
           const webUrl = window.location.href;
    openLink(webUrl);
      }
    }, [inited]
  )

  useEffect(() => {
    try {
      init();
      setStatus("TMA инициализирован");
    } catch (error) {
      setStatus(`Ошибка инициализации: ${error}`);
    }
  }, []);

  const handleRedirect = () => {
    const webUrl = window.location.href;

    setStatus(`${openLink}`);
    openLink(webUrl);
//     if(window?.Telegram?.WebApp?.openLink) {
//        setStatus("openLink");
// window?.Telegram?.WebApp?.openLink(webUrl);
//     } else if(window?.Telegram?.WebApp?.openTelegramLink) {
//        setStatus("openTelegramLink");
//       window?.Telegram?.WebApp?.openTelegramLink(webUrl);
//     }
    
    // try {
    //   window.location.href = webUrl;
    //   setStatus("window.location.href установлен");
    // } catch (error) {
    //   setStatus(`Ошибка редиректа: ${error}`);
    // }
  };
  
  const checkIsTMA = async () => {
    setStatus("Вызываем isTMA('complete')...");
    
    try {
      const result = await isTMA('complete');
      setStatus(`isTMA вернул: ${result}`);
      
      if (result) {
        setStatus("В ТМА");
      } else {
        setStatus("Не в ТМА");
      }
    } catch (error) {
      setStatus(`Ошибка проверки: ${error}`);
    }
  };

  useEffect(() => {
    checkIsTMA();
  }, []);

  return (
    <div className="App">
      <button 
        onClick={handleRedirect} 
        style={{ color: "white" }}
      >
        Открыть в браузере
      </button>
      
      <h3 style={{color: "white"}}>{status}</h3>
    </div>
  );
}

export default App;
