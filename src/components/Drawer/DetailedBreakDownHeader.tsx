"use client";

import React from "react";
import { groteskText, groteskTextMedium } from "@/app/fonts";

const DetailedBreakdownItemHeader = ({ label, value }) => {
  return (
    <div className="flex  w-[92%] lg:justify-between items-start  mt-[10px]">
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
