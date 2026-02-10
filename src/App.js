import { isTMA } from "@telegram-apps/sdk-react";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [status, setStatus] = useState("Проверка...");
  
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
      <h3 style={{color: "white"}}>{status}</h3>
    </div>
  );
}

export default App;
