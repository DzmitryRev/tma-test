import { retrieveRawInitData } from "@telegram-apps/sdk-react";
import "./App.css";
import { useState } from "react";
import OtpInput from "react-otp-input";

function App() {
  const handleShare = async () => {
    // // Define share data
    const shareData = {
      title: "My Page",
      text: "Check out this cool page!",
      url: window.location.href,
    };

    try {
      // Check if Web Share API is supported

      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy URL to clipboard
        await navigator.clipboard.writeText(shareData.url);
      }
    } catch (err) {
      // Handle user cancellation or errors
      if (err.name !== "AbortError") {
        console.error("Share failed:", err);
      }
    }
  };

  return (
    <div className="App">
      <button onClick={handleShare} style={{ padding: "10px", margin: "20px" }}>
        CLICK TO SHARE
      </button>
    </div>
  );
}

export default App;
