"use client";

import React from "react";
import Link from "next/link";
import { groteskText } from "@/app/fonts";
import TruncatedText from "../ToggleComponent/TruncatedText";

const ContraventionRow = ({ invoice, handleRowClick }) => {
  return (
    <tr
      className={`flex flex-col lg:px-[1rem]
                  lg:flex lg:flex-row 
                  lg:border-b-[#D0D5DD] lg:border 
                  cursor-pointer hover:bg-[#FFFFFF] 
                  lg:w-full items-center justify-between`}
      onClick={() => handleRowClick(invoice)}
    >
      {/* Ticket */}
      <td
        className={`py-2 text-sm text-gray-700 leading-none whitespace-nowrap w-0
                     lg:text-left 
                    lg:w-full lg:w-2/12 
                    ${groteskText.className}`}
      >
        <TruncatedText
          text={invoice.ticket}
          maxLength={15}
          className={`${groteskText.className}`}
        />
      </td>

      {/* Date */}
      <td
        className={`py-2 text-sm text-gray-700 leading-none whitespace-nowrap w-0
                     lg:text-left
                    lg:w-full lg:w-2/12 
                    lg:pl-[3.5rem] 
                    ${groteskText.className}`}
      >
        {invoice.date}
      </td>

      {/* Fine Amount */}
      <td
        className={`py-2 text-sm text-gray-700 leading-none whitespace-nowrap w-0
                     lg:text-left
                    lg:w-full lg:w-2/12 
                    lg:pl-[1.5rem] 
                    ${groteskText.className}`}
      >
        {invoice.fine_amount}
      </td>

      {/* Status */}
      <td
        className={`flex w-0 items-center lg:justify-end  
                    lg:w-0 lg:pl-0`}
      >
        <span
          className="bg-[#B5E3C4] rounded-[22px] my-[0.75rem]
                     flex justify-center w-[44px] h-[22px]"
        >
          <span
            className={`text-center text-[#099137] text-[13px] 
                        ${groteskText.className}`}
          >
            {invoice.status}
          </span>
        </span>
      </td>
    </tr>
  );
};

export default ContraventionRow;
