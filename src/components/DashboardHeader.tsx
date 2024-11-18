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
import NotificationsTable from "./card/NotificationTable";
import { useState } from "react";
import useStore from "@/lib/stores/notification";

interface DashboardHeaderProps {
   openNotification: () => void
   openSettingsDrawer: () => void;
   openProfileSlider: () => void;
   openNotificationsTable: ()=> void;
}
const DashboardHeader: React.FC<DashboardHeaderProps> = ({ openSettingsDrawer, openProfileSlider, }) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(true);

  
  
  return (
    <header className="bg-[#FFFFFF] border-solid p-2 md:p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
    <div className="flex items-center justify-between w-full">

      <div className="flex items-center">
        <HeaderImage />
      </div>

      <form className="hidden sm:flex sm:flex-grow sm:justify-center relative max-w-[600px] w-full h-[36px] rounded-[6px]">
        <input
          type="text"
          placeholder="Find contravention"
          className="w-full h-full bg-[#F7F9FC] px-[44px] focus:outline-[#E0E0E0] rounded-[6px]"
        />
        <SearchSVG className="absolute left-4 top-2 cursor-pointer" />
      </form>


      <div className="flex items-center space-x-4">
      <OpenNotification />
        {/* <button className="cursor-pointer"  onClick={toggleProfile}>
          <IoNotifications size={24} color="grey" />
         
        </button> */}
        <button className="cursor-pointer" onClick={openSettingsDrawer}>
          <SettingSVG size={24} color="grey" />
        </button>
        <div className="hidden sm:block">|</div>
        <button className="cursor-pointer"
          onClick={openProfileSlider}
        >
          <ProfileSVG />
        </button>
      </div>
    </div>

    <form className="block sm:hidden relative max-w-full w-full h-[36px] mt-4 rounded-[6px]">
      <input
        type="text"
        placeholder="Find contravention"
        className="w-full h-full bg-[#F7F9FC] px-[44px] focus:outline-[#E0E0E0] rounded-[6px]"
      />
      <SearchSVG className="absolute left-4 top-2 cursor-pointer" />
    </form>
    

  </header>
  );
}

export default DashboardHeader;
