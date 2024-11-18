import React, { useState } from "react";
import DrawerHeader from "./DrawerHeader";
import { groteskText, groteskTextMedium } from "@/app/fonts";
import useIsMobile from "@/hooks/useIsMobile";
import { CiEdit } from "react-icons/ci";


const UserInfoDrawer = ({ back, onEdit }) => {
  const isMobile = useIsMobile();
  const [user, setUser] = useState({
    profileImage: "https://via.placeholder.com/80",
    name: "Wisdom Odili",
    role: "Lead's United Kingdom",
    firstName: "Wisdom",
    lastName: "Odili",
    email: "odiliwisdom5@gmail.com",
    phone: "+234 91 283 396 67",
    address: {
      country: "United Kingdom",
      city: "Birmingham",
      state: "England",
      postalCode: "ERT 63574",
    },
  });

  const userInfoSections = [
    {
      title: "Personal information",
      fields: [
        { label: "First name", value: user?.firstName },
        { label: "Last name", value: user?.lastName },
        { label: "Email address", value: user?.email },
        { label: "Phone", value: user?.phone },
      ],
    },
    {
      title: "Address",
      fields: [
        { label: "Country", value: user?.address?.country },
        {
          label: "City / State",
          value: `${user?.address?.city}, ${user?.address?.state}`,
        },
        { label: "Postal Code", value: user?.address?.postalCode },
      ],
    },
  ];

  const companyData = {
    company: {
      name: "Acme Corp",
      registrationNumber: "12345678",
      phone: "+1 (555) 123-4567",
    },
    user: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@acmecorp.com",
      phone: "+1 (555) 987-6543",
      role: "CEO",
      address: {
        country: "United States",
        city: "San Francisco",
        state: "California",
        postalCode: "94103",
      },
    },
  };

  const conmpanyInfoSections = [
    {
      title: "Company Information",
      fields: [
        { label: "Company Name", value: companyData.company.name },
        {
          label: "Company Registration Number",
          value: companyData.company.registrationNumber,
        },
        { label: "Email Address", value: companyData.user.email },
        { label: "Company Phone", value: companyData.company.phone },
      ],
    },
    {
      title: "Manager Information",
      fields: [
        { label: "First Name", value: companyData.user.firstName },
        { label: "Last Name", value: companyData.user.lastName },
        { label: "Position", value: companyData.user.role },
        { label: "Email Address", value: companyData.user.email },
        { label: "Phone", value: companyData.user.phone },
      ],
    },
    {
      title: "Address",
      fields: [
        { label: "Country", value: companyData.user.address.country },
        {
          label: "City / State",
          value: `${companyData.user.address.city}, ${companyData.user.address.state}`,
        },
        { label: "Postal Code", value: companyData.user.address.postalCode },
      ],
    },
  ];

  const isUserInfo = false; // Toggle between user or company info sections

  return (
    <>
      {/* Drawer Header */}
      <DrawerHeader
        toggleDrawer={back}
        title="User Information"
        subTitle="This section is all about the user’s personal details."
      />

      <div
        className={`${groteskText.className} flex flex-col items-center justify-center gap-5 mt-12 md:mx-5 mb-[150px]`}
      >
        {/* Header Section */}
        <div className="border border-[#D0D5DD] rounded-[16px] flex items-center justify-between bg-white p-4 w-full">
          {/* User Info */}
          <div className="flex items-center space-x-4 py-2 md:p-[15px]">
            <img
              src={user?.profileImage || "https://via.placeholder.com/80"}
              alt="Profile"
              className="w-[60px] h-[60px] md:w-[100px] md:h-[100px] rounded-full object-cover"
            />
            <div>
              <h1
                className={`${groteskTextMedium.className} text-[16px] md:text-[28px]`}
              >
                {user?.name || "User Name"}
              </h1>
              <p className="text-[16px] md:text-[20px] text-gray-500">
                {user?.role || "User Role"}
              </p>
            </div>
          </div>

          {/* Edit Button */}
          <button
            className="  -mt-[30px]   md:-mt-[60px] flex items-center space-x-2 border border-gray-200 px-3 py-1 md:px-5 md:py-2 rounded-[30px] hover:bg-blue-100"
            onClick={onEdit}
          >
            <span>Edit</span>
            <CiEdit  color="black" size={20} />
          </button>
        </div>

        {/* Dynamic Sections */}
        {(isUserInfo ? userInfoSections : conmpanyInfoSections).map(
          (section, index) => (
            <div
              key={index}
              className="bg-white border border-[#D0D5DD] rounded-[16px] px-3 py-2 md:p-6 w-full"
            >
              <h2
                className={`${groteskTextMedium.className} text-[20px] md:text-[28px] mb-4`}
              >
                {section.title}
              </h2>
              <div
                className={`grid   ${
                  section.fields.length <= 4
                    ? "grid-cols-2 gap-x-6 md:gap-x-0 md:w-[78%] "
                    : "grid-cols-2 md:grid-cols-3 gap-x-4 "
                } gap-y-4 text-gray-700`}
              >
                {section.fields.map((field, fieldIndex) => (
                  <div key={fieldIndex}>
                    <p
                      className={`${groteskText.className} text-[16px] md:text-[20px] text-[#667185] text-wrap `}
                    >
                      {field.label}
                    </p>
                    <p
                      className={`${groteskText.className} text-black text-[16px] md:text-[18px]`}
                    >
                      {field.value || field.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default UserInfoDrawer;
