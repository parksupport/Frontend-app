import React, { useState } from "react";

const ToggleButton = ({ initialState = "User", onToggle }) => {
  const [toggleState, setToggleState] = useState(initialState);

  const handleToggle = () => {
    const newState = toggleState === "User" ? "Corporate" : "User";
    setToggleState(newState);
    if (onToggle) onToggle(newState);
  };

  return (
    <div className="flex items-center gap-3 mb-[1rem]">
      <button
        onClick={handleToggle}
        className={`w-16 h-8 flex items-center px-1 rounded-full ${
          toggleState === "User" ? "bg-blue-500" : "bg-green-500"
        } transition-colors duration-300`}
      >
        <div
          className={`h-6 w-6 rounded-full bg-white shadow-md transform transition-transform ${
            toggleState === "User" ? "translate-x-0" : "translate-x-8"
          }`}
        />
      </button>
      <span className="text-sm font-medium text-gray-700">{toggleState}</span>
    </div>
  );
};

export default ToggleButton;
