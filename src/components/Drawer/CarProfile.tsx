import React, { useState } from "react";
import ThirdPartyNominees, {
  AddThirdPartyNominee,
} from "../card/ThirdPartyNominee";
import DrawerHeader from "./DrawerHeader";

const CarProfileDrawer = ({toggleDrawer}) => {
  const [form, setForm] = useState(false);
  return (
    <>
      <DrawerHeader
        toggleDrawer={toggleDrawer}
        title="Vehicle Overview"
        subTitle="Here’s a quick summary of your vehicle’s key details. Keep this information up to date to stay in sync with your account.."
      />
      {form ? (
        <AddThirdPartyNominee handleFormState={setForm} />
      ) : (
        <ThirdPartyNominees handleFormState={setForm} />
      )}
    </>
  );
};

export default CarProfileDrawer;
