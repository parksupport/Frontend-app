"use client";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { useState } from "react";
import { groteskTextMedium } from "../fonts";
import Calendar from "@/components/card/Calendar";
import ContraventionTable from "@/components/card/Contravention";
import DashboardHeader from "@/components/DashboardHeader";
import CarProfile from "@/components/card/CarProfile";
import NotificationsTable from "@/components/card/NotificationTable";
import Drawer from "@/components/Drawer/Drawer";
import "@/components/Slider.css";
import CarProfileDrawer from "@/components/Drawer/CarProfileDrawer";
import VehicleDetailsDrawer from "@/components/Drawer/VehicleDetailsDrawer";
import cars from "@/data/data.json";
import FAQComponents from "@/components/card/FAQComponents";
import { Car } from "lucide-react";
import EducationalMaterials from "@/components/card/Educationalmaterials";
import VehicleAddedSuccess from "@/components/Drawer/VehicleSuccess";

export default function DashboardPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState<React.ReactNode>(null);

  const toggleDrawer = () => {
    setIsOpen(((prev) => !prev));
  };

  const openDrawer = () => {
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  const openCarProfile = () => {
    setDrawerContent(
      <CarProfileDrawer car={cars} toggleDrawer={toggleDrawer} openVehicleDetails={openVehicleDetails} />
    );
    openDrawer();
  };

  const openNotificationsTable = () => {
    setDrawerContent(<NotificationTableDrawer />);
    openDrawer();
  };

  const openConventionTable = () => {
    setDrawerContent(<ConventionTableDrawer />);
    openDrawer();
  };

  const openVehicleDetails = () => {
    setDrawerContent(<VehicleDetailsDrawer toggleDrawer={toggleDrawer} status={openAddVehicleStatus}  />);
    openDrawer();
  };
  const openEducationalMaterials = () => {
    setDrawerContent(<EducationalMaterialsDrawer />);
    openDrawer();
  };

  const openAddVehicleStatus = () => {
    setDrawerContent(<VehicleAddedSuccess toggleDrawer={toggleDrawer} openVehicleDetails={openVehicleDetails} />);
    openDrawer();
  };

  return (
    <div className="bg-[#F4F4FA] flex flex-col overflow-hidden pb-[3.5rem]">
      <DashboardHeader />
      {/* Main Content */}
      <main className="mx-4 md:mx-[30px] flex flex-col items-center w-full">
        <section className="flex flex-col max-w-[1380px] w-full pt-[1.5rem]">
          {/* Welcome Section */}
          <div className="flex items-center space-x-2 mb-4">
            <h1
              className={`text-[2rem] text-[#000000] ${groteskTextMedium.className}`}
            >
              Welcome Back, Orobosa
            </h1>
            <button className="rounded-[37px] bg-[#CEFDFF] h-[22px] px-[12px] text-[#039BB7] text-[12px] mt-[6px]">
              Free plan
            </button>
          </div>
        </section>

        {/* Profile and Table Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-[1380px] pt-[1.5rem] mt-6">
          <div>
            <CarProfile
              openVehicleDetails={openVehicleDetails}
              openCarProfile={openCarProfile}
            />
          </div>

          <div>
            <ContraventionTable
              invoices={undefined}
              openConventionTable={openConventionTable}
            />
          </div>
        </section>

        {/* Notifications and Calendar Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-[1380px] pt-[1.5rem] mt-6">
          <div>
            <Calendar />
          </div>
          <div className="">
            <NotificationsTable
              openNotificationsTable={openNotificationsTable}
            />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-[1380px] pt-[1.5rem] mt-6 relative">
          <div className="relative z-10">
            <EducationalMaterials
              openEducationalMaterials={openEducationalMaterials}
            />
          </div>
          <div className="relative -mt-[100px] z-20">
            <FAQComponents />
          </div>
        </section>
      </main>
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

function EducationalMaterialsDrawer() {
  return <div>List of all the materials necessary for tutorials</div>;
}
