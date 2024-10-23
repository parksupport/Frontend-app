"use client";
import ProfileSVG from "@/assets/svg/Ellipse.svg";
import UserProfileSVG from "@/assets/svg/exportProfile.svg";
import NumberSVG from "@/assets/svg/numbers.svg";
import GroupUserSVG from "@/assets/svg/profile-2user.svg";
import SearchSVG from "@/assets/svg/search-normal.svg";
import SettingSVG from "@/assets/svg/setting.svg";
import TicketSVG from "@/assets/svg/ticket.svg";
import { Button } from "@/components";
import ContraventionTable from "@/components/card/Contravention";
import HeaderImage from "@/components/HeaderImage";
import NotificationsTable from "@/components/NotificationTable";
import "@/components/Slider.css";
import cars from "@/data/data.json";
import { useAuthStore } from "@/lib/stores/authStore";
import { MoveDiagonal, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { IoNotifications } from "react-icons/io5";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { groteskText, groteskTextMedium } from "../fonts";
import DashboardCard from "@/components/DashboardCard";
import { RiRobot2Fill } from "react-icons/ri";
import CarProfile from "@/components/CarProfile";
import DashboardHeader from "@/components/DashboardHeader";
import Drawer from "@/components/Drawer";

export default function DashboardPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState<React.ReactNode>(null);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const openCarProfile = () => {
    setDrawerContent(<CarProfileDrawer />);
    toggleDrawer();
  };

  const openNotificationsTable = () => {
    setDrawerContent(<NotificationTableDrawer />);
    toggleDrawer();
  };

  const openConventionTable = () => {
    setDrawerContent(<ConventionTableDrawer />);
    toggleDrawer();
  };

  return (
    <div className="flex flex-col">
      <DashboardHeader />
      {/* Main Content */}
      <main className="mx-[30px] flex flex-col justify-center items-center w-full">
        {/* <div className="flex flex-col max-w-[1380px] w-full pt-[1.5rem]"> */}
        <div className="flex flex-col w-full pt-[1.5rem]">
          <div className="mt-[24px] flex self-start">
            <h1
              className={`text-[2rem] text-[#000000] ${groteskTextMedium.className}`}
            >
              Welcome Back, Orobosa
            </h1>
            <button className="rounded-[37px] bg-[#CEFDFF] h-[22px] px-[12px] text-[#039BB7] text-[12px]">
              Free plan
            </button>
          </div>

          {/* Main section */}
          <div className="flex justify-between gap-6">
            {/* Column 1 */}
            <div className="flex flex-col gap-6 flex-1">
              <CarProfile openCarProfile={openCarProfile} />
              <ContraventionTable
                invoices={undefined}
                openConventionTable={openConventionTable}
              />
              
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-6 flex-1 bg-blue-600">
              <ContraventionTable
                invoices={undefined}
                openConventionTable={openConventionTable}
              />
              <NotificationsTable
                openNotificationsTable={openNotificationsTable}
              />
               <div className="flex gap-[20px]">
            <DashboardCard
              title="Car Alerts Support"
              content="Hi Wisdom Hope your day is going great. Ask me anything or share your feedback"
              buttonText="Start a conversation"
              icon={<RiRobot2Fill size={26} color="white" />}
              onClick={() => console.log("clicked")}
            />
            <DashboardCard
              title="Educational materials"
              content="Downloadable and printable driving education materials, as well as links to online materials."
              buttonText="Learn More"
              onClick={() => console.log("clicked")}
            />
          </div>
            </div>
          </div>

          {/* Dashboard Cards */}
          {/* <div className="flex  gap-[20px] mt-6">
            <DashboardCard
              title="Car Alerts Support"
              content="Hi Wisdom Hope your day is going great. Ask me anything or share your feedback"
              buttonText="Start a conversation"
              icon={<RiRobot2Fill size={26} color="white" />}
              onClick={() => console.log("clicked")}
            />
            <DashboardCard
              title="Educational materials"
              content="Downloadable and printable driving education materials, as well as links to online materials."
              buttonText="Learn More"
              onClick={() => console.log("clicked")}
            />
          </div> */}
        </div>
      </main>

      {/* Drawer */}
      <Drawer isOpen={isOpen} toggleDrawer={toggleDrawer}>
        {drawerContent}
      </Drawer>
    </div>
  );
}

function CarProfileDrawer() {
  return <div>User Profile Content</div>;
}

function NotificationTableDrawer() {
  return <div>Notification List Content</div>;
}

function ConventionTableDrawer() {
  return <div>Convention List Content</div>;
}
