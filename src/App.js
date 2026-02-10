import { isTMA, retrieveLaunchParams } from "@telegram-apps/sdk-react";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [status, setStatus] = useState("Проверка...");
  const [isTMA2, setIsTMA] = useState(false);

  useEffect(() => {
    const checkIsTMA = async () => {
      const isa = await isTMA('complete');
      setIsTMA(isa);
    };
    
    checkIsTMA();
  }, []);

  useEffect(() => {
    if (isTMA2) {
      const webUrl = window.location.href;
      
      try {
        const launchParams = retrieveLaunchParams();
        
        if (launchParams.webApp?.openLink) {
          launchParams.webApp.openLink(webUrl);
          setStatus("Редирект через retrieveLaunchParams");
        } else {
          setStatus("openLink недоступен, редирект через location.href");
          window.location.href = webUrl;
        }
      } catch (error) {
        setStatus(`Ошибка: ${error}`);
        window.location.href = webUrl;
      }
    }
  }, [isTMA2]);

  return (
    <div className="App">
      <h3 style={{color: "white"}}>{status}</h3>
    </div>
  );
}

export default App;
