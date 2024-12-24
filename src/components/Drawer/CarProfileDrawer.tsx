import React, { useRef, useState, useEffect } from "react";
import ThirdPartyNominees, { AddThirdPartyNominee } from "../card/ThirdPartyNominee";
import DrawerHeader from "./DrawerHeader";
import CarProfileSlider from "../CarProfileSlider";
import useIsMobile from "@/hooks/useIsMobile";
import CorporateCarProfileDrawer from "./CorporateCarProfileDrawer";
import { useAuthStore } from "@/lib/stores/authStore";
import { useGetNominees } from "@/hooks/mutations/nominee";

interface CarProfileDrawerProps {
  toggleDrawer: () => void;
  addVehicleDetails: (details: any) => void;
  form: boolean;
  openNominationHistory: () => void;
  autoScrollToForm?: boolean;
}

const CarProfileDrawer = ({
  toggleDrawer,
  addVehicleDetails,
  form,
  openNominationHistory,
  autoScrollToForm = false,
}: CarProfileDrawerProps) => {
  const [isForm, setIsForm] = useState(form);
  const [selectedVehicleIndex, setSelectedVehicleIndex] = useState(0);
  const isMobile = useIsMobile();

  const user = useAuthStore((state) => state.user);
  const { full_name,  vehicles } = user || {};
  const user_type = "individual";

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
      return <p>Loading nominees...</p>;
    }

    if (error) {
      return <p>Error loading nominees: {error.message || "Unknown error"}</p>;
    }

    return isForm ? (
      <div className="flex flex-col md:items-center" ref={formRef}>
        <AddThirdPartyNominee
          vehiclesRegNunbers={registrationNumber}
          toggleForm={setIsForm}
          addVehicle={addVehicleDetails}
          selectedVehicle={nominees?.nominations || []}
        />
      </div>
    ) : (
      <div className="flex flex-col md:items-center" ref={formRef}>
        <ThirdPartyNominees
          vehiclesRegNunbers={registrationNumber}
          toggleForm={setIsForm}
          nominees={nominees || {}}
          selectedVehicle={nominees?.nominations || []}
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
      {user_type === "individual" || isMobile ? (
        <>
          <CarProfileSlider
            full_name={full_name}
            user_type={user_type}
            vehicles={vehicles}
            addVehicle={addVehicleDetails}
            onVehicleChange={handleVehicleChange}
            setForm={setIsForm}
            scrollToForm={() => formRef.current?.scrollIntoView({ behavior: "smooth" })}
          />
          {renderNomineeSection()}
        </>
      ) : (
        <CorporateCarProfileDrawer
          openNominationHistory={openNominationHistory}
          addVehicleDetails={addVehicleDetails}
          toggleDrawer={toggleDrawer}
          isForm={isForm}
        />
      )}
    </div>
  );
};

export default CarProfileDrawer;
