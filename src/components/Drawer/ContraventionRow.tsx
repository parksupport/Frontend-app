"use client";

import React from "react";
import Link from "next/link";
import { groteskText } from "@/app/fonts";

const ContraventionRow = ({ invoice, handleRowClick }) => {
  return (
    <tr
      className="flex flex-col px-[1rem] lg:flex lg:flex-row lg:border-b-[#D0D5DD] lg:border cursor-pointer hover:bg-[#FFFFFF] w-full items-center justify-between "
      onClick={() => handleRowClick(invoice)}
    >
      <td className={`py-[0.75rem] self-end text-[#212121] pl-[17px] lg:pl-0 cursor-pointer lg:w-[14%]  ${groteskText.className}`}>
        {invoice.ticket}
      </td>
      <td className={`text-[#212121] self-end text-center py-[0.75rem] lg:pl-[4rem]  ${groteskText.className}`}>
        {invoice.date}
      </td>
      <td className={`text-[#212121] self-end text-center py-[0.75rem]   ${groteskText.className}`}>
        {invoice.fine_amount}
      </td>
      <span className="bg-[#B5E3C4] self-end  rounded-[22px]   my-[0.75rem] flex justify-center w-[44px] h-[22px] ">
                 <td
                   className={`text-center text-[#099137] text-[13px]    ${groteskText.className}`}
                 >
                   {invoice.status}
                 </td>
               </span>
    </tr>
  );
};

export default ContraventionRow;
