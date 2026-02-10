import { isTMA, initNavigator } from "@telegram-apps/sdk-react";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [status, setStatus] = useState("Проверка...");

  useEffect(() => {
    try {
      const navigator = initNavigator('app-navigator-state');
      navigator.attach();
      setStatus("TMA инициализирован");
    } catch (error) {
      setStatus(`Ошибка инициализации: ${error}`);
    }
  }, []);

  const handleRedirect = () => {
    const webUrl = window.location.href;
    
    try {
      window.location.href = webUrl;
      setStatus("window.location.href установлен");
    } catch (error) {
      setStatus(`Ошибка редиректа: ${error}`);
    }
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
