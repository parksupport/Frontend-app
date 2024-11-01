"use client";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { useState } from "react";
import { RiRobot2Fill } from "react-icons/ri";
import { groteskTextMedium } from "../fonts";
import FAQ from "@/components/card/FAQ";
import Calendar from "@/components/card/Calendar";
import ContraventionTable from "@/components/card/Contravention";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardCard from "@/components/card/DashboardCard";
import CarProfile from "@/components/card/CarProfile";
import NotificationsTable from "@/components/card/NotificationTable";
import Drawer from "@/components/Drawer";
import "@/components/Slider.css";
import CarProfileDrawer from "@/components/Drawer/CarProfile";
import VehicleDetailsDrawer from "@/components/Drawer/VehicleDetails";

export default function DashboardPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState<React.ReactNode>(null);

  const toggleDrawer = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const openCarProfile = () => {
    setDrawerContent(<CarProfileDrawer  toggleDrawer={toggleDrawer}/>);
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
  const openVehicleDetails = () => {
    setDrawerContent(<VehicleDetailsDrawer toggleDrawer={toggleDrawer} />);
    toggleDrawer();
  };

  return (
    <div className="flex flex-col">
      <DashboardHeader />
      {/* Main Content */}
      <main className="mx-[30px] flex flex-col justify-center items-center w-full">
        <div className="flex flex-col max-w-[1380px] w-full pt-[1.5rem]">
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
            <div className="max-w-[680px] flex flex-col gap-6 flex-1 ">
              <CarProfile
                openCarProfile={openCarProfile}
                openVehicleDetails={openVehicleDetails}
              />

              <section className="flex flex-col max-w-[1380px] w-full justify-between pt-[1.5rem] ">
                <Calendar />
              </section>
              <FAQ />
            </div>

            {/* Column 2 */}
            <div className="max-w-[680px] flex flex-col gap-6 flex-1">
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
        </div>
      </main>

      {/* Drawer */}
      <Drawer isOpen={isOpen} toggleDrawer={toggleDrawer}>
        {drawerContent}
      </Drawer>
    </div>
  );
}

function NotificationTableDrawer() {
  return <div>Notification List Content</div>;
}

function ConventionTableDrawer() {
  return <div>Convention List Content</div>;
}
