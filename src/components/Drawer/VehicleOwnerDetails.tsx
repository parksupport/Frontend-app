import React, { useEffect, useState } from "react";
import { groteskText, groteskTextMedium } from "@/app/fonts";
import Button from "../Buttons";
import InputField from "../InputField";
import DrawerHeader from "./DrawerHeader";
import ProfileSVG from "@/assets/svg/profile.svg";
import BuildingSVG from "@/assets/svg/building.svg";
import GroupSVG from "@/assets/svg/group-2user.svg";
import { useAddVehicle } from "@/hooks/mutations/vehicles";

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
        name: "company_name",
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
        name: "company_name",
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

function DynamicForm({ formType, status, clear, vehicleData, back }) {
  const { addVehicle, error, isError } = useAddVehicle();
  const [formData, setFormData] = useState(
    formConfigurations[formType]?.fields.reduce((acc, field) => {
      acc[field.name] = "";
      return acc;
    }, {})
  );

  // Reset form data when 'clear' prop is true
  useEffect(() => {
    if (clear) {
      setFormData(
        formConfigurations[formType]?.fields.reduce((acc, field) => {
          acc[field.name] = "";
          return acc;
        }, {})
      );
    }
  }, [clear, formType]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation (optional, depending on your requirements)
    for (const field in formData) {
      if (!formData[field]) {
        alert(`${field} is required.`);
        return;
      }
    }

    const mergedData = { ...formData, ...vehicleData };
    console.log("formData", mergedData);
    // You can create a form submission logic here
    status(mergedData);

  };

  const formConfig = formConfigurations[formType];

  return (
    <div className="">
      <h1
        className={`${groteskTextMedium.className} md:mx-[40px] text-black text-[24px] md:text-[30px] text-wrap`}
      >
        {formConfig.title}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="mt-[8px] flex flex-col space-y-4  "
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
              className={`w-full  ${groteskText.className}`}
            />
          </div>
        ))}
        <div className="pb-[150px] pt-[20px]">
          <Button
            variant="quinary"
            className="py-[10px] px-[12px] w-full"
            type="submit"
          >
            Continue to validate
          </Button>
        </div>
      </form>
    </div>
  );
}

const VehicleOwnerDetails = ({
  toggleDrawer,
  VehicleStatus,
  user,
  vehicleData,
  
}) => {
  // Owner options

  const User = {
    0: "Family/Friend",
    1: "Owned by company",
    2: "Hired/Lease",
  };

  const Corporate = {
    1: "Owned by company",
    2: "Hired/Lease",
  };

  const owners = user === "individual" ? User : Corporate;

  const initialSelectKey = user === "individual" ? "0" : "1";

  const [selectedKey, setSelectedKey] = useState(initialSelectKey);
  const [isClearForm, setClearForm] = useState(false);

  function clearForm() {
    setClearForm(true);
  }

  // Handle owner selection
  const handleSelect = (key) => {
    setSelectedKey(key);
    console.log("Form confirmed for:", owners[key]);
    clearForm();
  };

  // Render the dynamic form based on selectedKey
  const renderForm = ({ toggleDrawer }) => {
    return (
      <DynamicForm
        formType={selectedKey}
        status={VehicleStatus}
        clear={isClearForm}
        vehicleData={vehicleData}
        back={toggleDrawer}
      />
    );
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
      />
      <div className="flex b flex-col md:items-center">
        <div
          className={`flex flex-wrap ${
            user === "user" ? "flex-col " : "flex-col md:flex-row"
          } items-start gap-5 mb-4 mt-[44px] md:mx-[60px]`}
        >
          {Object.entries(owners).map(([key, topic]) => (
            <button
              key={key}
              onClick={() => handleSelect(key)}
              className={`${
                groteskText.className
              } inline-flex items-center px-4 py-[18px] border rounded-[8px] text-[18px] text-black md:w-[300px]  whitespace-nowrap ${
                selectedKey === key ? "border-[#4169E1]" : "border-[#D0D5DD]"
              }`}
            >
              {icons[key]}
              {topic}
            </button>
          ))}
        </div>

        <div className="flex flex-col md:items-center my-[94px] mx-[16px]  md:w-[50%]">
          {renderForm({toggleDrawer})}
        </div>
      </div>
    </>
  );
};

export default VehicleOwnerDetails;
