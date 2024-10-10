import React from "react";
import { HiUserGroup } from "react-icons/hi2";
import { HiMiniUser } from "react-icons/hi2";

interface CardProfileProps {
  type: "user" | "corporate";
  selected: boolean;
  onClick: () => void;
}

const CardProfile = ({
  type = "user",
  selected,
  onClick,
}: CardProfileProps) => {
  return (
    <div
      onClick={onClick}
      className={`w-[188px] h-[190px] flex flex-col pl-4 py-2 rounded-[6px] border border-neutral-200 text-neutral-950 shadow-sm cursor-pointer transition-shadow duration-300 ease-in-out ${
        selected ? 'bg-[#4169E1] text-white' : ''
      } hover:shadow-custom-hover`}
    >
      <div className={`pt-2 text-[#4169E1] ${selected ? "text-white" : ""}`}>
        {type === "user" ? (
          <HiMiniUser className="w-8 h-8" />
        ) : (
          <HiUserGroup className="w-12 h-12" />
        )}
      </div>
      <div className={`text-[22px] pt-1 ${selected ? "text-black" : ""}`}>
        {type === "user" ? "Individual" : "Corporate"}
      </div>
      <div
        className={`text-neutral-500 text-[16px] font-normal pb-14 ${
          selected ? "text-white" : ""
        }`}
      >
        {type === "user"
          ? "Vehicle Fines with Real-Time Notifications"
          : "I manage a fleet of vehicles for a company"}
      </div>
    </div>
  );
};

export default CardProfile;
