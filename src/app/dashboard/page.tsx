"use client";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "@/components/Slider.css";
import Calendar from "@/components/card/Calendar";
import CarProfile from "@/components/card/CarProfile";
import ContraventionTable from "@/components/card/Contravention";
import EducationalMaterials from "@/components/card/Educationalmaterials";
import FAQComponents from "@/components/card/FAQComponents";
import NotificationsTable from "@/components/card/NotificationTable";
import DashboardHeader from "@/components/DashboardHeader";
import AddVehicleDetailsDrawer from "@/components/Drawer/AddVehicleDetailsDrawer";
import CarProfileDrawer from "@/components/Drawer/CarProfileDrawer";
import Drawer from "@/components/Drawer/Drawer";
import VehicleAddedFailed from "@/components/Drawer/VehicleFailed";
import VehicleOwnerCheck from "@/components/Drawer/VehicleOwnerCheck";
import VehicleOwnerDetails from "@/components/Drawer/VehicleOwnerDetails";
import VehicleAddedSuccess from "@/components/Drawer/VehicleSuccess";
import cars from "@/data/data.json";
import { useState } from "react";
import { groteskTextMedium } from "../fonts";

export default function DashboardPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState<React.ReactNode>(null);

  const toggleDrawer = () => {
    setIsOpen((prev) => !prev);
  };

  const openDrawer = () => {
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  const openCarProfile = () => {
    setDrawerContent(
      <CarProfileDrawer
        car={cars}
        toggleDrawer={toggleDrawer}
        addVehicleDetails={addVehicleDetails}
      />
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

  const addVehicleDetails = () => {
    setDrawerContent(
      <AddVehicleDetailsDrawer
        CheckVehicleOwner={CheckVehicleOwner}
        toggleDrawer={toggleDrawer}
      />
    );
    openDrawer();
  };
  const openEducationalMaterials = () => {
    setDrawerContent(<EducationalMaterialsDrawer />);
    openDrawer();
  };

  const CheckVehicleOwner = () => {
    setDrawerContent(
      <VehicleOwnerCheck
        back={addVehicleDetails}
        OwnerInfoDrawer={OwnerInfoDrawer}
        vehicleStatus={VehicleStatus}
      />
    );
    openDrawer();
  };
  const OwnerInfoDrawer = () => {
    setDrawerContent(
      <VehicleOwnerDetails
        toggleDrawer={toggleDrawer}
        VehicleStatus={VehicleStatus}
      />
    );
    openDrawer();
  };

  const handleSuccess = () => {
    setDrawerContent(
      <VehicleAddedSuccess
        toggleDrawer={toggleDrawer}
        addVehicleDetails={addVehicleDetails}
      />
    );
    openDrawer();
  };

  const handleFailed = () => {
    setDrawerContent(
      <VehicleAddedFailed
        toggleDrawer={toggleDrawer}
        Success={handleSuccess}
        back={addVehicleDetails}
      />
    );
    openDrawer();
  };

  const VehicleStatus = () => {
    const status = checkVehicleStatus();
    if (status === "failed") {
      handleFailed();
    } else if (status === "success") {
      handleSuccess();
    }
  };

  const checkVehicleStatus = () => {
    // Replace this with actual conditions or API call
    const randomOutcome = Math.random() > 0.5 ? "success" : "failed";
    return randomOutcome;
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
              addVehicleDetails={addVehicleDetails}
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
          <div className="relative md:-mt-[30px] md:z-10">
            <EducationalMaterials
              openEducationalMaterials={openEducationalMaterials}
            />
          </div>
          <div className="relative md:-mt-[100px] md:z-20">
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
