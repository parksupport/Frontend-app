import React, { useRef, useState, useEffect } from "react";
import ThirdPartyNominees, { AddThirdPartyNominee } from "../card/ThirdPartyNominee";
import DrawerHeader from "./DrawerHeader";
import CarProfileSlider from "../CarProfileSlider";
import useIsMobile from "@/hooks/useIsMobile";
import CorporateCarProfileDrawer from "./CorporateCarProfileDrawer";
import { useAuthStore } from "@/lib/stores/authStore";
import { useGetNominees } from "@/hooks/mutations/nominee";
import Spinner from "../Spinner";

interface CarProfileDrawerProps {
  toggleDrawer: () => void;
  openAddVehicleDetailsDrawer: () => void;
  form: boolean;
  openNominationHistory: () => void;
  autoScrollToForm?: boolean;
  vehicles:any
}

const CarProfileDrawer = ({
  toggleDrawer,
  openAddVehicleDetailsDrawer,
  form,
  openNominationHistory,
  autoScrollToForm = false,
  vehicles
}: CarProfileDrawerProps) => {
  const [isForm, setIsForm] = useState(form);
  const [selectedVehicleIndex, setSelectedVehicleIndex] = useState(0);
  const isMobile = useIsMobile();

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
      return <Spinner/>;
    }

    if (error) {
      return <p>Error loading nominees: {error.message || "Unknown error"}</p>;
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
          openNominationHistory={openNominationHistory}
          openAddVehicleDetailsDrawer={openAddVehicleDetailsDrawer}
          toggleDrawer={toggleDrawer}
          isForm={isForm}
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
