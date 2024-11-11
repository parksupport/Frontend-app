import React, { useState } from "react";
import ThirdPartyNominees, {
  AddThirdPartyNominee,
} from "../card/ThirdPartyNominee";
import DrawerHeader from "./DrawerHeader";
import CarProfileSlider from "../CarProfileSlider";

const CarProfileDrawer = ({car,toggleDrawer,openVehicleDetails}) => {
  const [form, setForm] = useState(false);
  return (
    <div className="">
      <DrawerHeader
        toggleDrawer={toggleDrawer}
        title="Vehicle Overview"
        subTitle="Here’s a quick summary of your vehicle’s key details. Keep this information up to date to stay in sync with your account.."
      />
     <CarProfileSlider car={car} addVehicle={openVehicleDetails} />
      {form ? (
        <AddThirdPartyNominee handleFormState={setForm} />
      ) : (
        <ThirdPartyNominees handleFormState={setForm} />
      )}
    </div>
  );
};

export default CarProfileDrawer;
