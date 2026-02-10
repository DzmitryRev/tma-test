import { isTMA } from "@telegram-apps/sdk-react";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [status, setStatus] = useState("Проверка...");
  const [inTMA, setInTMA] = useState(false);
  const [logs, setLogs] = useState([]);

  const addLog = (message) => {
    console.log(`[LOG] ${message}`);
    setLogs(prev => [...prev, message]);
  };

  const handleShare = async () => {
    const shareData = {
      title: "My Page",
      text: "Check out this cool page!",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
      }
    } catch (err) {
      console.error("Share failed:", err);
    }
  };

  const handleRedirect = () => {
    addLog("=== НАЧАЛО РЕДИРЕКТА ===");
    
    if (!inTMA) {
      addLog("❌ Не в ТМА, редирект не нужен");
      setStatus("Не в ТМА");
      return;
    }

    addLog("✅ В ТМА, продолжаем");
    setStatus("Перенаправление...");
    
    const webUrl = window.location.href;
    addLog(`🌐 URL для открытия: ${webUrl}`);

    // Проверка 1: Есть ли объект Telegram?
    if (!window?.Telegram) {
      addLog("❌ window.Telegram не существует!");
      setStatus("Ошибка: window.Telegram = undefined");
      return;
    }
    addLog("✅ window.Telegram существует");

    // Проверка 2: Есть ли WebApp?
    if (!window.Telegram.WebApp) {
      addLog("❌ window.Telegram.WebApp не существует!");
      setStatus("Ошибка: window.Telegram.WebApp = undefined");
      return;
    }
    addLog("✅ window.Telegram.WebApp существует");

    // Способ 1: Через openLink
    if (window.Telegram.WebApp.openLink) {
      addLog("🎯 Используем openLink...");
      setStatus("Открываем через openLink...");
      
      try {
        window.Telegram.WebApp.openLink(webUrl);
        addLog("✅ openLink вызван успешно");
        
        // Закрываем ТМА через таймаут
        setTimeout(() => {
          addLog("⏳ Попытка закрыть ТМА...");
          
          if (window.Telegram?.WebApp?.close) {
            addLog("✅ WebApp.close существует, вызываем...");
            window.Telegram.WebApp.close();
            addLog("✅ WebApp.close вызван");
          } else {
            addLog("❌ WebApp.close не существует!");
          }
        }, 1000);
      } catch (error) {
        addLog(`❌ openLink ошибка: ${error}`);
        setStatus(`Ошибка openLink: ${error}`);
      }
    } 
    // Способ 2: Принудительный редирект
    else {
      addLog("🔄 openLink не доступен, используем window.location.href");
      setStatus("Принудительный редирект...");
      
      try {
        window.location.href = webUrl;
        addLog("✅ window.location.href установлен");
      } catch (error) {
        addLog(`❌ window.location.href ошибка: ${error}`);
        setStatus(`Ошибка редиректа: ${error}`);
      }
    }
    
    addLog("=== КОНЕЦ РЕДИРЕКТА ===");
  };

  useEffect(() => {
    checkIsTMA();
  }, []);

  const checkIsTMA = async () => {
    addLog("=== НАЧАЛО ПРОВЕРКИ ТМА ===");
    addLog("Вызываем isTMA('complete')...");
    
    try {
      const result = await isTMA('complete');
      addLog(`isTMA вернул: ${result}`);
      
      if (result) {
        addLog("✅ В ТМА");
        setInTMA(true);
        setStatus("Обнаружено ТМА");
      } else {
        addLog("✅ Не в ТМА");
        setInTMA(false);
        setStatus("Веб-версия");
      }
    } catch (error) {
      addLog(`❌ isTMA ошибка: ${error}`);
      setStatus(`Ошибка проверки: ${error}`);
    }
    
    addLog("=== КОНЕЦ ПРОВЕРКИ ТМА ===");
  };

  return (
    <div className="App">
      <button onClick={handleShare} style={{ padding: "10px", margin: "20px" }}>
        CLICK TO SHARE
      </button>

      {inTMA && (
        <button 
          onClick={handleRedirect} 
          style={{ 
            padding: "12px 24px", 
            margin: "20px",
            fontSize: "16px",
            backgroundColor: "#ff5722",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Открыть в браузере
        </button>
      )}

      <h3>{status}</h3>
      
      <div style={{ 
        marginTop: "30px", 
        padding: "15px", 
        backgroundColor: "#f5f5f5", 
        borderRadius: "8px",
        maxHeight: "300px",
        overflowY: "auto",
        fontSize: "12px",
        fontFamily: "monospace"
      }}>
        <h4>Логи:</h4>
        {logs.map((log, index) => (
          <div key={index}>{log}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
