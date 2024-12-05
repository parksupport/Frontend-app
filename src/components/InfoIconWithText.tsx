import React, { useState } from "react";
import { createPortal } from "react-dom";
import { groteskText } from "@/app/fonts";
import VehiclceInfoSVG from "@/assets/svg/infoOutline.svg";

interface InfoIconWithTextProps {
  icon?: JSX.Element;
  text: string;
  infoText: string;
  identity: string;
  className?: string;
  verticalAligment?: string;
}

export const InfoIconWithText = ({
  icon,
  text,
  identity,
  infoText,
  className,
  verticalAligment,
}: InfoIconWithTextProps) => {
  const [hovered, setHovered] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      top: rect.top - 10, // Adjust for tooltip height
      left: rect.left + rect.width / 2, // Center horizontally
    });
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <div className="relative flex items-center gap-[5px]">
      <span>{icon}</span>
      <span
        className={`${groteskText.className} text-[1rem] text-[#667185] mr-[3px] ${className}`}
      >
        {text}
      </span>

      <div
        className={`relative cursor-pointer ${verticalAligment}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <VehiclceInfoSVG />
        {hovered &&
          createPortal(
            <div
              className="z-[9999] bg-white text-black border border-[#667185] text-center rounded py-1 px-2 shadow-lg"
              style={{
                position: "fixed",
                top: tooltipPosition.top,
                left: tooltipPosition.left,
                transform: "translate(-50%, -100%)",
              }}
            >
              {infoText}
            </div>,
            document.body 
          )}
      </div>
    </div>
  );
};

export default InfoIconWithText;
