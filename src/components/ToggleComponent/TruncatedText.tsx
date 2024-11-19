import { groteskText } from "@/app/fonts";
import React, { useState } from "react";

const TruncatedText = ({ text, maxLength = 15, className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`relative group inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Display truncated text */}

      {text.length > maxLength ? text.slice(0, maxLength) + "..." : text}

      {/* Tooltip with full text */}
      {isHovered && (
        <div
          className={`absolute z-10 bg-gray-800 text-black bg-white text-sm rounded-lg p-2 shadow-lg -top-8 left-0 whitespace-nowrap ${groteskText.className}`}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default TruncatedText;
