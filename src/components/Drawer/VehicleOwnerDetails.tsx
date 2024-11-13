import React, { useState } from "react";
import { groteskText, groteskTextMedium } from "@/app/fonts";
import Button from "../Buttons";
import InputField from "../InputField";
import DrawerHeader from "./DrawerHeader";
import ProfileSVG from "@/assets/svg/profile.svg";
import BuildingSVG from "@/assets/svg/building.svg";
import GroupSVG from "@/assets/svg/group-2user.svg";

const formConfigurations = {
  0: {
    title: "Fill in your friend/relative information",
    fields: [
      {
        name: "fullName",
        label: "Full Name",
        type: "text",
        placeholder: "Enter your friend/relative name",
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "Enter your friend/relative email address",
      },
      {
        name: "address",
        label: "Address",
        type: "text",
        placeholder: "Enter your friend/relative address",
      },
      {
        name: "phone_number",
        label: "Phone number",
        type: "text",
        placeholder: "Enter your friend/relative number",
      },
    ],
  },
  1: {
    title: "Fill in your company information",
    fields: [
      {
        name: "name",
        label: "Company Name",
        type: "text",
        placeholder: "Enter your company name",
      },
      {
        name: "company_id",
        label: "Company ID",
        type: "text",
        placeholder: "Enter your company ID number",
      },
      {
        name: "address",
        label: "Address",
        type: "text",
        placeholder: "Enter your company address",
      },
      {
        name: "lease_duration",
        label: "Duration of lease",
        type: "text",
        placeholder: "Enter your lease duration",
      },
    ],
  },
  2: {
    title: "Fill in the company information",
    fields: [
      {
        name: "name",
        label: "Company Name",
        type: "text",
        placeholder: "Enter your company name",
      },
      {
        name: "company_id",
        label: "Company ID",
        type: "text",
        placeholder: "Enter your company ID number",
      },
      {
        name: "address",
        label: "Address",
        type: "text",
        placeholder: "Enter your company address",
      },
    ],
  },
};

// Owner options
const owners = {
  0: "It belongs to a relative/friend",
  1: "It belongs to the company I work at",
  2: "I hired/leased it from a leasing company",
};

function DynamicForm({ formType, status }) {
  const [formData, setFormData] = useState(
    formConfigurations[formType]?.fields.reduce((acc, field) => {
      acc[field.name] = "";
      return acc;
    }, {})
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here
  };

  const formConfig = formConfigurations[formType];

  return (
    <div>
      <h1
        className={`${groteskTextMedium.className} text-[24px] md:text-[32px] text-wrap`}
      >
        {formConfig.title}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="mt-[8px] flex flex-col space-y-4 "
      >
        {formConfig.fields.map((field) => (
          <div key={field.name}>
            <InputField
              type={field.type}
              placeholder={field.placeholder}
              label={field.label}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              variant="individual"
              className={`w-full md:w-[75%] ${groteskText.className}`}
            />
          </div>
        ))}
        <div className="pb-[150px] pt-[20px]">
          <Button
            variant="quinary"
            className="py-[10px] px-[12px] w-full md:w-[75%]"
            onClick={status}
          >
            Continue to validate
          </Button>
        </div>
      </form>
    </div>
  );
}

const VehicleOwnerDetails = ({ toggleDrawer, VehicleStatus }) => {
  const [selectedKey, setSelectedKey] = useState("0"); 
  const [confirmedKey, setConfirmedKey] = useState(null); 

  // const VehicleStatus = () => {
  //   const status = checkVehicleStatus();
  //   if (status === "failed") {
  //     handleFailed();
  //   } else if (status === "success") {
  //     handleSuccess();
  //   }
  // };

  // const checkVehicleStatus = () => {
  //   // Replace this with actual conditions or API call
  //   const randomOutcome = Math.random() > 0.5 ? "success" : "failed";
  //   return randomOutcome;
  // };

  // Update selectedKey when an owner is selected
  const handleSelect = (key) => {
    setSelectedKey(key);
  };

  // Confirm selected option and update confirmedKey to display the form
  const handleContinue = () => {
    setConfirmedKey(selectedKey);
    console.log("Form confirmed for:", owners[selectedKey]);
  };

  // Render the form based on the confirmed owner
  const renderForm = () => {
    if (confirmedKey !== null) {
      return <DynamicForm formType={confirmedKey} status={VehicleStatus} />;
    }
    return null;
  };

  const icons = {
    0: <ProfileSVG color="#3957D7" size={24} className="mx-2" />,

    1: <BuildingSVG color="#3957D7" size={24} className="mx-2" />,
    2: <GroupSVG color="#3957D7" size={50} className="mx-2" />,
  };

  return (
    <>
      <DrawerHeader
        toggleDrawer={toggleDrawer}
        title="Which of these best describes your ownership of the vehicle?"
        className="text-[24px]"
      />
      <div className="flex flex-wrap flex-col items-start gap-5 mb-4 mt-[44px] mx-2  md:mx-[50px] ">
        {Object.entries(owners).map(([key, topic]) => (
          <button
            key={key}
            onClick={() => handleSelect(key)}
            className={`${
              groteskText.className
            } inline-flex items-center px-4 py-[18px] border rounded-[8px] text-[18px] ${
              selectedKey === key ? "border-[#4169E1]" : "border-[#D0D5DD]"
            }`}
          >
            {icons[key]}
            {topic}
          </button>
        ))}
        <div className="ml-0 md:ml:0   pt-[20px] pb-[60px] w-full">
          <Button
            onClick={handleContinue}
            variant="quinary"
            className="py-[10px] px-[12px] w-full md:w-[80%]"
            iconPosition="right"
          >
            Continue
          </Button>
        </div>
      </div>

      <div className=" mx-[16px]  md:ml-[50px] ">{renderForm()}</div>
    </>
  );
};

export default VehicleOwnerDetails;
