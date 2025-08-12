import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import OtpInput from "react-otp-input";

function App() {
  const [otp, setOtp] = useState("");

  return (
    <div className="App">
      <input
        id="tel"
        name="tel"
        type="text"
        autoComplete="tel"
        inputMode="tel"
      />

      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={4}
        renderSeparator={<span>-</span>}
        renderInput={(props) => <input {...props} />}
      />
    </div>
  );
}

export default App;
