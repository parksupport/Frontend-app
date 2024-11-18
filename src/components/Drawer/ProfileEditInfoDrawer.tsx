import { useState } from "react";
import InputField from "../InputField";
import { groteskText } from "@/app/fonts";
import Button from "../Buttons";
import DrawerHeader from "./DrawerHeader";
import { IoMdCheckmark } from "react-icons/io";

interface ProfileEditInfoDrawerProps {
  back?: () => void;
  userRole?: any;
}

export function ProfileEditInfoDrawer({ back ,userRole}: ProfileEditInfoDrawerProps) {
  const [formData, setFormData] = useState({
    name: "",
    email_address: "",
    vehicle: "",
    phone_number: "",
    address: "",
    postal_code: "",
    position: "",
  });
  const [isChecked, setIsChecked] = useState(false);

  //   const handleSubmit = (e) => {
  //     e.preventDefault();  vehicle: any;
  //     toggleForm?: (state: boolean) => void;
  //     // login(formData);
  //   };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? null : "Invalid email format";
  };

  // Define input fields data array
  const UserInputFields = [
    {
      type: "text",
      placeholder: "Enter your full name",
      label: "Name",
      name: "name",
      value: formData.name,
    },
    {
      type: "email",
      placeholder: "Enter your email address",
      label: "Email Address",
      name: "email_address",
      value: formData.email_address,
      validationRules: validateEmail,
    },
    {
      type: "text",
      placeholder: "Enter your phone number",
      label: "Phone Number",
      name: "phone_number",
      value: formData.phone_number,
    },
    {
      type: "text",
      placeholder: "Enter your house address",
      label: "Address",
      name: "address",
      value: formData.address,
    },
    {
      type: "text",
      placeholder: "Enter your postal code",
      label: "Postal Code",
      name: "postal_code",
      value: formData.postal_code,
    },
  ];

  const CompanyInputFields = [
    {
      type: "text",
      placeholder: "Enter your full name",
      label: "Name",
      name: "name",
      value: formData.name,
    },
    {
      type: "email",
      placeholder: "Enter your email address",
      label: "Email Address",
      name: "email_address",
      value: formData.email_address,
      validationRules: validateEmail,
    },
    {
      type: "text",
      placeholder: "Enter your phone number",
      label: "Phone Number",
      name: "phone_number",
      value: formData.phone_number,
    },
    {
      type: "text",
      placeholder: "Enter your position",
      label: "Position",
      name: "position",
      value: formData.position,
    },
    {
      type: "text",
      placeholder: "Enter your house address",
      label: "Address",
      name: "address",
      value: formData.address,
    },
    {
      type: "text",
      placeholder: "Enter your postal code",
      label: "Postal Code",
      name: "postal_code",
      value: formData.postal_code,
    },
  ];



  return (
    <div className=" mb-[300px] ">
      <DrawerHeader
        toggleDrawer={back}
        title={userRole === "User" ? "Edit Information" : "Edit Corporate Information"}
        subTitle="Put in the same details that exist with DVLA"
      />

      <form className="pt-5 md:pt-10 px-[20px] md:mx-auto ">
        <div className="flex flex-col gap-4 items-center  md:mx-[55px]">
          {/* Map through the inputFields array */}
          {(userRole === "User" ? UserInputFields : CompanyInputFields).map((field) => (
            <InputField
              key={field.name} // Unique key for each input field
              type={field.type}
              placeholder={field.placeholder}
              label={field.label}
              name={field.name}
              value={field.value}
              onChange={handleChange}
              validationRules={field.validationRules} 
              variant="individual"
              className={` ${groteskText.className} w-full md:w-[60%] `}
            />
          ))}
<div className="flex items-start space-x-2 w-full md:w-[60%]">
  <input
    type="checkbox"
    className="mt-1 h-4 w-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500 cursor-pointer" 
    id="dvlaCheckbox"
    onChange={handleCheckboxChange}
  />
  <label
    htmlFor="dvlaCheckbox"
    className="text-[16px] text-[#667185] cursor-pointer" 
  >
    Any changes made to your personal or vehicle-related information
    will be automatically revalidated with the Driver and Vehicle
    Licensing Agency (DVLA) to ensure accuracy and compliance.
  </label>
</div>


          <Button
            variant="quinary"
            className="py-[10px] px-[12px] w-full md:w-[60%]"
            icon={<IoMdCheckmark size={25} />}
            iconPosition="right"
            disabled={!isChecked}
            onClick={() => {
              back();
            }}
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
