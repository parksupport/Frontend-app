"use client";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "@/components/Slider.css";
import Calendar from "@/components/card/Calendar";
import CarProfile from "@/components/card/CarProfile";
import ContraventionTable from "@/components/card/Contravention";
import EducationalMaterials from "@/components/card/Educationalmaterials";
import EducationalMaterialsDrawer from "@/components/Drawer/EducationMaterialsDrawer";
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
import { useRef, useState } from "react";
import { groteskTextMedium } from "../fonts";
import ConventionTableDrawer from "@/components/Drawer/ConventionTableDrawer";
import CorporateCarProfileDrawer from "@/components/Drawer/CorporateCarProfileDrawer";
import SettingsDrawer from "@/components/Drawer/SettingsDrawer";
import AddBillingMethodDrawer from "@/components/Drawer/AddBillingMethodDrawer";
import NotificationTableDrawer from "@/components/Drawer/NotificationTableDrawer";
import OpenNotification from "@/components/notification-popup/OpenNotification";
import UserInfoDrawer from "@/components/Drawer/UserInfoDrawer";
import { ProfileEditInfoDrawer } from "@/components/Drawer/ProfileEditInfoDrawer";
import ToggleButton from "@/components/ToggleComponent/ToggleComponent";

export default function DashboardPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState<React.ReactNode>(null);
  const [User ,setUser] = useState("User")

  const drawerRef = useRef<any>(null);

  const scrollToTopFromParent = () => {
    if (drawerRef.current) {
      drawerRef.current.handleButtonClick();
    }
  };

  const toggleDrawer = () => {
    setIsOpen((prev) => !prev);
  };

  const openDrawer = () => {
    if (!isOpen) {
      setIsOpen(true);
    }
  };



  const openCarProfile = (car: any) => {
    console.log("Opening car profile for:", User);
    if (User === "User") {
      setDrawerContent(
        <CarProfileDrawer
          car={car}
          toggleDrawer={toggleDrawer}
          addVehicleDetails={addVehicleDetails}
        />
      );
    } else {
      setDrawerContent(
        <CorporateCarProfileDrawer
          toggleDrawer={toggleDrawer}
          addVehicleDetails={addVehicleDetails}
        />
      );
    }

    openDrawer();
  };

  const openProfileDrawer = () => {
    setDrawerContent(<UserInfoDrawer back={toggleDrawer} onEdit={openProfileEditDrawer} userInfo={User} />);
    openDrawer();
  };

  const openProfileEditDrawer = () => {
    setDrawerContent(<ProfileEditInfoDrawer back={openProfileDrawer} userRole={User} />);

    openDrawer();
  };

  const handleOpenNotificationsTable = () => {
    // Your logic to open the notifications table
    console.log("Notifications table expanded");
  };

  const openNotificationsTable = () => {
    setDrawerContent(
      <NotificationTableDrawer
        openNotificationsTable={handleOpenNotificationsTable}
      />
    );
    openDrawer();
  };

  const openConventionTable = () => {
    setDrawerContent(
      <ConventionTableDrawer
        toggleDrawer={toggleDrawer}
        
      />
    );
    openDrawer();
  };

  const addVehicleDetails = () => {
    setDrawerContent(
      <AddVehicleDetailsDrawer
        CheckVehicleOwner={CheckVehicleOwner}
        back={openCarProfile}
        userRole={User}
      />
    );
    scrollToTopFromParent();

    openDrawer();
  };
  const openEducationalMaterials = () => {
    setDrawerContent(<EducationalMaterialsDrawer toggleDrawer={toggleDrawer} />);
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
        openCarProfile={openCarProfile}
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

  const openSettingsDrawer = () => {

    setDrawerContent(
      <SettingsDrawer
        toggleDrawer={toggleDrawer}
        openAddBillingMethod={openAddBillingMethod}
      />
    );
    openDrawer();
  };



  const openAddBillingMethod = () => {
    setDrawerContent(
      <AddBillingMethodDrawer
        back={openSettingsDrawer}
        toggleDrawer={toggleDrawer}
      />
    );
    openDrawer();
  };

  const checkVehicleStatus = () => {
    // Replace this with actual conditions or API call
    const randomOutcome = Math.random() > 0.5 ? "success" : "failed";
    return randomOutcome;
  };

  const handleToggle = (newState) => {
    console.log("Current State:", newState);
    setUser(newState)
  };

  return (
    <div className="bg-[#F4F4FA] flex flex-col overflow-hidden pb-[3.5rem]">
      <DashboardHeader openSettingsDrawer={openSettingsDrawer} openProfileSlider={openProfileDrawer} openNotificationsTable={openNotificationsTable} openNotification={OpenNotification}
      />

      {/* Main Content */}
      <main className="mx-4 md:mx-[30px] flex flex-col items-center w-full">
        <section className="flex flex-col max-w-[1380px] w-full pt-[1.5rem]">
          {/* Welcome Section */}
          <div className="flex items-center space-x-2 ">
            <h1
              className={` text-[24px] lg:text-[2rem] text-[#000000] ${groteskTextMedium.className}`}
            >
              Welcome Back, Orobosa
            </h1>
            <button className="rounded-[37px] bg-[#CEFDFF] py-[5px] mb-[13px] px-[12px] text-[#039BB7] text-[12px] ">
              Free plan
            </button>
          </div>
          <ToggleButton initialState="User" onToggle={handleToggle} />
        </section>

        {/* Profile and Table Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-[1380px] pt-[1.5rem] place-items-center">
          <div className="w-full">
            <CarProfile
              addVehicleDetails={addVehicleDetails}
              openCarProfile={openCarProfile}
            />
          </div>

          <div className="w-full">
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
      <Drawer ref={drawerRef} isOpen={isOpen} toggleDrawer={toggleDrawer}>
        {drawerContent}
      </Drawer>
    </div>
  );
}

