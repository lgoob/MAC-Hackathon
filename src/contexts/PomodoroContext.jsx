import React, { createContext, useContext, useState } from "react";

const PomodoroContext = createContext();

export const usePomodoro = () => {
    return useContext(PomodoroContext);
};

export const PomodoroProvider = ({ children }) => {
    const [time, setTime] = useState(1500); // Default to 25 minutes
    const [isActive, setIsActive] = useState(false);
    const [customTime, setCustomTime] = useState(25); // Default to 25 minutes
    const [showInput, setShowInput] = useState(true);

    return (
        <PomodoroContext.Provider
            value={{
                time,
                setTime,
                isActive,
                setIsActive,
                customTime,
                setCustomTime,
                showInput,
                setShowInput,
            }}
        >
            {children}
        </PomodoroContext.Provider>
    );
};
