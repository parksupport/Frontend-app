import React, { useRef, useState } from "react";
import ThirdPartyNominees, {
  AddThirdPartyNominee,
} from "../card/ThirdPartyNominee";
import DrawerHeader from "./DrawerHeader";
import CarProfileSlider from "../CarProfileSlider";
import useIsMobile from "@/hooks/useIsMobile";
import CorporateCarProfileDrawer from "./CorporateCarProfileDrawer";
import { useAuthStore } from "@/lib/stores/authStore";

interface CarProfileDrawerProps {
  vehicles: any;
  toggleDrawer: any;
  addVehicleDetails: any;
  user_type: any;
  form: boolean;
  openNominationHistory: any;
  autoScrollToForm?: any;
  owner:string;
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
    const { full_name, user_type, vehicles } = user || {};



  const handleVehicleChange = (index: number) => {
    setSelectedVehicleIndex(index); // Update the selected vehicle when slider changes
  };

  const formRef = useRef<HTMLDivElement>(null);

  const handleButtonClick = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  React.useEffect(() => {
    if (autoScrollToForm) {
      handleButtonClick();
    }
  }, [autoScrollToForm]);

  const renderNomineeSection = () => {
    if (isForm) {
      return (
        <div ref={formRef}>
          <AddThirdPartyNominee
            vehiclesRegNunbers={vehicles.map((vehicle) => ({
              value: vehicle.registration_number,
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
    <div className="w-full overflow-hidden flex flex-col justify-center items-center">
      <DrawerHeader
        toggleDrawer={toggleDrawer}
        title="Vehicle Overview"
        subTitle="Here’s a quick summary of your vehicle’s key details. Keep this information up to date to stay in sync with your account.."
      />
      {user_type === "individual" || isMobile ? (
        <>
          <CarProfileSlider
         
            addVehicle={addVehicleDetails}
            onVehicleChange={handleVehicleChange}

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
          user={user_type}
          isForm={form}
          
        />
      )}
    </div>
  );
};

export default CarProfileDrawer;
