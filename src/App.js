import { isTMA } from "@telegram-apps/sdk-react";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [status, setStatus] = useState("Проверка...");

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

  useEffect(() => {
    checkIsTMA();
  }, []);

  const checkIsTMA = async () => {
    const inTMA = await isTMA('complete');

    if (inTMA) {
      setStatus("Обнаружено ТМА, перенаправление...");
      
      const webUrl = window.location.href; // Сохраняем текущий путь
      
      // Пытаемся открыть через методы ТМА
      if (window?.Telegram?.WebApp?.openLink) {
        setStatus("Открываем через openLink...");
        window.Telegram.WebApp.openLink(webUrl);
        
        // Закрываем ТМА через таймаут
        setTimeout(() => {
          if (window.Telegram?.WebApp?.close) {
            window.Telegram.WebApp.close();
          }
        }, 1000);
      } 
      // Fallback на принудительный редирект (самый надёжный)
      else {
        setStatus("Принудительный редирект...");
        setTimeout(() => {
          window.location.href = webUrl;
        }, 500);
      }
    } else {
      setStatus("Веб-версия");
    }
  };

  return (
    <div className="App">
      <button onClick={handleShare} style={{ padding: "10px", margin: "20px" }}>
        CLICK TO SHARE
      </button>

      <h3>{status}</h3>
    </div>
  );
}

export default App;
