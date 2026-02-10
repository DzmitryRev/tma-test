import { isTMA } from "@telegram-apps/sdk-react";
import "./App.css";
import { useState, useEffect } from "react";

function App() {

  const [a, setA] = useState("WE ARE IN WEB");
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
  }, [])

  const checkIsTMA = async () => {
    const a = await isTMA('complete');

    if (a && typeof window !== "undefined") {
      setA("WE ARE IN TMA")
      window.open("https://google.com/");
    }
  }

  return (
    <div className="App">
      <button onClick={handleShare} style={{ padding: "10px", margin: "20px" }}>
        CLICK TO SHARE
      </button>

      <h3>{a}</h3>
    </div>
  );
}

export default App;
