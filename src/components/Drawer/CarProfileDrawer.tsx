import React, { useState } from "react";
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
}

const CarProfileDrawer = ({
  vehicles,
  toggleDrawer,
  addVehicleDetails,
  user,
}: CarProfileDrawerProps) => {
  const [form, setForm] = useState(false);
  const [selectedVehicleIndex, setSelectedVehicleIndex] = useState(0);
  const isMobile = useIsMobile();

  const handleVehicleChange = (index: number) => {
    setSelectedVehicleIndex(index); // Update the selected vehicle when slider changes
  };

  const renderNomineeSection = () => {
    if (form) {
      return (
        <AddThirdPartyNominee
          vehiclesRegNunbers={vehicles.carDetails.map((vehicle) => ({
            value: vehicle.registrationNumber,
            label: vehicle.registrationNumber, // You can customize the label here
          }))}
          toggleForm={setForm}
          addVehicle={addVehicleDetails}
          nominees={
            vehicles?.carDetails?.[selectedVehicleIndex] || []}
        />
      );
    } else {
      return (
        <ThirdPartyNominees
          toggleForm={setForm}
          nominees={
            vehicles?.carDetails?.[selectedVehicleIndex] || []
          }
        />
      );
    }
  };

  return (
    <div className="w-full">
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
          />
          {renderNomineeSection()}
        </>
      ) : (
        <CorporateCarProfileDrawer
          vehicles={vehicles}
          addVehicleDetails={addVehicleDetails}
          toggleDrawer={toggleDrawer}
        />
      )}
    </div>
  );
};

export default CarProfileDrawer;
