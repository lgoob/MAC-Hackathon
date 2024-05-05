// import React, { useState, useEffect, useRef } from "react";
// import Draggable from "react-draggable";

// const PomodoroTimer = ({ initialTime }) => {
//   const [time, setTime] = useState(initialTime);
//   const [isActive, setIsActive] = useState(false);
//   const [customTime, setCustomTime] = useState(initialTime / 60); // in minutes
//   const [showInput, setShowInput] = useState(true);
//   const alarmRef = useRef(null);

//   useEffect(() => {
//     let interval = null;

//     if (isActive && time > 0) {
//       interval = setInterval(() => {
//         setTime((time) => time - 1);
//       }, 1000);
//     } else if (time === 0) {
//       clearInterval(interval);
//       alarmRef.current.play();
//     }

//     return () => clearInterval(interval);
//   }, [isActive, time]);

//   const toggle = () => {
//     setIsActive(!isActive);
//     if (!isActive) {
//       setShowInput(false);
//     }
//   };

//   const reset = () => {
//     setTime(initialTime);
//     setIsActive(false);
//     setShowInput(true);
//   };

//   const handleChange = (e) => {
//     setCustomTime(e.target.value);
//   };

//   const setCustomTimer = () => {
//     const newTime = Math.floor(customTime * 60);
//     setTime(newTime);
//     setIsActive(false);
//     setShowInput(false);
//   };

//   const formatTime = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
//   };

//   return (
//     <Draggable>
//       <div className="flex flex-col items-center bg-opacity-60 bg-white rounded-lg p-12 shadow-md cursor-move">
//         <div className="text-8xl font-normal text-white">{formatTime(time)}</div>
//         <div className="flex mt-4 space-x-2">
//           <button
//             className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-5 rounded"
//             onClick={toggle}
//           >
//             {isActive ? "Pause" : "Start"}
//           </button>
//           <button
//             className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-5 rounded"
//             onClick={reset}
//           >
//             Reset
//           </button>
//         </div>
//         {showInput && (
//           <div className="flex items-center mt-4 space-x-2">
//             <input
//               type="number"
//               className="border border-gray-300 rounded px-2 py-1"
//               value={customTime}
//               onChange={handleChange}
//               min="1"
//             />
//             <button
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
//               onClick={setCustomTimer}
//             >
//               Set Time
//             </button>
//           </div>
//         )}
//         <audio ref={alarmRef} src="https://www.soundjay.com/button/sounds/beep-07.mp3" />
//       </div>
//     </Draggable>
//   );
// };

// export default PomodoroTimer;
import React, { useEffect, useRef } from "react";
import Draggable from "react-draggable";
import { usePomodoro } from "../contexts/PomodoroContext";
import { FaPlay } from "react-icons/fa6";
import { FaPause } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import { FaCheck } from "react-icons/fa";

const PomodoroTimer = () => {
  const {
    time,
    setTime,
    isActive,
    setIsActive,
    customTime,
    setCustomTime,
    showInput,
    setShowInput,
  } = usePomodoro();
  const alarmRef = useRef(null);

  useEffect(() => {
    let interval = null;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
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
    // Set the time to the initial time from the context
    setTime(customTime * 60); // Sets time to the initial customTime value
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
      <div className="flex flex-col items-center justify-center bg-white rounded-full p-16 size-64 shadow-md cursor-move">
        <div className="text-4xl text-black font-bold">{formatTime(time)}</div>
        <div className="flex mt-4 space-x-4 items-center">
          <button
            className="bg-green-500 text-white font-bold p-5 rounded-full text-lg"
            onClick={toggle}
          >
            {isActive ? <FaPause /> : <FaPlay />}
          </button>
          <button
            className="bg-red-500 text-white font-bold p-3 rounded-full text-sm"
            onClick={reset}
          >
            <GrPowerReset className="size-3" />
          </button>
        </div>
        {showInput && (
          <div className="flex items-center mt-4 space-x-2">
            <input
              type="number"
              className="border border-gray-300 rounded-full px-2 py-1 w-20"
              value={customTime}
              onChange={handleChange}
              min="1"
            />
            <button
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full"
              onClick={setCustomTimer}
            >
              <FaCheck />
            </button>
          </div>
        )}
        <audio
          ref={alarmRef}
          src="https://www.soundjay.com/button/sounds/beep-07.mp3"
        />
      </div>
    </Draggable>
  );
};

export default PomodoroTimer;
