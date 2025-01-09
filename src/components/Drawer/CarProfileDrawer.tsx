import React, { useRef, useState, useEffect } from "react";
import ThirdPartyNominees, {
  AddThirdPartyNominee,
} from "../card/ThirdPartyNominee";
import DrawerHeader from "./DrawerHeader";
import CarProfileSlider from "../CarProfileSlider";
import useIsMobile from "@/hooks/useIsMobile";
import CorporateCarProfileDrawer from "./CorporateCarProfileDrawer";
import { useAuthStore } from "@/lib/stores/authStore";
import Spinner from "../Spinner";
import { useGetNominees } from "@/hooks/queries/nominee";
import { useGetVehicles } from "@/hooks/queries/vehicles";

interface CarProfileDrawerProps {
  toggleDrawer: () => void;
  openAddVehicleDetailsDrawer: () => void;
  form: boolean;
  openNominationHistory: () => void;
  autoScrollToForm?: boolean;
  verify?: any;
  openAddBillingMethod?: any;
}

const CarProfileDrawer = ({
  verify,
  toggleDrawer,
  openAddVehicleDetailsDrawer,
  form,
  openNominationHistory,
  openAddBillingMethod,
  autoScrollToForm = false,
}: CarProfileDrawerProps) => {
  const [isForm, setIsForm] = useState(form);
  const [selectedVehicleIndex, setSelectedVehicleIndex] = useState(0);
  const isMobile = useIsMobile();

  const { vehiclesData } = useGetVehicles();
  const vehicles = vehiclesData?.vehicles;

  useEffect(() => {
    if (vehiclesData && vehiclesData.length === 0) {
      toggleDrawer();  // Trigger the drawer toggle
    }
  }, [vehicles, toggleDrawer]);



  const user = useAuthStore((state) => state.user);
  const { full_name, user_type = "individual" } = user || {};

  const handleVehicleChange = (index: number) => {
    setSelectedVehicleIndex(index); // Update selected vehicle index when slider changes
  };

  const formRef = useRef<HTMLDivElement>(null);

  const vehicleDetails = vehicles?.[selectedVehicleIndex] || {};
  const registrationNumber = vehicleDetails?.registration_number;

  const { nominees, error, isLoading } = useGetNominees(registrationNumber);

  useEffect(() => {
    if (autoScrollToForm && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [autoScrollToForm]);

  const renderNomineeSection = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col justify-center h-[300px] items-center">
          <Spinner />;
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col justify-center h-[300px] items-center">
          <p>Error loading nominees: {error.message || "Unknown error"}</p>;
        </div>
      );
    }

    return isForm ? (
      <div className="flex flex-col md:items-center" ref={formRef}>
        <AddThirdPartyNominee
          vehiclesRegNunbers={registrationNumber}
          toggleForm={setIsForm}
          openAddVehicleDetailsDrawer={openAddVehicleDetailsDrawer}
          selectedVehicle={nominees?.nominations || []}
        />
      </div>
    ) : (
      <div className="flex flex-col md:items-center" ref={formRef}>
        <ThirdPartyNominees
          user_type={user_type.toLowerCase() as "individual" | "corporate"}
          vehiclesRegNunbers={registrationNumber}
          toggleForm={setIsForm}
          nominees={nominees?.nominations || []}
          openAddBillingMethod={openAddBillingMethod}
        />
      </div>
    );
  };

  return (
    <div className="w-full overflow-hidden flex flex-col">
      <DrawerHeader
        toggleDrawer={toggleDrawer}
        title="Vehicle Overview"
        subTitle="Here’s a quick summary of your vehicle’s key details. Keep this information up to date to stay in sync with your account."
      />
      {user_type.toLowerCase() === "corporate" && !isMobile ? (
        // If the user is corporate and on a desktop, load corporate drawer
        <CorporateCarProfileDrawer
          full_name={full_name}
          user_type={user_type.toLowerCase()}
          openNominationHistory={openNominationHistory}
          openAddVehicleDetailsDrawer={openAddVehicleDetailsDrawer}
          toggleDrawer={toggleDrawer}
          isForm={isForm}
          vehicles={vehicles}
          verify={verify}
        />
      ) : (
        // Otherwise, use the individual + mobile flow
        <>
          <CarProfileSlider
            full_name={full_name}
            user_type={user_type.toLowerCase()}
            vehicles={vehicles}
            openAddVehicleDetailsDrawer={openAddVehicleDetailsDrawer}
            onVehicleChange={handleVehicleChange}
            setForm={setIsForm}
            scrollToForm={() =>
              formRef.current?.scrollIntoView({ behavior: "smooth" })
            }
          />
          {renderNomineeSection()}
        </>
      )}
    </div>
  );
};

export default CarProfileDrawer;
