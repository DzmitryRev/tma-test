import { isTMA, init, showPopup  } from "@telegram-apps/sdk-react";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [status, setStatus] = useState("Проверка...");
  const [inited, setInited] = useState(false);
  const [isTMA2, setIsTMA] = useState(false);
  
      console.log(inited);

  useEffect(() => {
      if(inited ) {
        setStatus("Редирект через openLink");
        showPopup({
          message: "POPUP"
        });
         // openLink('https://google.com/', {
         //    tryInstantView: true
         //  })
        // setTimeout(() => {
        //   openLink('https://google.com/', {
        //     tryInstantView: true
        //   })
        //    openLink('https://google.com/', {
        //     tryInstantView: true
        //   })
        //   console.log(closeMiniApp);
        // })

        // setTimeout(() => {
        //   closeMiniApp();
        // })
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
