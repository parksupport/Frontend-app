"use client";

import React from "react";
import Link from "next/link";
import { groteskText } from "@/app/fonts";
import TruncatedText from "../ToggleComponent/TruncatedText";

const ContraventionRow = ({ invoice, handleRowClick }) => {
  return (
    <tr
      className={`flex flex-col pl-[1rem] 
                  lg:flex lg:flex-row 
                  lg:border-b-[#D0D5DD] lg:border 
                  cursor-pointer hover:bg-[#FFFFFF] 
                  lg:w-full items-center justify-between`}
      onClick={() => handleRowClick(invoice)}
    >
      {/* Ticket */}
      <td
        className={`py-2 text-sm text-gray-700 leading-none whitespace-nowrap 
                    text-end lg:text-left 
                    w-full lg:w-2/12 
                    ${groteskText.className}`}
      >
        <TruncatedText
          text={invoice.details}
          maxLength={15}
          className={`${groteskText.className}`}
        />
      </td>

      {/* Date */}
      <td
        className={`py-2 text-sm text-gray-700 leading-none whitespace-nowrap 
                    text-end lg:text-left
                    w-full lg:w-2/12 
                    lg:pl-[2.5rem] 
                    ${groteskText.className}`}
      >
        {invoice.issue_date}
      </td>

      {/* Fine Amount */}
      <td
        className={`py-2 text-sm text-gray-700 leading-none whitespace-nowrap 
                    text-end lg:text-left
                    w-full lg:w-2/12 
                    lg:pl-[1.5rem] 
                    ${groteskText.className}`}
      >
        {`£${invoice.amount}`}
      </td>

      {/* Status */}
      <td
        className={`flex w-full items-center justify-end 
              lg:w-0 lg:pl-0`}
      >
        <span
          className={`rounded-[22px] my-[0.75rem] flex justify-center w-[44px] h-[22px] ${
            invoice.status === "Unpaid" ? "bg-[#F8D7DA]" : "bg-[#B5E3C4]"
          }`}
        >
          <span
            className={`text-center text-[13px] ${
              invoice.status === "Unpaid" ? "text-[#D9534F]" : "text-[#099137]"
            } ${groteskText.className}`}
          >
            {invoice.status}
          </span>
        </span>
      </td>
    </tr>
  );
};

export default ContraventionRow;
