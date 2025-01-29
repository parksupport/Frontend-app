"use client";

import React from "react";
import { groteskText } from "@/app/fonts";
import TruncatedText from "../ToggleComponent/TruncatedText";
import useIsMobile from "@/hooks/useIsMobile";

const ContraventionRow = ({ invoice, handleRowClick, selectedInvoice }) => {
  const isSelected =
    selectedInvoice && selectedInvoice.ticket_id === invoice.ticket_id;

  const isMobile = useIsMobile();

  return (
    <tr
      className={`flex flex-col lg:px-[1rem] lg:flex lg:flex-row lg:border-b-[#D0D5DD] lg:border cursor-pointer lg:w-full items-center justify-between ${
        !isMobile && isSelected ? "bg-gray-300" : ""
      }`}
      onClick={() => handleRowClick(invoice)}
    >
      {/* Table row content */}

      {/* Ticket */}
      <td
        className={`py-2 text-gray-700 whitespace-nowrap w-0
                     lg:text-left 
                    lg:w-full lg:w-2/12 
                    ${groteskText.className}`}
      >
        <TruncatedText
          text={invoice.registration_number}
          maxLength={15}
          className={`${groteskText.className}`}
        />
      </td>

      {/* Issuing Authority */}
      <td
        className={`py-2 text-gray-700 whitespace-nowrap w-0
                     lg:text-left
                    lg:w-full lg:w-2/12 
                    ${groteskText.className}`}
      >
        <TruncatedText
          text={invoice.issuing_authority}
          maxLength={isMobile ? 15 : 20}
          className={`${groteskText.className}`}
        />
      </td>

      {/* Date */}
      <td
        className={`py-2 text-gray-700 whitespace-nowrap w-0
                     lg:text-left
                    lg:w-full lg:w-2/12 
                     lg:pl-[4rem] 
                    ${groteskText.className}`}
      >
        {invoice.issue_date}
      </td>

      {/* Due Date */}
      <td
        className={`py-2 text-gray-700 whitespace-nowrap w-0
                     lg:text-left
                    lg:w-full lg:w-2/12 
                    ${groteskText.className}`}
      >
        {invoice.due_date}
      </td>

      {/* Fine Amount */}
      <td
        className={`py-2 text-gray-700  whitespace-nowrap w-0
                     lg:text-left
                    lg:w-full lg:w-2/12 
                    ${groteskText.className}`}
      >
        {`£${invoice.amount}`}
      </td>

      {/* Status */}
      <td className={`flex w-0 items-center lg:justify-end lg:w-0 lg:pl-0`}>
        <span
          className={`self-end px-[25px] rounded-[22px] my-[0.75rem] flex justify-center w-[65px] h-[22px] ${
            invoice.status === "Unpaid"
              ? "bg-[#F8D7DA]"
              : invoice.status === "Disputed"
              ? "bg-[#FFF3CD]"
              : "bg-[#B5E3C4]"
          }`}
        >
          <span
            className={`text-center text-[13px] ${
              invoice.status === "Unpaid"
                ? "text-[#D9534F]"
                : invoice.status === "Disputed"
                ? "text-[#F0AD4E]"
                : "text-[#099137]"
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
