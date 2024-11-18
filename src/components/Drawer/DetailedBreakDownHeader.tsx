"use client";

import React from "react";
import { groteskText, groteskTextMedium } from "@/app/fonts";

const DetailedBreakdownItemHeader = ({ label, value }) => {
  return (
    <div className="flex flex-col w-full lg:justify-between items-start lg:items-center mb-4">
      <h2 className={`text-[#667185] text-sm lg:text-base ${groteskTextMedium.className} mb-1 lg:mb-0`}>
        {label}
      </h2>
      <p className={`text-[#000000] text-sm lg:text-base ${groteskText.className} break-words`}>
        {value}
      </p>
    </div>
  );
};

export default DetailedBreakdownItemHeader;
