import React from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { groteskTextMedium } from "@/app/fonts";

interface SliderButtonProps {
  direction: "next" | "previous";
  isDisabled?: boolean;
  onClick: () => void;
  customClasses?: string;
  iconSize?: number;
}

const SliderButton = ({
  direction = "next",
  isDisabled = false,
  onClick,
  customClasses = "",
  iconSize = 20,
}: SliderButtonProps) => {
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
      <span className="mx-1">{direction === "next" ? "Next" : "Previous"}</span>
      {direction === "next" && (
        <ChevronRight size={iconSize} style={{ display: "inline-flex" }} />
      )}
    </button>
  );
};

export default SliderButton;
