import React, { useState } from "react";
import ThirdPartyNominees, { AddThirdPartyNominee } from "../card/ThirdPartyNominee";


const CarProfileDrawer = () => {
  const [form, setForm] = useState(false);
  return (
    <>
      {form ? (
        <AddThirdPartyNominee handleFormState={setForm} /> 
      ) : (
        <ThirdPartyNominees handleFormState={setForm}/> 
      )}
    </>
  );
};

export default CarProfileDrawer;
