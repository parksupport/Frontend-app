// app/dashboard/page.tsx
"use client";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { groteskTextMedium } from "../fonts";
import ProfileSVG from "@/assets/svg/Ellipse.svg";
import SearchSVG from "@/assets/svg/search-normal.svg";
import SettingSVG from "@/assets/svg/setting.svg";
import Calendar from "@/components/card/Calendar";
import CarProfile from "@/components/card/CarProfile";
import ContraventionTable from "@/components/card/Contravention";
import DashboardCard from "@/components/card/DashboardCard";
import FAQ from "@/components/card/FAQ";
import NotificationsTable from "@/components/card/NotificationTable";
import Drawer from "@/components/Drawer";
import HeaderImage from "@/components/HeaderImage";
import "@/components/Slider.css";
import { useAuthStore } from "@/lib/stores/authStore";
import { useState } from "react";
import { IoNotifications } from "react-icons/io5";
import { RiRobot2Fill } from "react-icons/ri";
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

  const user = useAuthStore((state) => state.user);

  return (
    <div className="flex flex-col">
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
      {/* Main Content */}
      <main className="mx-[30px] flex flex-col justify-center items-center w-full">
        <section className="flex flex-col max-w-[1380px] w-full justify-between pt-[1.5rem] ">
          <div className="mt-p24px] flex self-start">
            <h1
              className={`text-[2rem] text-[#000000] ${groteskTextMedium.className} `}
            >
              Welcome Back, Orobosa
            </h1>
            <button className="rounded-[37px] bg-[#CEFDFF] h-[22px] px-[12px] text-[#039BB7] text-[12px] mt-[6px] ml-[4px]">
              Free plan
            </button>
          </div>

          <div className="flex justify-between mt-[1.5rem]">
            <CarProfile openCarProfile={openCarProfile} />

            <article>
              <ContraventionTable
                invoices={undefined}
                openConventionTable={openConventionTable}
              />
            </article>
          </div>
        </section>

        <section className="flex flex  max-w-[1380px] justify-between w-full pt-[1.5rem] ">
          <div>
            <Calendar />
          </div>
          <div>
            <NotificationsTable
              openNotificationsTable={openNotificationsTable}
            />
          </div>
        </section>
        <section className="flex max-w-[1380px] w-full  mt-[20px]">
          <div>
            <FAQ />
          </div>
          <div className="flex gap-[20px] self-start">
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
        </section>
        <Drawer isOpen={isOpen} toggleDrawer={toggleDrawer}>
          {drawerContent}
        </Drawer>
      </main>
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
