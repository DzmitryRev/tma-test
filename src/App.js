import "./App.css";
import { useState } from "react";

function App() {

  const [a, setA] = useState("TEST");
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

  

  return (
    <div className="App">
      <button onClick={handleShare} style={{ padding: "10px", margin: "20px" }}>
        CLICK TO SHARE
      </button>

      <h3>{ a }</h3>
    </div>
  );
}

export default App;


// text + link => messages in socials or copy value
// title => title in share modal
