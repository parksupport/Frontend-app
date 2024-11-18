import React, { useState } from "react";
import ThirdPartyNominees, {
  AddThirdPartyNominee,
} from "../card/ThirdPartyNominee";
import DrawerHeader from "./DrawerHeader";
import CarProfileSlider from "../CarProfileSlider";


interface CarProfileDrawerProps{
  car:any;
  toggleDrawer:any;
  addVehicleDetails:any
}

const CarProfileDrawer = ({ car, toggleDrawer, addVehicleDetails }: CarProfileDrawerProps) => {
  const [form, setForm] = useState(false);
  return (
    <div className="w-full">
      <DrawerHeader
        toggleDrawer={toggleDrawer}
        title="Vehicle Overview"
        subTitle="Here’s a quick summary of your vehicle’s key details. Keep this information up to date to stay in sync with your account.."
      />
      <CarProfileSlider car={car} addVehicle={addVehicleDetails}   />
      {form ? (
        <AddThirdPartyNominee vehicle={car} toggleForm={setForm} addVehicle={addVehicleDetails} />
      ) : (
        <ThirdPartyNominees toggleForm={setForm} />
      )}
    </div>
  );
};

export default CarProfileDrawer;
