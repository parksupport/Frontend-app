import React, { useRef, useState } from "react";
import ThirdPartyNominees, {
  AddThirdPartyNominee,
} from "../card/ThirdPartyNominee";
import DrawerHeader from "./DrawerHeader";
import CarProfileSlider from "../CarProfileSlider";
import useIsMobile from "@/hooks/useIsMobile";
import CorporateCarProfileDrawer from "./CorporateCarProfileDrawer";

interface CarProfileDrawerProps {
  vehicles: any;
  toggleDrawer: any;
  addVehicleDetails: any;
  user: any;
  form: boolean;
  openNominationHistory: any;
}

const CarProfileDrawer = ({
  vehicles,
  toggleDrawer,
  addVehicleDetails,
  user,
  form,
  openNominationHistory,
}: CarProfileDrawerProps) => {
  const [isForm, setIsForm] = useState(form);
  const [selectedVehicleIndex, setSelectedVehicleIndex] = useState(0);
  const isMobile = useIsMobile();

  const handleVehicleChange = (index: number) => {
    setSelectedVehicleIndex(index); // Update the selected vehicle when slider changes
  };

  const formRef = useRef<HTMLDivElement>(null);

  const handleButtonClick = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const renderNomineeSection = () => {
    if (isForm) {
      return (
        <div ref={formRef}>
          <AddThirdPartyNominee
            vehiclesRegNunbers={vehicles.carDetails.map((vehicle) => ({
              value: vehicle.registrationNumber,
              label: vehicle.registrationNumber, // You can customize the label here
            }))}
            toggleForm={setIsForm}
            addVehicle={addVehicleDetails}
            nominees={vehicles?.carDetails?.[selectedVehicleIndex] || []}
          />
        </div>
      );
    } else {
      return (
        <div ref={formRef}>
          <ThirdPartyNominees
            toggleForm={setIsForm}
            nominees={vehicles?.carDetails?.[selectedVehicleIndex] || []}
          />
        </div>
      );
    }
  };

  return (
    <div className="w-full overflow-hidden">
      <DrawerHeader
        toggleDrawer={toggleDrawer}
        title="Vehicle Overview"
        subTitle="Here’s a quick summary of your vehicle’s key details. Keep this information up to date to stay in sync with your account.."
      />
      {user === "User" || isMobile ? (
        <>
          <CarProfileSlider
            vehicles={vehicles}
            addVehicle={addVehicleDetails}
            onVehicleChange={handleVehicleChange}
            user={user}
            setForm={setIsForm}
            scrollToForm={handleButtonClick}
          />
          {renderNomineeSection()}
        </>
      ) : (
        <CorporateCarProfileDrawer
          openNominationHistory={openNominationHistory}
          vehicles={vehicles}
          addVehicleDetails={addVehicleDetails}
          toggleDrawer={toggleDrawer}
          user={user}
          isForm={form}
        />
      )}
    </div>
  );
};

export default CarProfileDrawer;
