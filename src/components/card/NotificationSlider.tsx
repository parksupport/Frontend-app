import { groteskText, groteskTextMedium } from "@/app/fonts";
import React, { useState } from "react";
import { AiOutlineExpand } from "react-icons/ai";

const notifications = [
  {
    id: 1,
    type: "Contravention Type",
    message: "Hooray! You've Joined the Unstoppable Family!",
    date: "2 Nov",
  },
  {
    id: 2,
    type: "Contravention Type",
    message: "Hooray! You've Joined the Unstoppable Family!",
    date: "2 Nov",
  },
  {
    id: 3,
    type: "Contravention Type",
    message: "Hooray! You've Joined the Unstoppable Family!",
    date: "2 Nov",
  },
  {
    id: 4,
    type: "Contravention Type",
    message: "Hooray! You've Joined the Unstoppable Family!",
    date: "2 Nov",
  },
  {
    id: 5,
    type: "Contravention Type",
    message: "Hooray! You've Joined the Unstoppable Family!",
    date: "2 Nov",
  },
  {
    id: 6,
    type: "Contravention Type",
    message: "Hooray! You've Joined the Unstoppable Family!",
    date: "2 Nov",
  },
  {
    id: 7,
    type: "Contravention Type",
    message: "Hooray! You've Joined the Unstoppable Family!",
    date: "2 Nov",
  },
  {
    id: 8,
    type: "Contravention Type",
    message: "Hooray! You've Joined the Unstoppable Family!",
    date: "2 Nov",
  },
];

const PAGE_SIZE = 4;

export default function NotificationSlider() {
  const [currentPage, setCurrentPage] = useState(0);
  const pageCount = Math.ceil(notifications.length / PAGE_SIZE);

  const handleNext = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % pageCount);
  };

  const handlePrevious = () => {
    setCurrentPage((prevPage) =>
      prevPage === 0 ? pageCount - 1 : prevPage - 1
    );
  };

  // Slice notifications to show only the ones for the current page
  const currentNotifications = notifications.slice(
    currentPage * PAGE_SIZE,
    (currentPage + 1) * PAGE_SIZE
  );

  return (
    <div className=" flex flex-col bg-green-100  p-4 rounded-[20px] border border-gray-200 w-full">
      {/* work on this */}
      <div className="flex justify-between py-[12px]">

      <h2 className={`text-[24px]  ${groteskTextMedium.className}`}>Notifications</h2>
      <div className="flex items-center">
      <div className="flex items-center px-6">
            <input
              type="checkbox"
              className="form-checkbox  w-4 h-4"
              onChange={() => console.log("checked")}
              // checked={()=> console.log("checked")}
            />
          </div>
      <AiOutlineExpand size={24} onClick={() => console.log("expand")} />

      </div>
      </div>
      {/* <div className="mt-4"> */}
        {/* <div className=""> */}
          {currentNotifications.map((notification) => (
            <div
              key={notification.id}
              className="py-2 rounded-lg flex items-center space-x-1"
            >
              <div className={`w-[40px] h-[40px] bg-[#D9D9D9] rounded-full flex items-center justify-center text-[32px] font-bold text-gray-700 ${groteskText.className}`}>
                C
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-yellow-400 rounded-full mr-2"></div>
                  <p className={`text-[16px] font-semibold text-gray-800 ${groteskText.className}`}>
                    {notification.type}
                  </p>
                </div>
                <p className={` text-[16px]  text-gray-500 ${groteskTextMedium.className}`}>
                  {notification.message}
                </p>
              </div>
              <div className="flex flex-col space-y-2">
                <span className={`text-xs text-gray-500 ${groteskTextMedium.className}`}>
                  {notification.date}
                </span>
                <input
              type="checkbox"
              className="form-checkbox w-4 h-4"
              // onChange={handleSelectAll}
              // checked={selectAll}
            />
              </div>
            </div>
          ))}
        {/* </div> */}
      {/* </div> */}
        <div  onClick={handlePrevious} className="flex justify-between items-center mt-4">
  
            <button className=" w-[97px] h-[28px] rounded-[0.25rem] border border-[#D0D5DD] text-[1rem] text-[#1C1B1B]">
            &lt; Previous
          </button>
          <div className="flex space-x-1">
            {Array.from({ length: pageCount }, (_, index) => (
              <span
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentPage ? "bg-blue-500" : "bg-gray-300"
                }`}
              ></span>
            ))}
          </div>
     
            <button  onClick={handleNext} className="w-[74px] h-[28px] rounded-[0.25rem] border border-[#D0D5DD] text-[1rem] text-[#1C1B1B]">
            Next &gt;
          </button>
        </div>
    </div>
  );
}
