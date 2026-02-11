import "./App.css";
import {  useEffect } from "react";
import {
  init,
  ShowPopupOptions,
  closeMiniApp,
  initData,
  openLink,
  showPopup,
} from '@telegram-apps/sdk-react';

const popupOptions: ShowPopupOptions = {
  title: 'Telegram mini-app «Сообщества Сбера» больше не поддерживается',
  message: 'Хотите перейти в веб-версию приложения?',
  buttons: [
    { id: 'yes', text: 'Перейти', type: 'default' },
    {
      id: 'no',
      text: 'Отмена',
      type: 'default',
    },
  ],
};

export const redirectFromTMA = async () => {
  try {
    if (initData && typeof window !== 'undefined') {
      const clickedButtonId = await showPopup(popupOptions);
   
      if (clickedButtonId === 'yes') {
        const redirectHref = window.location.origin  +  window.location.pathname

        openLink(redirectHref); // Ignored on IOS
        window.open(redirectHref); // Ignored on Androind, Web, Desktop

        setTimeout(() => {
          closeMiniApp();
        }, 1000);
      } else if (clickedButtonId === 'no') {
        closeMiniApp();
      }
    }
  } catch {
    console.warn('Не удалось сделать редирект в веб версию');
  } finally {
    closeMiniApp();
  }
};

function App() {
  useEffect(() => {
    init();
    redirectFromTMA();
  }, [])
  
  return (
    <div className="App" style={{color: "red", minHeight: "100dvh"}}>
      <img style={{width: "100%", height: "100dvh"}} src="https://i.postimg.cc/y8PZ14Wy/Snimok-ekrana-2026-02-11-161800.png" alt="test" />
    </div>
  );
}

export default App;
