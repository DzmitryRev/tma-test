import { isTMA, init, openLink  } from "@telegram-apps/sdk-react";
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
        // showPopup({
        //   message: "Custom message",
        //   buttons: [{text: "Перейти", id: "1", type: "ok"}],
        //   title: "Custom title",
        //   postEvent: () => {
        //        openLink('https://google.com/')
        //   }
        // });
         // openLink('https://google.com/', {
         //    tryInstantView: true
         //  })

         try {
      //        setTimeout(() => {
      //   window.top.open('https://google.com', '_blank');
      // }, 100);
        const link = document.createElement('div');
        link.addEventListener('click', () => {
          openLink('https://google.com');
        })
        document.body.appendChild(link);


           setTimeout(() => {

             link.click();
        document.body.removeChild(link);
           })
         } catch {
           setStatus("CATCH")
         }
        // setTimeout(() => {
        // window.location.replace(window.location.href);
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
