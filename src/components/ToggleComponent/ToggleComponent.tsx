import React, { useState } from "react";

const ToggleButton = ({ initialState = "User", onToggle }) => {
  const [toggleState, setToggleState] = useState(initialState);

  const handleToggle = () => {
    const newState = toggleState === "User" ? "Corporate" : "User";
    setToggleState(newState);
    if (onToggle) onToggle(newState);
  };

  return (
    <div className="flex items-center gap-5">
    <button
      onClick={handleToggle}
      className={`w-40 h-10 flex items-center px-1 rounded-full ${
          toggleState === "User" ? "bg-blue-500" : "bg-green-500"
        } transition-colors duration-300`}
        >
      <div
        className={`w-16 text-center text-white font-medium py-1 rounded-full transition-all duration-300 ${
            toggleState === "User" ? "bg-white text-blue-500" : "text-white"
        }`}
        >
        {toggleState}
      </div>
    </button>
      {toggleState}
          </div>
  );
};

export default ToggleButton;
