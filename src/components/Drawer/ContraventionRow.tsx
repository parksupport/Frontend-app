"use client";

import React from "react";
import Link from "next/link";
import { groteskText } from "@/app/fonts";
import TruncatedText from "../ToggleComponent/TruncatedText";

const ContraventionRow = ({ invoice, handleRowClick }) => {
  return (
    <tr
      className="flex w-full cursor-pointer hover:bg-[#FFFFFF]"
      onClick={() => handleRowClick(invoice)}
    >
      <td
        className={`flex-1 w-1/4  py-3 text-[#212121] whitespace-nowrap cursor-pointer ${groteskText.className}`}
      >
        <TruncatedText
          text={invoice.ticket}
          maxLength={15}
          className={`${groteskText.className}`}
        />
      </td>
      <td
        className={`flex-1 w-1/4  text-[#212121] text-center py-3 ${groteskText.className}`}
      >
        {invoice.date}
      </td>
      <td
        className={`flex-1 w-1/4  text-[#212121] text-center py-3 ${groteskText.className}`}
      >
        {invoice.fine_amount}
      </td>
      <td className={`flex-1 w-1/4  text-center py-3 ${groteskText.className}`}>
        <span className="bg-[#B5E3C4] rounded-[22px] flex justify-center items-center w-[65px] h-[22px] mx-auto">
          <span className={`text-[#099137] text-[13px] ${groteskText.className}`}>
            {invoice.status}
          </span>
        </span>
      </td>
    </tr>
  );
};



export default ContraventionRow;
