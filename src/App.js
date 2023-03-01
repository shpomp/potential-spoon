import React, { useEffect, useState } from "react";

import "./App.css";

export const App = () => {
  const [pomodoro, setPomodoro] = useState({
    mode: "work",
    breakLength: 5,
    workLength: 25,
    timerTime: 0.1 * 60,
    timerIsActive: false,
  });

  useEffect(() => {
    console.log(pomodoro.timerTime);
    let timer = setInterval(() => {
      if (pomodoro.timerIsActive && pomodoro.timerTime > 0)
        setPomodoro({ ...pomodoro, timerTime: pomodoro.timerTime - 1 });
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  });

  // useEffect(() => {
  //   if (pomodoro.timerTime === 0) {
  //     setTimeout(interval, 1000);
  //     switchMode();
  //   }
  // });

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
    const sound = document.getElementById("beep");
    sound.pause();
    sound.currentTime = 0;

    setPomodoro({
      mode: "work",
      breakLength: 5,
      workLength: 25,
      timerTime: 25 * 60,
      timerIsActive: false,
    });
  };

  const switchMode = () => {
    playSound();
    setPomodoro({
      ...pomodoro,
      mode: pomodoro.mode === "work" ? "break" : "work",
      timerTime:
        pomodoro.mode === "work"
          ? pomodoro.breakLength * 60
          : pomodoro.workLength * 60,
    });
  };

  const playSound = () => {
    const sound = document.getElementById("beep");
    console.log(sound);
    sound.play();
  };

  return (
    <div className="App">
      <div id="clock">
        <div id="work">
          <p id="session-label">WORK</p>
          <div className="time-controls">
            <button
              id="session-decrement"
              disabled={pomodoro.timerIsActive || pomodoro.workLength === 1}
              onClick={() => handleTimeChange("work", "dec")}
            >
              -
            </button>
            <p id="session-length">{pomodoro.workLength}</p>
            <button
              id="session-increment"
              disabled={pomodoro.timerIsActive || pomodoro.workLength >= 60}
              onClick={() => handleTimeChange("work", "inc")}
            >
              +
            </button>
          </div>
        </div>

        <div id="break">
          <p id="break-label">CHILL</p>
          <div className="time-controls">
            <button
              id="break-decrement"
              disabled={pomodoro.timerIsActive || pomodoro.breakLength === 1}
              onClick={() => handleTimeChange("break", "dec")}
            >
              -
            </button>

            <p id="break-length">{pomodoro.breakLength}</p>

            <button
              id="break-increment"
              disabled={pomodoro.timerIsActive || pomodoro.breakLength >= 60}
              onClick={() => handleTimeChange("break", "inc")}
            >
              +
            </button>
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

        <audio
          id="beep"
          src={"/Chicken-Clucking-Short-www.fesliyanstudios.com.mp3"}
        />
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
  return minutes + ":" + seconds;
};
