import { useState } from "react";
import InputField from "../InputField";
import { groteskText } from "@/app/fonts";
import Button from "../Buttons";
import DrawerHeader from "./DrawerHeader";
import { IoMdCheckmark } from "react-icons/io";
import { useEditProfile, useProfile } from "@/hooks/mutations/auth";
import { useAuthStore } from "@/lib/stores/authStore";

interface ProfileEditInfoDrawerProps {
  back?: () => void;
  type?: any;
}

export function ProfileEditInfoDrawer({
  back,
  type,
}: ProfileEditInfoDrawerProps) {
  const profileUser = useAuthStore((state) => state.user);

  const {
    id,
    address,
    full_name,
    email_address,
    user_type,
    date_of_birth,
    phone_number,
    post_code,
    company_name,
    company_registration_number,
    company_email,
    company_phone_number,
    position,
    state,
    country,
    city,
  } = profileUser;

  const [formData, setFormData] = useState({
    id: id || "",
    name: full_name || "",
    email_address: email_address || "",
    // vehicle: vehicle || "",
    phone_number: phone_number || "",
    company_phone_number: company_phone_number || "",
    address: address || "",
    post_code: post_code || "",
    position: position || "",
    city:city || "",
    state: state || "",
    country: country || "",
  });
  
  const [isChecked, setIsChecked] = useState(false);

  const { updateProfile, isError, error } = useEditProfile();

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
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // if (type === "!User") {
    //   // Logic to send the changes for admin approval
    //   alert(
    //     "Changes to company information have been sent for admin approval."
    //   );
    // } else {
    console.log(formData, "formdata");
    updateProfile(formData);
    back();
    // }
    if (type === "!User") {
      // Logic to send the changes for admin approval
      alert(
        "Changes to company information have been sent for admin approval."
      );
    } else {
      // Logic to save changes directly for individual users
      back();
    }
  };

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
      placeholder: "Enter your city",
      label: "City",
      name: "city",
      value: formData.city,
    },
    {
      type: "text",
      placeholder: "Enter your state",
      label: "State",
      name: "state",
      value: formData.state,
    },
    {
      type: "text",
      placeholder: "Enter your country",
      label: "Country",
      name: "country",
      value: formData.country,
    },
    {
      type: "text",
      placeholder: "Enter your postal code",
      label: "Postal Code",
      name: "post_code",
      value: formData.post_code,
    },
  ];

  const CompanyInputFields = [
    {
      type: "text",
      placeholder: "Enter your company name",
      label: "Company Name",
      name: "name",
      value: formData.name,
    },
    {
      type: "email",
      placeholder: "Enter your company email address",
      label: "Company Email Address",
      name: "email_address",
      value: formData.email_address,
      validationRules: validateEmail,
    },
    {
      type: "text",
      placeholder: "Enter your Company phone number",
      label: "Company Phone Number",
      name: "company_phone_number",
      value: formData.company_phone_number,
    },
    {
      type: "text",
      placeholder: "Enter your company address",
      label: "Company Address",
      name: "address",
      value: formData.address,
    },
    {
      type: "text",
      placeholder: "Enter company state",
      label: "State",
      name: "state",
      value: formData.state,
    },
    {
      type: "text",
      placeholder: "Enter company country",
      label: "Country",
      name: "country",
      value: formData.country,
    },
    {
      type: "text",
      placeholder: "Enter your company postal code",
      label: "Company Postal Code",
      name: "post_code",
      value: formData.post_code,
    },
  ];
  const CompanyManagerInputFields = [
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
      placeholder: "Enter your position at the company",
      label: "Position",
      name: "position",
      value: formData.position,
    },
  ];

  const inputFieldMapping = {
    User: UserInputFields,
    Company: CompanyInputFields,
    Manager: CompanyManagerInputFields,
  };

  const getInputFields = (type) => inputFieldMapping[type] || [];

  return (
    <div className=" mb-[300px] ">
      <DrawerHeader
        toggleDrawer={back}
        title={
          type === "User" ? "Edit Information" : "Edit Corporate Information"
        }
        subTitle="Put in the same details that exist with DVLA"
      />
      {/* 
      <form className="pt-5 md:pt-10 px-[20px] md:mx-auto ">
        <div className="flex flex-col gap-4 items-center "> */}
      <form className="pt-12 px-[20px] md:mx-auto md:w-[55%]">
        <div className="flex flex-col gap-4 items-center md:w-[65%] mx-auto">
          {/* Map through the inputFields array */}
          {getInputFields(type).map((field) => (
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
              className={` ${groteskText.className} w-full  `}
            />
          ))}
          <div className="flex items-start ml-1 -mt-3 space-x-2 w-full">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
              id="dvlaCheckbox"
              onChange={handleCheckboxChange}
            />
            <label
              htmlFor="dvlaCheckbox"
              className={` ${groteskText.className} text-[16px] text-[#667185] cursor-pointer w-full`}
            >
              Any changes made to your personal or vehicle-related information
              will be automatically revalidated with the Driver and Vehicle
              Licensing Agency (DVLA) to ensure accuracy and compliance.
            </label>
          </div>

          <Button
            variant="quinary"
            className="py-[10px] px-[12px] w-full"
            icon={<IoMdCheckmark size={25} />}
            iconPosition="right"
            disabled={!isChecked}
            onClick={handleFormSubmit}
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
