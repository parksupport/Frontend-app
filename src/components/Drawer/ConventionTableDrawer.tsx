import React, { useEffect, useState } from 'react'
import DrawerHeader from './DrawerHeader'
import { groteskText, groteskTextMedium } from '@/app/fonts'
import itemDetails from "@/data/data.json";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import LineHeight from '@/assets/svg/LineHelight.svg'
import ContraImage from '@/assets/images/contraventioImage.jpg'
import Image from 'next/image';
interface ConventionDrawer {
   
    toggleDrawer: () => void;
    handleRowClick: () => void;
}

const ConventionTableDrawer: React.FC<ConventionDrawer>  = ({ toggleDrawer,  }) => {
  const itemsPerPage = 1; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);



  // Calculate the total number of pages
  const totalPages = Math.ceil(itemDetails.contravention.length / itemsPerPage);

  // Function to handle going to the next page
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

  // Function to handle going to the next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to handle going to the previous page
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleRowClick =(invoice: { ticket: string; reg_num: string; issuing_auth: string; fine_amount: string; status: string; date: string; })=>{
    setSelectedInvoice(invoice)
    console.log('clicked')
  }

  // Slice the data to get the items for the current page
  const currentItems = itemDetails.contravention.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <DrawerHeader
      
        toggleDrawer={toggleDrawer}
        title="Contravention Summary"
        subTitle="Keep an eye on any active contraventions. You can pay fines or file an appeal directly from here."
      />
<div className="flex mx-0 flex-col mt-[2rem] w-full border border-solid border-[#C5D5F8] rounded-[12px]  lg:w-[1021px] lg:mx-[20px]">
<table className="flex items-center justify-between lg:flex lg:flex-col w-full">
          <thead className="border-b border-b-[#C5D5F8] w-full">
            <tr className="flex pl-[1rem] flex-col lg:flex lg:flex-row border-b border-b-[#C5D5F8] lg:pl-0 lg:justify-between w-full">
              <th className={`text-[#667185] self-start lg:px-[17px] py-[0.75rem] lg:text-left groteskText`}>
                Contravention Type
              </th>
              <th className={`text-[#667185] self-start px-[4px] py-[0.75rem] groteskText`}>
                Date Issued
              </th>
              <th className={`text-[#667185] self-start px-[4px] py-[0.75rem] groteskText`}>
                Issuing Authority
              </th>
              <th className={`text-[#667185] self-start px-[4px] py-[0.75rem] groteskText`}>
                Fine Amount
              </th>
              <th className={`text-[#667185] self-start px-[4px] py-[0.75rem] groteskText`}>
                Due Date
              </th>
              <th className={`text-[#667185] self-start py-[0.75rem] groteskText lg:pr-[1rem]`}>
                Status
              </th>
            </tr>
          </thead>
          <tbody className="w-full lg:w-full lg:bg-[#F9FAFB]">
            {(isSmallScreen ? currentItems : itemDetails.contravention).map((invoice) => (
               <tr key={invoice.ticket} className="flex flex-col px-[1rem] lg:flex lg:flex-row lg:border-b-[#D0D5DD] lg:border cursor-pointer hover:bg-[#FFFFFF]"
               onClick={() => handleRowClick(invoice)}
               >
               <td
                 className={`py-[0.75rem] self-end text-[#212121] pl-[17px] lg:pl-0 cursor-pointer   ${groteskText.className}`}
               >
                 {invoice.ticket}
               </td>
               <td
                 className={`text-[#212121] self-end text-center py-[0.75rem] lg:pl-[8rem]  ${groteskText.className}`}
               >
                 {invoice.reg_num}
               </td>
               <td
                 className={`text-[#212121] self-end text-center py-[0.75rem]  lg:pl-[6rem]  ${groteskText.className}`}
               >
                 {invoice.issuing_auth}
               </td>
               <td
                 className={`text-[#212121] self-end text-center py-[0.75rem] lg:pl-[7.8rem]   ${groteskText.className}`}
               >
                 {invoice.fine_amount}
               </td>
               <td
                 className={`text-[#212121] self-end text-center py-[0.75rem] lg:pl-[8.8rem]   ${groteskText.className}`}
               >
                 {invoice.date}
               </td>
               <span className="bg-[#B5E3C4] self-end ml-auto lg:mr-[3px] rounded-[22px]   my-[0.75rem] flex justify-center w-[44px] h-[22px] ">
                 <td
                   className={`text-center text-[#099137] text-[13px]    ${groteskText.className}`}
                 >
                   {invoice.status}
                 </td>
               </span>
             </tr>
            ))}
          </tbody>
        </table>
        {isSmallScreen  && (
          <div className="flex justify-between mt-4 px-[1rem] lg:hidden">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`w-[97px] pt-1 rounded-[0.25rem] border border-[#D0D5DD] text-[1rem] text-[#1C1B1B] ${groteskTextMedium.className}`}
            >
              <ChevronLeft size={22} style={{ display: 'inline-flex', marginTop: '-2px' }} />
              Previous
            </button>
            <div className="flex items-center space-x-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <span
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    currentPage === index + 1 ? 'bg-blue-500' : 'bg-gray-400'
                  }`}
                ></span>
              ))}
            </div>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`w-[74px] pt-1 rounded-[0.25rem] border border-[#D0D5DD] text-[1rem] text-[#1C1B1B] ${groteskTextMedium.className}`}
            >
              Next
              <ChevronRight size={22} style={{ display: 'inline-flex' }} />
            </button>
          </div>
        )}
      </div>
      {selectedInvoice && (
        <div className={`flex flex-col ${isSmallScreen ? 'w-full mt-[32px]' : 'hidden lg:flex lg:w-[1021px] mt-[44px] mx-[20px]'}`}>
    <h1 className={`text-[24px] self-center text-[#000000] lg:text-[32px] ${groteskTextMedium.className}`}>Contravention Detailed Breakdown</h1>
   
      <section className='border-[#D0D5DD] border rounded-[1rem] w-full lg:h-auto items-center flex bg-[#F9FAFB] mt-[24px]'>
        <div className='h-auto  py-[1rem] px-[1rem] lg:flex lg:flex-row justify-between items-center w-full lg:py-[20px] lg:px-[25px]'>
  <div className='flex flex-row mb-[20px] lg:mb-0 lg:w-full'>
  <div className='flex flex-col w-full '>
            <h2 className={`text-[#98A2B3] text-[16px] ${groteskTextMedium.className} lg:text-[18px]`}>TICKET TYPE</h2>
            <p className={`text-[#000000] text-[23px] lg:text-[28px]  ${groteskText.className}`}>{selectedInvoice.ticket}</p>
          </div>
          <div className='hidden lg:flex'><LineHeight /></div>
    
          <div className='flex flex-col w-full items-end lg:items-center'>
            <h2  className={`text-[#98A2B3] text-[16px]  ${groteskTextMedium.className} lg:text-[18px]`}>ISSUING AUTHORITY</h2>
            <p className={`text-[#000000] text-[23px] lg:text-[28px]  ${groteskText.className}`}>{selectedInvoice.issuing_auth}</p>
          </div>
          <div className='hidden lg:flex'><LineHeight /></div>
  </div>

         <div className='flex flex-row gap-[30px] lg:gap-0 lg:justify-between lg:w-full'>
         <div className='flex flex-col w-full lg:content-center lg:flex-wrap'>
            <h2  className={`text-[#98A2B3] text-[16px]  ${groteskTextMedium.className} lg:text-[18px]`}>FINE AMOUNT</h2>
           <p className={`text-[#000000] text-[23px] lg:text-[28px]  ${groteskText.className}`}> {selectedInvoice.fine_amount}</p>
          </div>
          <div className='hidden lg:flex'><LineHeight /></div>
          <div className='flex flex-col w-full lg:content-center lg:flex-wrap'>
            <h2  className={`text-[#98A2B3]  text-[16px] ${groteskTextMedium.className} lg:text-[18px]`}>DATE ISSUED</h2>
           <p className={`text-[#000000] text-[23px] lg:text-[28px]  ${groteskText.className}`}> {selectedInvoice.status}</p>
          </div>
          <div className='hidden lg:flex'><LineHeight /></div>
          <div className='flex flex-col w-full self-end  lg:content-center lg:flex-wrap'>
            <h2  className={`text-[#98A2B3] text-[16px] ${groteskTextMedium.className} lg:text-[18px] `}>DUE DATE</h2>
           <p className={`text-[#000000] text-[23px] lg:text-[28px]  ${groteskText.className}`}> {selectedInvoice.date}</p>
          </div>
  
         </div>
        
        
        </div>
      </section>
  
  
  <div className='flex flex-col mt-[2rem] lg:flex lg:flex-row lg:gap-[22px] lg:mt-[28px]'>
  <section className='w-[545px]'>
  <h1 className={`text-[#000000] text-[24px] ${groteskTextMedium.className}`}>Ticket Details</h1>
  <div className='max-w-[396px] mt-[1rem] gap-[16px] flex flex-col lg:mt-0 lg:max-w-[545px]'>
  <div className=' flex flex-row border-b border-[#D0D5DD] w-full justify-between items-center mt-[24px]'>
  <h2 className={`text-[#667185] text-[16px] lg:text-[20px]  ${groteskText.className} `}>Violation Type Info</h2>
  <span className={`text-[#000000] text-[16px] lg:text-[18px]  ${groteskTextMedium.className}`}>Failure To Stop For School Bus Ticket</span>
  </div>
  
  <div className='flex flex-row border-b border-[#D0D5DD] w-full justify-between items-center'>
  <h2 className={`text-[#667185] text-[16px] lg:text-[20px]   ${groteskText.className}`}>Violation Type Info</h2>
  <span className={`text-[#000000] text-[16px] lg:text-[18px]  ${groteskTextMedium.className}`}>Failure To Stop For School Bus Ticket</span>
  </div>
  
  <div className='flex flex-row border-b border-[#D0D5DD] w-full justify-between items-center'>
  <h2 className={`text-[#667185] text-[16px] lg:text-[20px]   ${groteskText.className}`}>Violation code</h2>
  <span className={`text-[#000000] text-end text-[16px] lg:text-[18px]   ${groteskTextMedium.className}`}>V117 - Not stopping for a school bus with flashing lights</span>
  </div>
  
  <div className='flex flex-row border-b border-[#D0D5DD] w-full justify-between items-center'>
  <h2 className={`text-[#667185] text-[16px] lg:text-[20px]  ${groteskText.className}`}>Officer Name</h2>
  <span className={`text-[#000000] text-[16px] lg:text-[18px]   ${groteskTextMedium.className}`}>Officer Sarah Jones</span>
  </div>
  
  <div className='flex flex-row border-b border-[#D0D5DD] w-full justify-between items-center'>
  <h2 className={`text-[#667185] text-[16px] lg:text-[20px]  ${groteskText.className}`}>Traffic Situation</h2>
  <span className={`text-[#000000] text-[16px] lg:text-[18px]  ${groteskTextMedium.className}`}> School bus stopped with flashing red light</span>
  </div>
  
  <div className='flex flex-row border-b border-[#D0D5DD] w-full justify-between items-center'>
  <h2 className={`text-[#667185] text-[16px] lg:text-[20px]   ${groteskText.className}`}>Location</h2>
  <span className={`text-[#000000] text-[16px] lg:text-[18px]  ${groteskTextMedium.className}`}> River St. & Oak Rd.</span>
  </div>
  
  <div className='flex flex-row border-b border-[#D0D5DD] w-full justify-between items-center'>
  <h2 className={`text-[#667185] text-[16px] lg:text-[20px]   ${groteskText.className}`}>Violaton Date And Time</h2>
  <span className={`text-[#000000] text-[16px] lg:text-[18px] ${groteskTextMedium.className}`}>12th October 2024, 14:32.</span>
  </div>
  
  <div className='flex flex-row border-b border-[#D0D5DD] w-full justify-between items-center'>
  <h2 className={`text-[#667185] text-[16px] lg:text-[20px]  ${groteskText.className}`}>Fine Breakdown</h2>
  <span className={`text-[#000000]text-[16px] lg:text-[18px]  ${groteskTextMedium.className}`}>Base fine: $100</span>
  </div>
  </div>
  </section>
  <section className='mt-[32px] lg:mt-0'>
    <h1 className={`text-[#000000] text-[24px] ${groteskTextMedium.className}`}>Photo Evidence</h1>
    <div className='mt-[24px]'>
        <Image
         src={ContraImage.src} alt="des" />
         </div>
  </section>
  </div>
  </div>
     )} 
 

    </div>
  );
};

export default ConventionTableDrawer;



