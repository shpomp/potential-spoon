import React, { useState } from "react";

import "./App.css";

export const App = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);

  return (
    <div className="App">
      <p id="break-label">Break Length</p>
      <p id="break-length">{breakLength}</p>
      <div id="break-increment"></div>
      <div id="break-decrement"></div>

      <p id="session-label">Session Length</p>
      <p id="session-length">{sessionLength}</p>
      <div id="session-increment"></div>
      <div id="session-decrement"></div>

      <p id="timer-label">Session</p>
      <div id="time-left"></div>

      <button id="start_stop"></button>
      <button id="reset"></button>
    </div>
  );
};
