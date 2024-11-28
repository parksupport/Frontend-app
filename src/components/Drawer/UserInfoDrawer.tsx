import React, { useState } from "react";
import DrawerHeader from "./DrawerHeader";
import { groteskText, groteskTextMedium } from "@/app/fonts";
import { CiEdit } from "react-icons/ci";
import TruncatedText from "../ToggleComponent/TruncatedText";

const UserInfoDrawer = ({ back, onEdit, userInfo }) => {
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
      title: "Company Information",
      fields: [
        { label: "Company Name", value: companyData.company.name },
        {
          label: "Company Reg No.",
          value: companyData.company.registrationNumber,
        },
        { label: "Email Address", value: companyData.user.email },
        { label: "Company Phone", value: companyData.company.phone },
        { label: "Country", value: companyData.user.address.country },
        {
          label: "City / State",
          value: `${companyData.user.address.city}, ${companyData.user.address.state}`,
        },
        { label: "Postal Code", value: companyData.user.address.postalCode },
      ],
    },
    // {
    //   title: "Address",
    //   fields: [
    //   ],
    // },
  ];

  return (
    <div className="">
      {/* Drawer Header */}
      <DrawerHeader
        toggleDrawer={back}
        title="User Information"
        subTitle="This section is all about the user’s personal details."
      />

      <div
        className={`${groteskText.className} flex flex-col items-center justify-center gap-5 mt-12 md:mx-2 mb-[150px]`}
      >
        {/* Header Section */}
        <div className="border border-[#D0D5DD] rounded-[16px] flex items-center justify-between bg-white p-4 w-full">
          {/* User Info */}
          <div className="flex items-center space-x-4 py-2 md:p-2">
            <img
              src={user?.profileImage || "https://via.placeholder.com/80"}
              alt="Profile"
              className="w-[60px] h-[60px] md:w-[100px] md:h-[100px] rounded-full object-cover"
            />
            <div>
              <h1
                className={`${groteskTextMedium.className} text-black text-[16px] md:text-[24px]`}
              >
                {user?.name || "User Name"}
              </h1>
              <p
                className={` ${groteskText.className} text-[16px] md:text-[20px] text-gray-500`}
              >
                {user?.role || "User Role"}
              </p>
            </div>
          </div>

          {/* Edit Button */}
          <button
            className="  -mt-[30px]   md:-mt-[60px] flex items-center space-x-2 border border-gray-200 px-3 py-1 md:px-5 md:py-2 rounded-[30px] hover:bg-blue-100"
            onClick={onEdit}
          >
            <span className={` text-black ${groteskText.className}`}>Edit</span>
            <CiEdit color="black" size={20} />
          </button>
        </div>

        {/* Dynamic Sections */}
        {(userInfo === "User" ? userInfoSections : conmpanyInfoSections).map(
          (section, index) => (
            <div
              key={index}
              className=" border border-[#D0D5DD] rounded-[16px] px-3 py-5 md:p-2 w-full"
            >
              <div className="flex items-center justify-between">
                <h2
                  className={`${groteskTextMedium.className} text-black text-[20px] md:text-[24px] mb-4`}
                >
                  {section.title}
                </h2>
                <button
                  className=" -mt-3 flex items-center space-x-2 border border-gray-200 px-3 py-1 md:px-5 md:py-2 rounded-[30px] hover:bg-blue-100"
                  onClick={onEdit}
                >
                  <span className={` text-black ${groteskText.className}`}>
                    Edit
                  </span>
                  <CiEdit color="black" size={20} />
                </button>
              </div>
              <div
                className={`grid   ${
                  section.fields.length <= 4
                    ? "grid-cols-2 "
                    : "grid-cols-2 md:grid-cols-3 gap-x-8"
                } gap-y-4 text-gray-700`}
              >
                {section.fields.map((field, fieldIndex) => (
                  <div key={fieldIndex} className="py-1">
                    <p
                      className={`${groteskText.className} text-[16px] md:text-[18px] text-[#667185] text-wrap`}
                    >
                      {field.label}
                    </p>
                    <p
                      className={`${groteskText.className} text-black text-[16px] md:text-[18px]`}
                    >
                      {userInfo === "User" ? (
                        field.value || field.label
                      ) : (
                        <TruncatedText
                          text={field.value || field.label}
                          maxLength={15}
                          className={`${groteskText.className}`}
                        />
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default UserInfoDrawer;
