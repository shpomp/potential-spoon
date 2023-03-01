import React, { useEffect, useState } from "react";

import "./App.css";

export const App = () => {
  const [pomodoro, setPomodoro] = useState({
    mode: "work",
    breakLength: 5,
    workLength: 25,
    timerTime: 25 * 60,
    timerIsActive: false,
  });

  useEffect(() => {
    let timer = setTimeout(() => {
      if (pomodoro.timerIsActive && pomodoro.timerTime > 0)
        setPomodoro({ ...pomodoro, timerTime: pomodoro.timerTime - 1 });
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  });

  const handleTimeChange = (modeToChange, operation) => {
    console.log(modeToChange, operation);
    if (modeToChange === "work") {
      operation === "inc"
        ? setPomodoro({
            ...pomodoro,
            workLength: pomodoro.workLength + 1,
            timerTime:
              60 *
              (pomodoro.mode === modeToChange
                ? pomodoro.workLength + 1
                : pomodoro.breakLength + 1),
          })
        : setPomodoro({
            ...pomodoro,
            workLength: pomodoro.workLength - 1,
            timerTime:
              60 *
              (pomodoro.mode === modeToChange
                ? pomodoro.workLength - 1
                : pomodoro.breakLength - 1),
          });
    } else {
      operation === "inc"
        ? setPomodoro({
            ...pomodoro,
            breakLength: pomodoro.breakLength + 1,
          })
        : setPomodoro({
            ...pomodoro,
            breakLength: pomodoro.breakLength - 1,
          });
    }
  };

  const handleReset = () => {
    setPomodoro({
      mode: "work",
      breakLength: 5,
      workLength: 25,
      timerTime: 25 * 60,
      timerIsActive: false,
    });
  };

  return (
    <div className="App">
      <div id="clock">
        <div id="work">
          <p id="session-label">WORK</p>
          <div className="time-controls">
            <div id="session-decrement">
              <button
                disabled={pomodoro.timerIsActive || pomodoro.workLength === 1}
                onClick={() => handleTimeChange("work", "dec")}
              >
                -
              </button>
            </div>
            <p id="session-length">{pomodoro.workLength}</p>
            <div id="session-increment">
              <button
                disabled={pomodoro.timerIsActive || pomodoro.workLength >= 60}
                onClick={() => handleTimeChange("work", "inc")}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div id="break">
          <p id="break-label">CHILL</p>
          <div className="time-controls">
            <div id="break-decrement">
              <button
                disabled={pomodoro.timerIsActive || pomodoro.breakLength === 1}
                onClick={() => handleTimeChange("break", "dec")}
              >
                -
              </button>
            </div>
            <p id="break-length">{pomodoro.breakLength}</p>
            <div id="break-increment">
              <button
                disabled={pomodoro.timerIsActive || pomodoro.breakLength >= 60}
                onClick={() => handleTimeChange("break", "inc")}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <p id="timer-label">Session</p>
        <div id="time-left">{formattedTime(pomodoro.timerTime)}</div>

        <button id="start_stop">
          <img
            alt="start-button"
            src={pomodoro.timerIsActive ? "/stop.svg" : "/start.svg"}
            onClick={() =>
              setPomodoro({
                ...pomodoro,
                timerIsActive: !pomodoro.timerIsActive,
              })
            }
          />
        </button>
        <button id="reset">
          <img
            alt="reset-button"
            src={"/reset.svg"}
            onClick={() => handleReset()}
          />
        </button>
      </div>
    </div>
  );
};

const formattedTime = (totalSeconds) => {
  var minutes = Math.floor(totalSeconds / 60);
  var seconds = totalSeconds - minutes * 60;

  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return +minutes + ":" + seconds;
};
