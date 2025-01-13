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
import { useState } from "react";
import useStore from "@/lib/stores/notification";
import { groteskText } from "@/app/fonts";
import { useAuthStore } from "@/lib/stores/authStore";
import NotificationBox from "./NotificationBox";
import useIsMobile from "@/hooks/useIsMobile";
import ModalComponent from "./Drawer/ModalComponent";
import { useDisclosure } from "@chakra-ui/react";
import SubscriptionPlans from "./Subscription";
import { useCheckVehicleTicket } from "@/hooks/queries/ticket";
import { useGetProfile } from "@/hooks/queries/profile";

interface DashboardHeaderProps {
  openNotification: () => void;
  openSettingsDrawer: () => void;
  openProfileSlider: () => void;
  openNotificationsTable: () => void;
  openAddBillingMethod?: (id?: any, isSubscription?: boolean) => void;
}
const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  openSettingsDrawer,
  openProfileSlider,
  openAddBillingMethod,
}) => {
  const [vehicleNo, setVehicleNo] = useState("");

  const [searchResult, setSearchResult] = useState(true);

  const isMobile = useIsMobile();

  const { isOpen: isDisclosureOpen, onOpen, onClose } = useDisclosure();

  const { hasTicket, isLoading, error, refetch } =
    useCheckVehicleTicket(vehicleNo);

  const profileUser = useAuthStore((state) => state.user);
  const { full_name } = profileUser || {};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setVehicleNo(value);
  };

  const handleSearch = (e) => {
    console.log("searching");
    if (vehicleNo) {
      e.preventDefault();
      refetch();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch(e);
    }
  };

  return (
    <header className="bg-[#FFFFFF] border-solid p-2 md:p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between relative">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <HeaderImage />
        </div>

        <form
          onSubmit={(e) => handleSearch(e)}
          className={`${groteskText.className} hidden sm:flex sm:flex-grow sm:justify-center relative max-w-[600px] w-full h-[36px] rounded-[6px]`}
        >
          <input
            type="text"
            value={vehicleNo}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="click here to check if your vehicle has a ticket"
            className="w-full h-full bg-[#F7F9FC] px-[44px] focus:outline-[#E0E0E0] rounded-[6px]"
          />
          <SearchSVG className="absolute left-4 top-2 cursor-pointer" />
        </form>
        <div className="absolute ">
          {vehicleNo && searchResult && (
            <NotificationBox
              position={
                isMobile ? { right: -20, top: 145 } : { right: -660, top: 88 }
              }
              onClick={onOpen}
              hasTicket={hasTicket}
            />
          )}
        </div>
        <ModalComponent
          isOpen={isDisclosureOpen}
          onClose={onClose}
          onOpen={onOpen}
          type="subscription"
          display={
            <SubscriptionPlans
              onClick={() => {
                openAddBillingMethod();
                onClose();
              }}
            />
          }
        />

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
          placeholder="click here to check if your vehicle has a ticket"
          className="w-full h-full bg-[#F7F9FC] px-[44px] focus:outline-[#E0E0E0] rounded-[6px]"
        />
        <SearchSVG className="absolute left-4 top-2 cursor-pointer" />
      </form>
    </header>
  );
};

export default DashboardHeader;
