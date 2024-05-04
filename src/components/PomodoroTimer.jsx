import React, { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";

const PomodoroTimer = ({ initialTime }) => {
  const [time, setTime] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  const [customTime, setCustomTime] = useState(initialTime / 60); // in minutes
  const [showInput, setShowInput] = useState(true);
  const alarmRef = useRef(null);

  useEffect(() => {
    let interval = null;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else if (time === 0) {
      clearInterval(interval);
      alarmRef.current.play();
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  const toggle = () => {
    setIsActive(!isActive);
    if (!isActive) {
      setShowInput(false);
    }
  };

  const reset = () => {
    setTime(initialTime);
    setIsActive(false);
    setShowInput(true);
  };

  const handleChange = (e) => {
    setCustomTime(e.target.value);
  };

  const setCustomTimer = () => {
    const newTime = Math.floor(customTime * 60);
    setTime(newTime);
    setIsActive(false);
    setShowInput(false);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <Draggable>
      <div className="flex flex-col items-center bg-white rounded-lg p-4 shadow-md cursor-move">
        <div className="text-2xl font-bold">{formatTime(time)}</div>
        <div className="flex mt-4 space-x-2">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
            onClick={toggle}
          >
            {isActive ? "Pause" : "Start"}
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
            onClick={reset}
          >
            Reset
          </button>
        </div>
        {showInput && (
          <div className="flex items-center mt-4 space-x-2">
            <input
              type="number"
              className="border border-gray-300 rounded px-2 py-1"
              value={customTime}
              onChange={handleChange}
              min="1"
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
              onClick={setCustomTimer}
            >
              Set Time
            </button>
          </div>
        )}
        <audio ref={alarmRef} src="https://www.soundjay.com/button/sounds/beep-07.mp3" />
      </div>
    </Draggable>
  );
};

export default PomodoroTimer;
