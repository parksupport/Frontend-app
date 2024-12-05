import React from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { groteskText } from "@/assets/fonts";
import { groteskTextMedium } from "@/app/fonts";

const SliderButton = ({
  direction = "next", // 'next' or 'previous'
  isDisabled = false, // Button disabled state
  onClick, // Click handler
  customClasses = "", // Custom styles for the button
  iconSize = 20, // Size of the icon
}) => {
  return (
    <button
      className={`${groteskTextMedium.className} flex items-center justify-center px-2 py-1 h-[28px] text-[14px] rounded-[0.25rem] border ${
        isDisabled
          ? "border-gray-300 text-gray-400 cursor-not-allowed"
          : "border-[#D0D5DD] text-[#1C1B1B] hover:bg-gray-100"
      } ${customClasses}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {direction === "previous" && (
        <ChevronLeft size={iconSize} style={{ display: "inline-flex" }} />
      )}
      <span>{direction === "next" ? "Next" : "Previous"}</span>
      {direction === "next" && (
        <ChevronRight size={iconSize} style={{ display: "inline-flex" }} />
      )}
    </button>
  );
};

export default SliderButton;
