"use client";

import { groteskTextMedium } from "@/app/fonts";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import ContraImage from "@/assets/images/contraventioImage.jpg";
import { useGetAllTicket } from "@/hooks/queries/ticket";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import ContraventionRow from "./ContraventionRow";
import DetailedBreakdownItem from "./DetailedBreakDown";
import DrawerHeader from "./DrawerHeader";
import { Spinner } from "@chakra-ui/react";

const ConventionTableDrawer = ({ toggleDrawer }) => {
  const itemsPerPage = 1; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const { ticketsData, isLoading } = useGetAllTicket();

  useEffect(() => {
    if (isLoading) {
      setSelectedInvoice(null);
    }
  }, [isLoading]);

  const handleRowClick = (invoice) => {
    setSelectedInvoice(invoice);
  };

  const totalPages = Math.ceil(
    (ticketsData?.tickets?.length || 0) / itemsPerPage
  );

  const handlePreviousPage = () => {
    setCurrentPage((prev) => {
      const newPage = Math.max(prev - 1, 1);
      setSelectedInvoice(
        ticketsData?.tickets?.[(newPage - 1) * itemsPerPage] || null
      );
      return newPage;
    });
  };
  
  const handleNextPage = () => {
    setCurrentPage((prev) => {
      const newPage = Math.min(prev + 1, totalPages);
      setSelectedInvoice(
        ticketsData?.tickets?.[(newPage - 1) * itemsPerPage] || null
      );
      return newPage;
    });
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
  const currentItems =
    ticketsData?.tickets?.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    ) || [];

  return (
    <div className="flex justify-center items-center flex-col">
      <DrawerHeader
        toggleDrawer={toggleDrawer}
        title="Ticket Summary"
        subTitle="Keep an eye on any active contraventions. You can pay fines or file an appeal directly from here."
      />

      {/* Contravention Table */}
      {isLoading ? (
        <div className="max-w-[396px] min-h-[340px] w-full lg:max-w-[680px] bg-white rounded-[1.25rem] py-2 px-4 md:py-2 md:px-6 lg:px-8 flex items-center justify-center flex-col">
          <Spinner size="lg" color="blue" />
        </div>
      ) : (
        ticketsData?.tickets && (
          <Slider {...sliderSettings}>
            <div className="flex mx-0 flex-col mt-6 w-[396px!important] md:w-[700px!important] lg:w-[900px!important] border border-solid border-[#C5D5F8] rounded-lg">
              <table className="flex justify-between lg:flex lg:flex-col overflow-y-scroll max-h-[378px]">
                <thead className="border-b border-b-[#C5D5F8] w-full">
                  <tr className="flex lg:px-[1rem] flex-col lg:flex lg:flex-row border-b border-b-[#C5D5F8] lg:pl-0 lg:justify-between w-full">
                    <th
                      className={`py-2 pl-4 text-left text-[#667185] ${groteskTextMedium.className}`}
                    >
                      Vehicle Reg No.
                    </th>
                    <th
                      className={`py-2 pl-4 text-left text-[#667185] ${groteskTextMedium.className}`}
                    >
                      Issuing Authority
                    </th>
                    <th
                      className={`py-2 pl-4 text-left text-[#667185] ${groteskTextMedium.className}`}
                    >
                      Date Issued
                    </th>
                    <th
                      className={`py-2 pl-4 text-left text-[#667185] ${groteskTextMedium.className}`}
                    >
                      Due Date
                    </th>
                    <th
                      className={`py-2 pl-4 text-left text-[#667185] ${groteskTextMedium.className}`}
                    >
                      Fine
                    </th>
                    <th
                      className={`py-2 pl-4 text-left text-[#667185] ${groteskTextMedium.className}`}
                    >
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody className="w-full  lg:w-full lg:bg-[#F9FAFB]  px-[1rem] lg:p-0">
                  {(isSmallScreen ? currentItems : ticketsData.tickets).map(
                    (invoice, index) => (
                      <ContraventionRow
                        key={index}
                        invoice={invoice}
                        handleRowClick={handleRowClick}
                        selectedInvoice={selectedInvoice}
                      />
                    )
                  )}
                </tbody>
              </table>

              {/* Pagination Controls for Small Screens */}
              {isSmallScreen && (
                <div className="flex justify-between mt-4  px-4">
                  <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className={`flex items-center gap-1 px-3 py-1 rounded border border-[#D0D5DD] text-sm text-[#1C1B1B] ${groteskTextMedium.className} disabled:opacity-50`}
                  >
                    <ChevronLeft size={20} />
                    Previous
                  </button>
                  <div className="flex items-center space-x-2">
                    {totalPages <= 3 ? (
                      Array.from({ length: totalPages }).map((_, index) => (
                        <span
                          key={index}
                          className={`w-[8px] h-[8px] rounded-full ${
                            currentPage === index + 1
                              ? "bg-gray-500"
                              : "bg-gray-200"
                          }`}
                        ></span>
                      ))
                    ) : (
                      <>
                        {/* First dot */}
                        <span
                          className={`w-[8px] h-[8px] rounded-full ${
                            currentPage === 1 ? "bg-gray-500" : "bg-gray-200"
                          }`}
                        ></span>

                        {/* Middle dot */}
                        <span
                          className={`w-[8px] h-[8px] rounded-full ${
                            currentPage > 1 && currentPage < totalPages
                              ? "bg-gray-500"
                              : "bg-gray-200"
                          }`}
                        ></span>

                        {/* Last dot */}
                        <span
                          className={`w-[8px] h-[8px] rounded-full ${
                            currentPage === totalPages
                              ? "bg-gray-500"
                              : "bg-gray-200"
                          }`}
                        ></span>
                      </>
                    )}
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
        )
      )}

      {/* Detailed Breakdown */}
      {selectedInvoice && (
        <div
          className={`flex flex-col mt-8 ${
            isSmallScreen ? "w-full" : "hidden lg:flex lg:w-11/12 mx-auto"
          }`}
        >
          <h1
            className={`text-2xl text-[#000000] ${groteskTextMedium.className} text-center`}
          >
            Tickets Detailed Breakdown
          </h1>

          {/* Ticket Details */}
          <div className="flex flex-col justify-between lg:flex lg:flex-col">
            <section className="mt-8 mx-auto">
              <h1
                className={`text-xl text-[#000000] ${groteskTextMedium.className} mb-4`}
              >
                Ticket Details
              </h1>
              <div className="space-y-4">
                <div className="flex flex-col gap-[10px]">
                  <DetailedBreakdownItem
                    label="Ticket Type"
                    value={selectedInvoice.details}
                  />
                  <DetailedBreakdownItem
                    label="Issuing Authority"
                    value={selectedInvoice.issuing_authority}
                  />
                  <DetailedBreakdownItem
                    label="Fine amount"
                    value={`£${selectedInvoice.amount}`}
                  />
                  <DetailedBreakdownItem
                    label="Date Issued"
                    value={selectedInvoice.issue_date}
                  />
                  <DetailedBreakdownItem
                    label="Due Date"
                    value={selectedInvoice.due_date}
                  />
                  <DetailedBreakdownItem
                    label="Violation Type Info"
                    value="Failure To Stop For School Bus Ticket"
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
                </div>
              </div>
            </section>

            {/* Photo Evidence */}
            <section className="mt-8 justify-center items-center flex flex-col">
              <h1
                className={`text-xl text-[#000000] ${groteskTextMedium.className} mb-4`}
              >
                Photo Evidence
              </h1>
              <div className="flex space-y-4">
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
