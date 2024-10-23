"use client";

import ProfileSVG from "@/assets/svg/Ellipse.svg";
import SearchSVG from "@/assets/svg/search-normal.svg";
import SettingSVG from "@/assets/svg/setting.svg";
import HeaderImage from "@/components/HeaderImage";
import "@/components/Slider.css";
import { IoNotifications } from "react-icons/io5";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";


function DashboardHeader() {
  return (
    <header className="w-full flex bg-[#FFFFFF] h-[75px] border-solid pl-[44px] pr-[18px] pt-[11px] items-center justify-between">
    <div className="self-start flex">
      <HeaderImage />
    </div>

    <form className="relative max-w-[600px] w-full h-[36px] rounded-[6px]">
      <input
        type="text"
        placeholder="Find contravention "
        className="w-full h-full bg-[#F7F9FC] px-[44px] focus:outline-[#E0E0E0]"
      />

      <SearchSVG className="absolute left-4 top-2 cursor-pointer" />
    </form>

    <div className="max-w-[250px] w-full flex justify-between items-center ">
      <div>
        <button className="cursor-pointer">
          <IoNotifications size={24} color="grey" />
        </button>
      </div>
      <div>
        <button className="cursor-pointer">
          <SettingSVG size={24} color="grey" />
        </button>
      </div>
      <div className=" ">|</div>
      <div>
        <button className="cursor-pointer">
          <ProfileSVG />
        </button>
      </div>
    </div>
  </header>
  )
}

export default DashboardHeader