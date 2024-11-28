import { groteskText } from "@/app/fonts";
import React, { useState } from "react";

const TruncatedText = ({ text, maxLength = 15, className = "", showFullOnHover = true }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Check if the text exceeds the maxLength
  const isTruncated = text?.length > maxLength;

  return (
    <div
      className={`relative group inline-block ${className}`}
      onMouseEnter={isTruncated && showFullOnHover ? handleMouseEnter : null}
      onMouseLeave={isTruncated && showFullOnHover ? handleMouseLeave : null}
    >
      {/* Display truncated text */}
      {isTruncated ? text.slice(0, maxLength) + "..." : text}

      {/* Tooltip with full text, only if the text is truncated and showFullOnHover is true */}
      {isTruncated && isHovered && showFullOnHover && (
        <div
          role="tooltip"
          aria-label={text}
          className={`absolute z-10 bg-gray-800 text-black bg-white text-sm rounded-lg p-2 shadow-lg -top-8 left-0 whitespace-nowrap ${groteskText.className}`}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default TruncatedText;
