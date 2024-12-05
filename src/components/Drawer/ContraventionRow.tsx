"use client";

import React from "react";
import Link from "next/link";
import { groteskText } from "@/app/fonts";
import TruncatedText from "../ToggleComponent/TruncatedText";

const ContraventionRow = ({ invoice, handleRowClick }) => {
  return (
    
    <tr
      className="flex flex-col pl-[1rem] lg:flex lg:flex-row lg:border-b-[#D0D5DD] lg:border cursor-pointer hover:bg-[#FFFFFF] lg:w-full items-center justify-between "
      onClick={() => handleRowClick(invoice)}
    >
      <td className={`py-2  text-sm text-gray-700 w-2/12 leading-none whitespace-nowrap  ${groteskText.className}`}>
      <TruncatedText
                  text={invoice.ticket}
                  maxLength={15}
                  className={`${groteskText.className}`}
                />
       
      </td>
      <td className={`py-2 pl-[3.5rem] text-sm text-gray-700 leading-none w-2/12 whitespace-nowrap  ${groteskText.className}`}>
        {invoice.date}
      </td>
      <td className={`py-2 pl-[3.5rem] text-sm text-gray-700 leading-none w-2/12 whitespace-nowrap  ${groteskText.className}`}>
        {invoice.fine_amount}
      </td>
      <span className="bg-[#B5E3C4] sm:self-end  rounded-[22px]    my-[0.75rem] text-left flex justify-center w-[44px] h-[22px] ">
                 <td
                   className={`text-center text-[#099137] text-[13px] text-left   ${groteskText.className}`}
                 >
                   {invoice.status}
                 </td>
               </span>
    </tr>
  );
};

export default ContraventionRow;
