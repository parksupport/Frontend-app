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
import NotificationsTable from "@/components/NotificationTable";
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
import CorporateCarProfileDrawer from "@/components/Drawer/CorporateCarProfileDrawer";
import SettingsDrawer from "@/components/Drawer/SettingsDrawer";
import AddBillingMethodDrawer from "@/components/Drawer/AddBillingMethodDrawer";
import NotificationTableDrawer from "@/components/Drawer/NotificationTableDrawer";
import OpenNotification from "@/components/notification-popup/OpenNotification";
import UserInfoDrawer from "@/components/Drawer/UserInfoDrawer";
import { ProfileEditInfoDrawer } from "@/components/Drawer/ProfileEditInfoDrawer";
import ToggleButton from "@/components/ToggleComponent/ToggleComponent";
import DashboardNotifications from "@/components/card/DashBoardNotification";
import { useDisclosure } from "@chakra-ui/react";
import ModalComponent from "@/components/ModalComponent";
import { useRouter } from "next/navigation";

import ThirdPartyNominees, {
  NomineeMobile,
} from "@/components/card/ThirdPartyNominee";
import NominationHistoryTable from "@/components/NominationHistory";
import { useAuthStore } from "@/lib/stores/authStore";
import DisplayCarProfile from "@/components/card/CarProfile";
import { useAddVehicle } from "@/hooks/mutations/vehicles";

export default function DashboardPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState<React.ReactNode>(null);
  const { isOpen: isDisclosureOpen, onOpen, onClose } = useDisclosure();
  const [vehicleData, setVehicleData] = useState({});
  const drawerRef = useRef<any>(null);
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  
  useEffect(() => {
    if (vehicleData) {
      console.log("Updated vehicleData:", vehicleData); // Now it will log the updated state
      checkVehicleStatus(); // Optionally call the function after data update
    }
  }, [vehicleData]); // This will run when vehicleData changes
  

  useEffect(() => {
    if (!user) {
      console.log("User state is null or undefined, redirecting to login...");
      router.push("/auth/login");
    } else {
      console.log("User state:", user.vehicles);
    }
  }, [user, router]);

  // const { full_name, user_type, vehicles } = user || {};

  // const VehicleDetails = {full_name,...vehicles}
  const { full_name, user_type, vehicles = {} } = user || {};

  const VehicleDetails = { full_name, ...vehicles };

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
        vehicles={VehicleDetails}
        toggleDrawer={toggleDrawer}
        addVehicleDetails={addVehicleDetails}
        user={user_type}
        form={form}
        autoScrollToForm={autoScrollToForm}
      />
    );

    scrollToTopFromParent();
    openDrawer();
  };
  const openNominationHistory = () => {
    setDrawerContent(
      <NominationHistoryTable
        toggleDrawer={toggleDrawer}
        back={CarProfileDrawer}
      />
    );
    openDrawer();
  };

  const openProfileDrawer = () => {
    setDrawerContent(
      <UserInfoDrawer
        back={toggleDrawer}
        onEdit={openProfileEditDrawer}
        userInfo={user_type}
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

  const refreshAuthToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        console.error("Refresh token is missing!");
        return null;
      }
  
      const response = await fetch("http://localhost:8000/api/auth/refresh/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });
  
      if (!response.ok) {
        console.error("Failed to refresh token:", response.statusText);
        return null;
      }
  
      const data = await response.json();
      const newAuthToken = data?.access;
  
      if (newAuthToken) {
        localStorage.setItem("authToken", newAuthToken);
        return newAuthToken;
      }
      return null;
    } catch (error) {
      console.error("Token refresh failed:", error);
      return null;
    }
  };
  
  const checkVehicleStatus = async () => {
    console.log("vehicleData:", vehicleData);
    try {
      let authToken = localStorage.getItem("authToken");
      if (!authToken) {
        console.error("Authentication token is missing!");
        return "failed";
      }
  
      const response = await fetch("http://localhost:8000/api/vehicles/add/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          registration_number: vehicleData?.vegRegNumber,
          make: vehicleData?.make,
          model: vehicleData?.car_model,
          year: vehicleData?.year,
          postcode: vehicleData?.postcode,
        }),
      });
  
      if (response.status === 403 || response.status === 401) {
        console.warn("Token might be expired. Attempting to refresh...");
        authToken = await refreshAuthToken();
        if (!authToken) return "failed";
  
        // Retry the request with the new token
        const retryResponse = await fetch(
          "http://localhost:8000/api/vehicles/add/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({
              registration_number: vehicleData?.vegRegNumber,
              make: vehicleData?.make,
              model: vehicleData?.car_model,
              year: vehicleData?.year,
              postcode: vehicleData?.postcode,
            }),
          }
        );
  
        if (!retryResponse.ok) {
          console.error("Retry failed:", retryResponse.statusText);
          return "failed";
        }
  
        const retryData = await retryResponse.json();
        const verificationStatus = retryData?.vehicle?.verification_status;
        return verificationStatus === "Verified" ? "success" : "failed";
      }
  
      if (!response.ok) {
        console.error("Error:", response.statusText);
        return "failed";
      }
  
      const data = await response.json();
      const verificationStatus = data?.vehicle?.verification_status;
      return verificationStatus === "Verified" ? "success" : "failed";
    } catch (error) {
      console.error("Fetch failed:", error);
      return "failed";
    }
  };
  
  const VehicleStatus = async () => {
    const status = await checkVehicleStatus();
    if (status === "failed") {
      handleFailed();
    } else if (status === "success") {
      handleSuccess();
    }
  };

  const CheckVehicleOwner = (data) => {
    console.log("dataddd", data);
    setVehicleData(data); // Save form data to use in VehicleStatus check
    setDrawerContent(
      <VehicleOwnerCheck
        back={addVehicleDetails}
        OwnerInfoDrawer={OwnerInfoDrawer}
        vehicleStatus={VehicleStatus}
      />
    );
    scrollToTopFromParent();
    openDrawer();
  };

  const OwnerInfoDrawer = () => {
    setDrawerContent(
      <VehicleOwnerDetails
        toggleDrawer={toggleDrawer}
        VehicleStatus={VehicleStatus}
        user={user_type}
      />
    );
    scrollToTopFromParent();
    openDrawer();
  };

  const addVehicleDetails = () => {
    setDrawerContent(
      <AddVehicleDetailsDrawer
        back={toggleDrawer}
        CheckVehicleOwner={CheckVehicleOwner}
        userRole={user_type}
      />
    );
    scrollToTopFromParent();
    openDrawer();
  };

  const openNotificationRep = () => {
    setDrawerContent(
      <ThirdPartyNominees
        toggleForm={toggleDrawer}
        nominees={NomineeMobile}
        // OpenRecipient={OpenRecipient}
      />
    );

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
    setDrawerContent(
      <VehicleAddedFailed
        toggleDrawer={toggleDrawer}
        Success={handleSuccess}
        back={addVehicleDetails}
      />
    );
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

  const openAddBillingMethod = () => {
    setDrawerContent(
      <AddBillingMethodDrawer
        back={openSettingsDrawer}
        toggleDrawer={toggleDrawer}
      />
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
          />
          <ModalComponent
            isOpen={isDisclosureOpen}
            onClose={onClose}
            onOpen={onOpen}
            toggleDrawer={toggleDrawer}
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
                    Free plan
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
              <div className="w-full">
                {/* <CarProfile
              addVehicleDetails={addVehicleDetails}
              openCarProfile={() => openCarProfile(cars)}
              vehicles={cars}
              // openNominationHistory={openNominationHistory}
            /> */}
                <DisplayCarProfile
                  addVehicleDetails={addVehicleDetails}
                  openCarProfile={() => openCarProfile(vehicles)}
                  vehicles={vehicles}
                  // openNominationHistory={openNominationHistory}
                />
              </div>

              <div className="w-full justify-center flex">
                <ContraventionTable
                  invoices={undefined}
                  openConventionTable={openConventionTable}
                />
              </div>
            </section>

            {/* Notifications and Calendar Section */}

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-[1380px] pt-[1.5rem] mt-6">
              <div className="w-full justify-center flex">
                <Calendar />
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
