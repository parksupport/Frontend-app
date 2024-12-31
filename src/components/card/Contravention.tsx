"use client";

import { groteskText, groteskTextMedium } from "@/app/fonts";
import itemDetails from "@/data/data.json";
import { MoveDiagonal } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "../Buttons";
import "./Contravention.css";
import { useGetTicket } from "@/hooks/queries/ticket";
import TruncatedText from "../ToggleComponent/TruncatedText";

const ContraventionTable = ({ invoices, openConventionTable }) => {
  const [visibleCount, setVisibleCount] = useState(3);

  const updateVisibleCount = () => {
    const isSmallScreen = window.matchMedia("(max-width: 1024px)").matches;
    const isLargeScreen = window.matchMedia("(min-width: 3000px)").matches;

    if (isSmallScreen) {
      setVisibleCount(1);
    } else if (isLargeScreen) {
      setVisibleCount(3);
    } else {
      setVisibleCount(3); // Default value for medium screens
    }
  };

  const { ticketsData } = useGetTicket("ABC123");

  useEffect(() => {
    // Update visibleCount on component mount
    updateVisibleCount();

    // Add event listener to update visibleCount on resize
    window.addEventListener("resize", updateVisibleCount);

    // Clean up event listener on component unmount
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const handleButtonClick = () => {
    // setVisibleCount((prevCount) => prevCount + 1);
    openConventionTable();
  };

  return (
    <>
      {ticketsData?.tickets.length === 0 ? (
        <div className="max-w-[396px] min-h-[340px] w-full lg:max-w-[680px] bg-white rounded-[1.25rem] py-6 px-4 md:py-9 md:px-6 lg:px-8 flex items-center justify-center flex-col">
          <div className="flex items-center gap-2">
            {/* Add your icon here */}
            <span className="text-[26px]">
              {/* Replace with the icon component */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 9V6a3 3 0 116 0v3m-9 0h12a2.25 2.25 0 012.25 2.25v9A2.25 2.25 0 0118.75 21H5.25A2.25 2.25 0 013 18.75v-9A2.25 2.25 0 015.25 9z"
                />
              </svg>
            </span>
            <div className={`${groteskTextMedium.className} text-[26px]`}>
              No ticket Available
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-[396px] min-h-[340px] w-full lg:max-w-[680px] bg-white rounded-[1.25rem] py-6 px-4 md:py-9 md:px-6 lg:px-8 flex flex-col ">
          <div className="flex justify-between flex-row items-center">
            <h1
              className={`text-[24px] md:text-[2rem] text-[#000000] ${groteskTextMedium.className} `}
            >
              Ticket
            </h1>{" "}
            <div className="hidden lg:flex  items-center flex-row justify-end mb-[1.25rem] mr-[8px] lg:self-end">
              {/* {visibleCount < ticketsData?.tickets.length && ( */}
                <Button
                  variant="quinary"
                  onClick={handleButtonClick}
                  className={`py-[9px] px-[12px] text-[16px] `}
                >
                  Expand tickets
                </Button>
              {/* )} */}
            </div>
          </div>
          <table className="flex items-center justify-between lg:flex lg:flex-col w-full border border-solid border-[#C5D5F8] rounded-[12px] border-collapse-separate ">
            <thead className="border-b border-b-[#C5D5F8] lg:w-full">
              <tr className="flex pl-[1rem] flex-col lg:flex lg:flex-row border-b border-b-[#C5D5F8] lg:pl-0 lg:justify-between">
                <th
                  className={`text-[#757575] text-[17px] self-start lg:pl-[17px] py-[0.75rem]  lg:text-left   ${groteskTextMedium.className} `}
                >
                  Contravention Type
                </th>
                <th
                  className={`text-[#757575] text-[17px] self-start px-[4px] py-[0.75rem]     ${groteskTextMedium.className}`}
                >
                  Vehicle Reg No
                </th>
                <th
                  className={`text-[#757575] text-[17px] self-start px-[4px] py-[0.75rem]    ${groteskTextMedium.className}`}
                >
                  Issuing by
                </th>
                <th
                  className={`text-[#757575] text-[17px] self-start px-[4px] py-[0.75rem]    ${groteskTextMedium.className}`}
                >
                  Fine
                </th>
                <th
                  className={`text-[#757575] text-[17px] self-start  py-[0.75rem] pr-[1rem]    ${groteskTextMedium.className}`}
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="lg:w-full">
              {ticketsData?.tickets.slice(0, visibleCount).map((invoice) => (
                <tr
                  key={invoice.ticket}
                  className="flex flex-col px-[1rem] lg:flex lg:flex-row"
                >
                  <td
                    className={`pb-[0.75rem] self-end text-[#212121] text-[1rem] lg:pl-[17px] lg:pl-0 lg:w-[36%] ${groteskText.className}`}
                  >
                    <TruncatedText
                      text={invoice.details}
                      maxLength={15}
                      className={`${groteskText.className}`}
                    />
                  </td>
                  <td
                    className={`text-[#212121] self-end text-center text-[1rem] py-[0.75rem]  lg:w-[23%] ${groteskText.className}`}
                  >
                    {invoice.registration_number}
                  </td>
                  <td
                    className={`text-[#212121] self-end text-center text-[1rem] py-[0.75rem] lg:pl-[1.8rem] lg:w-[33%] ${groteskText.className}`}
                  >
                    {invoice.issue_date}
                  </td>
                  <td
                    className={`text-[#212121] self-end  text-[1rem] py-[0.75rem] lg:w-[14%] lg:pl-[5px]  ${groteskText.className}`}
                  >
                    {`£${invoice.amount}`}
                  </td>
                  <span
                    className={`self-end rounded-[22px] my-[0.75rem] flex justify-center w-[65px] h-[22px] ${
                      invoice.status === "Unpaid"
                        ? "bg-[#F8D7DA]"
                        : "bg-[#B5E3C4]"
                    }`}
                  >
                    <td
                      className={`text-center text-[13px] ${
                        invoice.status === "Unpaid"
                          ? "text-[#D9534F]"
                          : "text-[#099137]"
                      } ${groteskText.className}`}
                    >
                      {invoice.status}
                    </td>
                  </span>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default ContraventionTable;
