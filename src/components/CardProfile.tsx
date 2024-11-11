"use client";
import GroupSVG from '@/assets/svg/Group (1).svg';
import ProfileSVG from '@/assets/svg/profile (2).svg';

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
    className={`w-[188px] h-[190px] flex flex-col pl-4 py-2 rounded-[6px] text-neutral-950 shadow-sm cursor-pointer transition-shadow duration-300 ease-in-out ${
      selected ? "border-[#3957D7] border-solid border-2" : "border-[#98A2B3] border-solid border"
    } hover:shadow-custom-hover`}
  >
    <div className={`pt-2 ${selected ? "text-white" : "text-[#4169E1]"}`}>
      {type === "user" ? (
        <div>
          <ProfileSVG />
        </div>
      ) : (
        <div className="mb-1">
          <GroupSVG />
        </div>
      )}
    </div>
    <div className={`text-[22px] pt-1 ${selected ? "text-black" : ""}`}>
      {type === "user" ? "Individual" : "Corporate"}
    </div>
    <div
      className={`text-neutral-500 text-[16px] font-normal pb-14 ${
        selected ? "text-black" : ""
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
