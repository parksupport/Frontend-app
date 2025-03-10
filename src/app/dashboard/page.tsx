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
import DashboardHeader from "@/components/DashboardHeader";
import AddVehicleDetailsDrawer from "@/components/Drawer/AddVehicleDetailsDrawer";
import CarProfileDrawer from "@/components/Drawer/CarProfileDrawer";
import Drawer from "@/components/Drawer/Drawer";
import VehicleAddedFailed from "@/components/Drawer/VehicleFailed";
import VehicleOwnerCheck from "@/components/Drawer/VehicleOwnerCheck";
import VehicleOwnerDetails from "@/components/Drawer/VehicleOwnerDetails";
import VehicleAddedSuccess from "@/components/Drawer/VehicleSuccess";
// import cars from "@/data/data.json";
import { useEffect, useRef, useState } from "react";
import { groteskTextMedium } from "../fonts";
import ConventionTableDrawer from "@/components/Drawer/ConventionTableDrawer";
import SettingsDrawer from "@/components/Drawer/SettingsDrawer";
import AddBillingMethodDrawer from "@/components/Drawer/AddBillingMethodDrawer";
import NotificationTableDrawer from "@/components/Drawer/NotificationTableDrawer";
import OpenNotification from "@/components/notification-popup/OpenNotification";
import UserInfoDrawer from "@/components/Drawer/UserInfoDrawer";
import { ProfileEditInfoDrawer } from "@/components/Drawer/ProfileEditInfoDrawer";
import ToggleButton from "@/components/ToggleComponent/ToggleComponent";
import DashboardNotifications from "@/components/card/DashBoardNotification";
import { useDisclosure } from "@chakra-ui/react";
import ModalComponent from "@/components/Drawer/ModalComponent";
import { useRouter } from "next/navigation";
import NominationHistoryTable from "@/components/Drawer/NominationHistory";
import { useAuthStore } from "@/lib/stores/authStore";

import { useAddVehicle } from "@/hooks/mutations/vehicles";
import { useGetVehicles, useGetCalenderInfo } from "@/hooks/queries/vehicles";
import { useGetProfile } from "@/hooks/queries/profile";
import SubscriptionPlans from "@/components/Subscription";
import { useGetAllTicket } from "@/hooks/queries/ticket";
import VehicleVerificationForm from "@/components/Verificationform";

export default function DashboardPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState<React.ReactNode>(null);
  const { isOpen: isDisclosureOpen, onOpen, onClose } = useDisclosure();

  const drawerRef = useRef<any>(null);
  const user = useAuthStore((state) => state.user);
  const {calenderData,calenderInfo} = useGetCalenderInfo()
  console.log(calenderData,"calender data")
  const { full_name, user_type, vehicles } = user || {};
  // const {nominees} = useGetNominees()
  const { vehiclesData, vehicelIsLoading } = useGetVehicles();
  const { ticketsData } = useGetAllTicket();

  const { addVehicle, error, isError } = useAddVehicle();
  const { profile } = useGetProfile();

  const plan_id = profile?.userplan?.plan;

  const [isCorporate, setIsCorporate] = useState(user_type);

  const [firstName, lastName] =
    typeof full_name === "string" ? full_name.split(" ") : ["", ""];

  const scrollToTopFromParent = () => {
    if (drawerRef.current) {
      drawerRef.current.scrollToTop();
    }
  };

  const toggleDrawer = () => setIsOpen((prev) => !prev);
  const openDrawer = () => !isOpen && setIsOpen(true);

  const openCarProfile = (
    vehicles: any,
    form: any = false,
    autoScrollToForm?: boolean
  ) => {
    setDrawerContent(
      <CarProfileDrawer
        openNominationHistory={openNominationHistory}
        toggleDrawer={toggleDrawer}
        openAddVehicleDetailsDrawer={openAddVehicleDetailsDrawer}
        form={form}
        autoScrollToForm={autoScrollToForm}
        verify={openVerifyVehicleDrawer}
        openAddBillingMethod={openAddBillingMethod}
      />
    );

    scrollToTopFromParent();
    openDrawer();
  };
  const openNominationHistory = () => {
    setDrawerContent(
      <NominationHistoryTable
        toggleDrawer={toggleDrawer}
        back={openCarProfile}
      />
    );
    openDrawer();
  };


  const openProfileDrawer = () => {
    setDrawerContent(
      <UserInfoDrawer
        back={toggleDrawer}
        onEdit={openProfileEditDrawer}
        userInfo={isCorporate}
      />
    );
    scrollToTopFromParent();
    openDrawer();
  };

  const openProfileEditDrawer = ({ type }) => {
    setDrawerContent(
      <ProfileEditInfoDrawer back={openProfileDrawer} type={type} />
    );
    scrollToTopFromParent();
    openDrawer();
  };

  const openNotificationsTable = () => {
    setDrawerContent(<NotificationTableDrawer back={toggleDrawer} />);
    scrollToTopFromParent();
    openDrawer();
  };

  const openConventionTable = () => {
    setDrawerContent(<ConventionTableDrawer toggleDrawer={toggleDrawer} />);
    scrollToTopFromParent();
    openDrawer();
  };

  const checkVehicleStatus = async (vehicleData) => {
    try {
      // Wait for the mutation result
      await addVehicle(vehicleData);

      // If no error occurred, return "success"
      return "success";
    } catch (error) {
      console.error("Error in checkVehicleStatus:", error);
      return "error"; // Return "error" for any failure
    }
  };

  const VehicleStatus = async (vehicleData) => {
    const status = await checkVehicleStatus(vehicleData);

    // Handle success or failure based on the status
    if (status === "error") {
      handleFailed();
    } else if (status === "success") {
      handleSuccess();
    }
  };

  const CheckVehicleOwner = (data) => {
    setDrawerContent(
      <VehicleOwnerCheck
        back={openAddVehicleDetailsDrawer}
        selectownerDrawer={() => selectownerDrawer(data)}
        vehicleStatus={() => VehicleStatus(data)}
      />
    );
    scrollToTopFromParent();
    openDrawer();
  };

  const selectownerDrawer = (data) => {
    setDrawerContent(
      <VehicleOwnerDetails
        vehicleData={data}
        toggleDrawer={toggleDrawer}
        VehicleStatus={VehicleStatus}
        user={isCorporate}
      />
    );
    scrollToTopFromParent();
    openDrawer();
  };

  const openAddVehicleDetailsDrawer = () => {
    setDrawerContent(
      <AddVehicleDetailsDrawer
        back={toggleDrawer}
        CheckVehicleOwner={CheckVehicleOwner}
        user_type={user_type}
        openCarProfile={openCarProfile}
      />
    );
    scrollToTopFromParent();
    openDrawer();
  };

  const openEducationalMaterials = () => {
    setDrawerContent(
      <EducationalMaterialsDrawer toggleDrawer={toggleDrawer} />
    );
    scrollToTopFromParent();
    openDrawer();
  };

  const handleSuccess = () => {
    setDrawerContent(
      <VehicleAddedSuccess
        toggleDrawer={toggleDrawer}
        openCarProfile={openCarProfile}
      />
    );
    scrollToTopFromParent();
    openDrawer();
  };

  const handleFailed = () => {
    setDrawerContent(<VehicleAddedFailed back={openAddVehicleDetailsDrawer} />);
    scrollToTopFromParent();
    openDrawer();
  };

  const openSettingsDrawer = () => {
    setDrawerContent(
      <SettingsDrawer
        openCarProfile={() => {
          openCarProfile(vehicles, true, true);
        }}
        toggleDrawer={toggleDrawer}
        openAddBillingMethod={openAddBillingMethod}
      />
    );
    scrollToTopFromParent();
    openDrawer();
  };

  const openAddBillingMethod = (id: string, toDashboard?: boolean) => {
    setDrawerContent(
      <AddBillingMethodDrawer
        back={!toDashboard ? openSettingsDrawer : toggleDrawer}
        toggleDrawer={toggleDrawer}
        planId={id}
      />
    );
    scrollToTopFromParent();
    openDrawer();
  };


  const openVerifyVehicleDrawer= () =>{
    setDrawerContent(
    //  <VehicleVerificationForm back={toggleDrawer}/>
     <VehicleVerificationForm back={() => openCarProfile(vehicles)}/>

    );
    scrollToTopFromParent();
    openDrawer();
  };
  return (
    <>
      {user ? (
        <div className="bg-[#F4F4FA] flex flex-col overflow-hidden pb-[3.5rem]">
          <DashboardHeader
            openSettingsDrawer={openSettingsDrawer}
            openProfileSlider={openProfileDrawer}
            openNotificationsTable={openNotificationsTable}
            openNotification={OpenNotification}
            openAddBillingMethod={openAddBillingMethod}
          />
          <ModalComponent
            isOpen={isDisclosureOpen}
            onClose={onClose}
            onOpen={onOpen}
            type="subscription"
            display={
              <SubscriptionPlans
                onClick={(id) => {
                  openAddBillingMethod(id);
                  onClose();
                }}
              />
            }
          />

          {/* Main Content */}
          <main className=" px-[1rem] flex flex-col items-center w-full">
            <section className="flex flex-col max-w-[1380px] w-full pt-[1.5rem]">
              {/* Welcome Section */}
              <div className="flex items-start justify-between space-x-2">
                <div className="flex items-start space-x-2">
                  <h1
                    className={`text-[20px] lg:text-[2rem] text-[#000000] ${groteskTextMedium.className}`}
                  >
                    Welcome Back,{" "}
                    {full_name
                      ? firstName.charAt(0).toUpperCase() +
                        firstName.slice(1).toLowerCase()
                      : "User"}
                  </h1>
                  <button
                    className="rounded-[37px] bg-[#CEFDFF] py-[4px] px-[12px] text-[#039BB7] text-[10px] md:text-[12px]"
                    onClick={onOpen}
                  >
                    {plan_id === 1
                      ? "Unsubscribed"
                      : plan_id === 2
                      ? "Personal Plan"
                      : plan_id === 3
                      ? "Family Plan"
                      : plan_id === 4
                      ? "Corporate Plan"
                      : "Starter Plan"}
                  </button>
                </div>
                <button
                  className="rounded-[37px] bg-[#CEFDFF] py-[4px] px-[12px] text-black text-[10px] md:text-[12px]"
                  onClick={onOpen}
                >
                  Subscription
                </button>
              </div>
            </section>

            {/* Profile and Table Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-[1380px]  place-items-center">
              <div className="w-full justify-center items-center ">
                <CarProfile
                  openAddVehicleDetailsDrawer={openAddVehicleDetailsDrawer}
                  openCarProfile={() => openCarProfile(vehicles)}
                  vehicles={vehiclesData?.vehicles}
                  verify={openVerifyVehicleDrawer}
                  plan_id={plan_id}
                  openAddBillingMethod={openAddBillingMethod}
                  isLoading={vehicelIsLoading}
                  // openNominationHistory={openNominationHistory}
                />
              </div>

              <div className="items-center w-full justify-center flex">
                <ContraventionTable
                  openConventionTable={openConventionTable}
                  addVehicle={openAddVehicleDetailsDrawer}
                  plan_id={plan_id}
                  openAddBillingMethod={openAddBillingMethod}
                  vehicles={vehiclesData?.vehicles}
                  isLoading={vehicelIsLoading}
                />
              </div>
            </section>

            {/* Notifications and Calendar Section */}

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-[1380px] pt-[1.5rem] mt-6">
              <div className="w-full justify-center flex">
                <Calendar dateEvents={calenderData}/>
              </div>
              <div className="w-full flex justify-center">
                {/* <NotificationsTable
              openNotificationsTable={openNotificationsTable}
            /> */}
                <DashboardNotifications
                  openNotificationsTable={openNotificationsTable}
                  isDrawer={false}
                />
              </div>
            </section>

            {/* FAQ Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-[1380px] pt-[1.5rem] mt-4">
              <div className="flex justify-center">
                <EducationalMaterials
                  openEducationalMaterials={openEducationalMaterials}
                />
              </div>
              <div className="flex justify-center">
                {/* <FAQAccordion /> */}
                <FAQComponents />
              </div>
            </section>
          </main>
          <Drawer ref={drawerRef} isOpen={isOpen} toggleDrawer={toggleDrawer}>
            {drawerContent}
          </Drawer>
        </div>
      ) : null}
    </>
  );
}
