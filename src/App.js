import { isTMA } from "@telegram-apps/sdk-react";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [status, setStatus] = useState("Проверка...");

   const handleRedirect = () => {

    const webUrl = window.location.href;

    // Проверка 1: Есть ли объект Telegram?
    if (!window?.Telegram) {
      setStatus("Ошибка: window.Telegram = undefined");
      return;
    }

    if (!window.Telegram.WebApp) {
      setStatus("Ошибка: window.Telegram.WebApp = undefined");
      return;
    }
    setStatus(" window.Telegram.WebApp существует");

    if (window.Telegram.WebApp.openLink) {
      setStatus("Открываем через openLink...");
      
      try {
        window.Telegram.WebApp.openLink(webUrl);
        setStatus("openLink вызван успешно");
        
        setTimeout(() => {
          setStatus("Попытка закрыть ТМА...");
          
          if (window.Telegram?.WebApp?.close) {
            setStatus("WebApp.close существует, вызываем...");
            window.Telegram.WebApp.close();
            setStatus("WebApp.close вызван");
          } else {
            setStatus("WebApp.close не существует!");
          }
        }, 1000);
      } catch (error) {
        setStatus(`Ошибка openLink: ${error}`);
      }
    } 
    else {
      setStatus("Принудительный редирект...");
      
      try {
        window.location.href = webUrl;
        setStatus("window.location.href установлен");
      } catch (error) {
        setStatus(`Ошибка редиректа: ${error}`);
      }
    }
      };
  
  const checkIsTMA = async () => {
    setStatus("=== НАЧАЛО ПРОВЕРКИ ТМА ===");
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
          style={{ 
            color: "white",
          }}
        >
          Открыть в браузере
        </button>
      )}
      <h3 style={{color: "white"}}>{status}</h3>
    </div>
  );
}

export default App;
