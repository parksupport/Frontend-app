"use client";

import React, { useEffect, useRef, useState } from 'react';
import DrawerHeader from './DrawerHeader';
import { groteskText, groteskTextMedium } from '@/app/fonts';
import itemDetails from "@/data/data.json";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import LineHeight from '@/assets/svg/LineHelight.svg';
import ContraImage from '@/assets/images/contraventioImage.jpg';
import Image from 'next/image';
import ContraventionRow from './ContraventionRow';
import DetailedBreakdownItem from './DetailedBreakDown';
import Button from '../Buttons';
import DetailedBreakdownItemHeader from './DetailedBreakDownHeader';

const ConventionTableDrawer = ({ toggleDrawer }) => {
  const itemsPerPage = 1; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const sliderRef = useRef(null);

  const handleRowClick = (invoice:any) => {
    setSelectedInvoice(invoice);
    console.log('Invoice clicked:', invoice);
  };

  const totalPages = Math.ceil(itemDetails.contravention.length / itemsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };


  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: itemsPerPage,
    slidesToScroll: 1,
    initialSlide: 0,
    beforeChange: (oldIndex, newIndex) => setCurrentPage(newIndex + 1),
  };
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 1024);
    };

    // Set initial screen size
    handleResize();

    // Add event listener to update screen size on resize
    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  // Slice the data to get the items for the current page
  const currentItems = itemDetails.contravention.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="">
      <DrawerHeader
        toggleDrawer={toggleDrawer}
        title="Ticket Summary"
        subTitle="Keep an eye on any active contraventions. You can pay fines or file an appeal directly from here."
      />

      {/* Contravention Table */}
      <Slider {...sliderSettings}>
        <div className="flex mx-0 flex-col mt-6 w-full border border-solid border-[#C5D5F8] rounded-lg overflow-hidden">
          <table className="flex items-center justify-between lg:flex lg:flex-col w-full">
            <thead className="border-b border-b-[#C5D5F8] w-full">
              <tr className="flex pl-[1rem] flex-col lg:flex lg:flex-row border-b border-b-[#C5D5F8] lg:pl-0 lg:justify-between w-full">
                <th className={`text-[#667185] self-start lg:px-[17px] py-[0.75rem] lg:text-left ${groteskText}`}>
                  Contravention Type
                </th>
                <th className={`text-[#667185] self-start px-[4px] py-[0.75rem] groteskText`}>
                  Date Issued
                </th>
                <th className={`text-[#667185] self-start px-[4px] py-[0.75rem] ${groteskText}`}>
                  Fine Amount
                </th>
                <th className={`text-[#667185] self-start px-[4px] py-[0.75rem] ${groteskText}`}>
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="w-full lg:w-full lg:bg-[#F9FAFB]">
              {(isSmallScreen ? currentItems : itemDetails.contravention).map((invoice,index) => (
                <ContraventionRow key={index} invoice={invoice} handleRowClick={handleRowClick} />
              ))}
            </tbody>
          </table>

          {/* Pagination Controls for Small Screens */}
          {isSmallScreen && (
            <div className="flex justify-between mt-4 px-4">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className={`flex items-center gap-1 px-3 py-1 rounded border border-[#D0D5DD] text-sm text-[#1C1B1B] ${groteskTextMedium.className} disabled:opacity-50`}
              >
                <ChevronLeft size={20} />
                Previous
              </button>
              <div className="flex items-center space-x-1">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <span
                    key={index}
                    className={`w-2 h-2 rounded-full ${currentPage === index + 1 ? 'bg-gray-500' : 'bg-gray-200'}`}
                  ></span>
                ))}
              </div>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`flex items-center gap-1 px-3 py-1 rounded border border-[#D0D5DD] text-sm text-[#1C1B1B] ${groteskTextMedium.className} disabled:opacity-50`}
              >
                Next
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>

      </Slider>


      {/* Detailed Breakdown */}
      {selectedInvoice && (
        <div className={`flex flex-col mt-8 ${isSmallScreen ? 'w-full' : 'hidden lg:flex lg:w-11/12 mx-auto'}`}>
          <h1 className={`text-2xl text-[#000000] ${groteskTextMedium.className} text-center`}>
            Contravention Detailed Breakdown
          </h1>

          <section className='border border-[#D0D5DD] rounded-lg bg-[#F9FAFB] mt-6 p-4 lg:p-6'>
            <div className='flex flex-col lg:flex-row lg:justify-center'>
              {/* Left Side Details */}
              <div className='flex flex-col lg:flex-row '>
                <DetailedBreakdownItemHeader
                  label="TICKET TYPE"
                  value={selectedInvoice.ticket}
                />
                <LineHeight className="hidden lg:block mx-4 " />
                <DetailedBreakdownItemHeader
                  label="ISSUING AUTHORITY"
                  value={selectedInvoice.issuing_auth}
                />
                <LineHeight className="hidden lg:block mx-4 " />
                <DetailedBreakdownItemHeader
                  label="FINE AMOUNT"
                  value={selectedInvoice.fine_amount}
                />
                <LineHeight className="hidden lg:block mx-4" />
                <DetailedBreakdownItemHeader
                  label="DUE DATE"
                  value={selectedInvoice.date}
                />

              </div>
            </div>
          </section>

          {/* Ticket Details */}

          <div className='flex justify-between'>
            <section className='mt-8 lg:w-[40%] mx-auto'>
              <h1 className={`text-xl text-[#000000] ${groteskTextMedium.className} mb-4`}>Ticket Details</h1>
              <div className='space-y-4'>
                <DetailedBreakdownItem
                  label="Violation Type Info"
                  value="Failure To Stop For School Bus Ticket"
                />
                <DetailedBreakdownItem
                  label="Violation Code"
                  value="V117 - Not stopping for a school bus with flashing lights"
                />
                <DetailedBreakdownItem
                  label="Officer Name"
                  value="Officer Sarah Jones"
                />
                <DetailedBreakdownItem
                  label="Traffic Situation"
                  value="School bus stopped with flashing red light"
                />
                <DetailedBreakdownItem
                  label="Location"
                  value="River St. & Oak Rd."
                />
                <DetailedBreakdownItem
                  label="Violation Date And Time"
                  value="12th October 2024, 14:32"
                />
                <DetailedBreakdownItem
                  label="Fine Breakdown"
                  value="Base fine: $100"
                />
              </div>
            </section>

            {/* Photo Evidence */}
            <section className='mt-8 lg:w-[40%] mx-auto'>
              <h1 className={`text-xl text-[#000000] ${groteskTextMedium.className} mb-4`}>Photo Evidence</h1>
              <div className='flex justify-center'>
                <Image
                  src={ContraImage}
                  alt="Contravention Evidence"
                  width={396}
                  height={268}
                  className="rounded-md"
                />
              </div>
            </section>
          </div>

        </div>
      )}
    </div>
  );
};

export default ConventionTableDrawer;
