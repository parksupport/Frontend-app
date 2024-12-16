"use client";

import ProfileSVG from "@/assets/svg/Ellipse.svg";
import SearchSVG from "@/assets/svg/search-normal.svg";
import SettingSVG from "@/assets/svg/setting.svg";
import HeaderImage from "@/components/HeaderImage";
import "@/components/Slider.css";
import { IoNotifications } from "react-icons/io5";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import OpenNotification from "./notification-popup/OpenNotification";
import NotificationsTable from "./NotificationTable";
import { useState } from "react";
import useStore from "@/lib/stores/notification";
import { groteskText } from "@/app/fonts";
import { useAuthStore } from "@/lib/stores/authStore";
import { useRouter } from "next/navigation";

interface DashboardHeaderProps {
  openNotification: () => void;
  openSettingsDrawer: () => void;
  openProfileSlider: () => void;
  openNotificationsTable: () => void;
}
const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  openSettingsDrawer,
  openProfileSlider,
}) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const validateInput = (value) => {
    if (value === "wrongword1") {
      setMessage("Scenario 1: This is not a valid word.");
    } else if (value === "wrongword2") {
      setMessage("Scenario 2: This word is not allowed.");
    } else {
      setMessage("");
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    validateInput(value);
  };
  const profileUser = useAuthStore((state) => state.user);
  const { full_name } = profileUser || {};

  return (
    <header className="bg-[#FFFFFF] border-solid p-2 md:p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <HeaderImage onClick={() => router.push("/")} />
        </div>

        <form
          className={`${groteskText.className} hidden sm:flex sm:flex-grow sm:justify-center relative max-w-[600px] w-full h-[36px] rounded-[6px]`}
        >
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Find contravention"
            className="w-full h-full bg-[#F7F9FC] px-[44px] focus:outline-[#E0E0E0] rounded-[6px]"
          />
          <SearchSVG className="absolute left-4 top-2 cursor-pointer" />
        </form>
        {message && <p className="mt-2 text-red-500">{message}</p>}

        <div className="flex items-center space-x-4">
          {/* <OpenNotification /> */}
          {/* <button className="cursor-pointer"  onClick={toggleProfile}>
          <IoNotifications size={24} color="grey" />
         
        </button> */}
          <button className="cursor-pointer" onClick={openSettingsDrawer}>
            <SettingSVG size={24} color="grey" />
          </button>
          <div className="hidden sm:block">|</div>

          <div
            onClick={openProfileSlider}
            className="cursor-pointer w-[50px] h-[50px] rounded-full bg-green-300 flex items-center justify-center text-black text-[20px] font-bold"
          >
            {full_name ? (
              `${full_name.split(" ")[0][0].toUpperCase()}${
                full_name.split(" ")[1]?.[0]?.toUpperCase() || ""
              }`
            ) : (
              <img
                src="https://via.placeholder.com/80"
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            )}
          </div>
        </div>
      </div>

      <form
        className={`${groteskText.className} block sm:hidden relative max-w-full w-full h-[36px] mt-4 rounded-[6px]`}
      >
        <input
          type="text"
          placeholder="Find contravention"
          className="w-full h-full bg-[#F7F9FC] px-[44px] focus:outline-[#E0E0E0] rounded-[6px]"
        />
        <SearchSVG className="absolute left-4 top-2 cursor-pointer" />
      </form>
    </header>
  );
};

export default DashboardHeader;
