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
  title: 'telegram mini app больше не поддерживается',
  message: 'Хотите перейти в веб-версию приложения?',
  buttons: [
    { id: 'yes', text: 'Перейти', type: 'default' },
    {
      id: 'no',
      text: 'Закрыть ТМА',
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
  }
};

function App() {
  useEffect(() => {
    init();
    redirectFromTMA();
  }, [])
  
  return (
    <div className="App">
    </div>
  );
}

export default App;
