"use client";

import React from "react";
import { groteskText, groteskTextMedium } from "@/app/fonts";

const DetailedBreakdownItem = ({ label, value }) => {
  return (
    <tr className="w-full align-top flex">
      <td className={`text-[#667185] items-center text-sm lg:text-base pr-4 ${groteskTextMedium.className} w-[40%]`}>
        {label}
      </td>
      <td className={`text-[#000000] items-center text-sm lg:text-base ${groteskText.className} break-words w-[60%]`}>
        {value}
      </td>
    </tr>
  );
};

export default DetailedBreakdownItem;
