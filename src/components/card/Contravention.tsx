"use client";

import { groteskText, groteskTextMedium } from "@/app/fonts";
import itemDetails from "@/data/data.json";
import { MoveDiagonal } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "../Buttons";
import "./Contravention.css";

const ContraventionTable = ({ invoices ,openConventionTable}) => {
  const [visibleCount, setVisibleCount] = useState(3);

  const updateVisibleCount = () => {
    const isSmallScreen = window.matchMedia('(max-width: 640px)').matches;
    const isLargeScreen = window.matchMedia('(min-width: 3000px)').matches;

    if (isSmallScreen) {
      setVisibleCount(1);
    } else if (isLargeScreen) {
      setVisibleCount(3);
    } else {
      setVisibleCount(3); // Default value for medium screens
    }
  };

  useEffect(() => {
    // Update visibleCount on component mount
    updateVisibleCount();

    // Add event listener to update visibleCount on resize
    window.addEventListener('resize', updateVisibleCount);

    // Clean up event listener on component unmount
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);


  const handleButtonClick = () => {
    // setVisibleCount((prevCount) => prevCount + 1);
    openConventionTable()
  };

  return (
    <div className="max-w-[396px] w-full lg:max-w-[680px] bg-white rounded-[1.25rem] py-6 px-4 md:py-8 md:px-6 lg:px-8">
      <div className="flex justify-between flex-row items-center">
        <h1
          className={`text-[2rem] text-[#000000] ${groteskTextMedium.className} `}
        >
          Ticket
        </h1>{" "}
       
      </div>
      <table className="flex items-center justify-between lg:flex lg:flex-col w-full border border-solid border-[#C5D5F8] rounded-[12px] border-collapse-separate ">
        <thead className="border-b border-b-[#C5D5F8] lg:w-full">
          <tr className="flex pl-[1rem] flex-col lg:flex lg:flex-row border-b border-b-[#C5D5F8] lg:pl-0 lg:justify-between">
            <th
              className={`text-[#757575] text-[17px] self-start lg:px-[17px] py-[0.75rem]  lg:text-left   ${groteskText.className} `}
            >
              Contravention Type
            </th>
            <th
              className={`text-[#757575] text-[17px] self-start px-[4px] py-[0.75rem]     ${groteskText.className}`}
            >
              Vehicle Reg Number
            </th>
            <th
              className={`text-[#757575] text-[17px] self-start px-[4px] py-[0.75rem]    ${groteskText.className}`}
            >
              Issuing by
            </th>
            <th
              className={`text-[#757575] text-[17px] self-start px-[4px] py-[0.75rem]    ${groteskText.className}`}
            >
              Fine Amount
            </th>
            <th
              className={`text-[#757575] text-[17px] self-start  py-[0.75rem] pr-[1rem]    ${groteskText.className}`}
            >
              Status
            </th>
          </tr>
        </thead>
        <tbody className="lg:w-full">
  {itemDetails.contravention.slice(0, visibleCount).map((invoice) => (
    <tr key={invoice.ticket} className="flex flex-col px-[1rem] lg:flex lg:flex-row">
      <td
        className={`py-[0.75rem] self-end text-[#212121] text-[1rem] pl-[17px] lg:pl-0 lg:w-[28%] ${groteskText.className}`}
      
      >
        {invoice.ticket}
      </td>
      <td
        className={`text-[#212121] self-end text-center text-[1rem] py-[0.75rem] lg:pl-[3.4rem] lg:w-[20%] ${groteskText.className}`}
       
      >
        {invoice.reg_num}
      </td>
      <td
        className={`text-[#212121] self-end text-center text-[1rem] py-[0.75rem] lg:pl-[4.8rem] lg:w-[33%] ${groteskText.className}`}
      
      >
        {invoice.issuing_auth}
      </td>
      <td
        className={`text-[#212121] self-end text-center text-[1rem] py-[0.75rem] lg:w-[20%]  ${groteskText.className}`}
     
      >
        {invoice.fine_amount}
      </td>
      <span className="bg-[#B5E3C4] self-end  rounded-[22px] my-[0.75rem] flex justify-center w-[65px] h-[22px]">
        <td
          className={`text-center text-[#099137] text-[13px] ${groteskText.className}`}
         
        >
          {invoice.status}
        </td>
      </span>
    </tr>
  ))}
</tbody>


        <div className="hidden lg:flex  items-center flex-row justify-end mb-[1.25rem] mr-[8px] lg:self-end">
          {visibleCount < itemDetails.contravention.length && (
            <Button
              variant="quinary"
              onClick={handleButtonClick}
              className="items-center flex-row flex py-[0.53125rem] px-[12px]"
            >
              Expand tickets
            </Button>
          )}
        </div>
      </table>
      <div className=" items-center  flex flex-row justify-end mb-[1.25rem] mr-[8px] mt-[20px] lg:hidden">
          {visibleCount < itemDetails.contravention.length && (
            <Button
              variant="quinary"
              onClick={handleButtonClick}
              className="items-center flex-row flex py-[0.53125rem] px-[12px]"
            >
              Expand tickets
            </Button>
          )}
        </div>
    </div>
  );
};

export default ContraventionTable;