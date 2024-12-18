import React, { useEffect, useState } from "react";
import DrawerHeader from "./DrawerHeader";
import { groteskText, groteskTextMedium } from "@/app/fonts";
import CiEdit from "@/assets/svg/EditIconInprofilepages.svg";
import TruncatedText from "../ToggleComponent/TruncatedText";
import { useAuthStore } from "@/lib/stores/authStore";

const UserInfoDrawer = ({ back, onEdit, userInfo }) => {
  const profileUser = useAuthStore((state) => state.user);

  const {
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
    uid,
  } = profileUser;

  const [firstName, lastName] =
    typeof full_name === "string" ? full_name.split(" ") : ["", ""];

  const userInfoSections = [
    {
      title: "Personal information",
      type: "User",
      fields: [
        { label: "First name", value: firstName },
        { label: "Last name", value: lastName },
        { label: "Email address", value: email_address },
        { label: "Phone", value: phone_number },
      ],
    },
    {
      title: "Address",
      type: "User",
      fields: [
        { label: "Country", value: country || " ----" },
        {
          label: "City / State",
          value: `${city || "----"}/${state || "----"}`,
        },
        { label: "Postal Code", value: post_code },
      ],
    },
  ];

  const conmpanyInfoSections = [
    {
      title: "Manager Information",
      type: "Manager",
      fields: [
        { label: "First Name", value: firstName },
        { label: "Last Name", value: lastName },
        { label: "Position", value: position },
        { label: "Email Address", value: email_address },
        { label: "Phone", value: phone_number },
      ],
    },
    {
      title: "Company Information",
      type: "Company",
      fields: [
        { label: "Company Name", value: company_name },
        {
          label: "Company Reg No.",
          value: company_registration_number,
        },
        { label: "Email Address", value: company_email },
        { label: "Company Phone", value: company_phone_number },
        { label: "Country", value: country || " ----" },
        {
          label: "City / State",
          value: `${city || "----"}/${state || "----"}`,
        },
        { label: "Postal Code", value: post_code || "----" },
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
        title={
          userInfo === "individual"
            ? "User Information"
            : " Corporate Information"
        }
        subTitle={
          userInfo === "individual"
            ? "This section is all about the user’s details."
            : "This section is all about the corporate’s details."
        }
      />

      <div
        className={`${groteskText.className} flex flex-col items-center justify-center gap-5 mt-12 md:mx-2 mb-[150px]`}
      >
        {/* Header Section */}
        <div className="border border-[#D0D5DD] rounded-[16px] flex items-center justify-between bg-white p-4 w-full">
          {/* User Info */}
          <div className="flex items-center space-x-4 py-2 md:p-2">
            {/* Circle for initials or fallback with edit icon */}
            <div className="relative w-[60px] h-[60px] md:w-[100px] md:h-[100px] rounded-full bg-gray-300 flex items-center justify-center text-white text-[20px] md:text-[36px] font-bold">
              {full_name ? (
                `${full_name.split(" ")[0][0]}${
                  full_name.split(" ")[1]?.[0] || ""
                }`
              ) : (
                <img
                  src="https://via.placeholder.com/80"
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              )}

              {/* Edit Icon */}
              <button
                className="absolute md:top-10 md:right-10 w-[20px] h-[20px] md:w-[24px] md:h-[24px] rounded-full flex items-center justify-center text-white"
                onClick={() =>
                  onEdit({
                    type: userInfo === "individual" ? "User" : "Company",
                  })
                }
              >
                <CiEdit color="black" size={20} />
              </button>
            </div>

            {/* User details */}
            <div>
              <h1
                className={`${groteskTextMedium.className} text-black text-[16px] md:text-[24px]`}
              >
                {full_name || "User Name"}
              </h1>
              <p
                className={` ${groteskText.className} text-[16px] md:text-[20px] text-gray-500`}
              >
                {uid}
              </p>
            </div>
          </div>

          {/* Edit Button */}

          {/* <button
            className="  -mt-[30px]   md:-mt-[60px] flex items-center space-x-2 border border-gray-200 px-3 py-1 md:px-5 md:py-2 rounded-[30px] hover:bg-blue-100"
            onClick={() =>
              onEdit({
                type: userInfo === "User" ? "User" : "Company",
              })
            }
          >
            <span className={` text-black ${groteskText.className}`}>Edit</span>
            <CiEdit color="black" size={20} />
          </button> */}
        </div>

        {/* Dynamic Sections */}
        {(userInfo === "individual"
          ? userInfoSections
          : conmpanyInfoSections
        ).map((section, index) => (
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
                onClick={() =>
                  onEdit({
                    type: section.type,
                  })
                }
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
                    {userInfo === "individual" ? (
                      <TruncatedText
                        text={field.value || field.label}
                        maxLength={18}
                        className={`${groteskText.className}`}
                      />
                    ) : (
                      <TruncatedText
                        text={field.value || field.label}
                        maxLength={10}
                        className={`${groteskText.className}`}
                      />
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserInfoDrawer;
