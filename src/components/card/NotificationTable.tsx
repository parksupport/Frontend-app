"use client";

import { groteskText, groteskTextMedium } from "@/app/fonts";
import LabelImportantSVG from "@/assets/svg/label_important.svg";
import useIsMobile from "@/hooks/useIsMobile";
import { useState } from "react";
import { AiOutlineExpand } from "react-icons/ai";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

interface NotificationProps {
  id: number;
  type: string;
  message: string;
  date: string;
  read?: boolean;
  checked?: boolean;
}

interface NotificationBoxProps {
  openNotificationsTable: () => void;
}
const NotificationsTable = ({
  openNotificationsTable,
}: NotificationBoxProps) => {
  const notificationsData: NotificationProps[] = [
    {
      id: 1,
      type: "Insurance",
      message: "Hooray! You've Joined the Unstoppable Family!",
      date: "26 Sep",
      read: true,
    },
    {
      id: 2,
      type: "Contravention",
      message: "Hooray! You've Joined the Unstoppable Family!",
      date: "26 Sep",
      read: true,
    },
    {
      id: 3,
      type: "Login",
      message: "Hooray! You've Joined the Unstoppable Family!",
      date: "26 Sep",
      read: true,
    },
    {
      id: 4,
      type: "Insurance",
      message: "Hooray! You've Joined the Unstoppable Family!",
      date: "26 Sep",
      read: false,
    },
    {
      id: 5,
      type: "Insurance",
      message: "Hooray! You've Joined the Unstoppable Family!",
      date: "26 Sep",
      read: true,
    },
    {
      id: 6,
      type: "Insurance",
      message: "Hooray! You've Joined the Unstoppable Family!",
      date: "26 Sep",
      read: false,
    },
    {
      id: 7,
      type: "Contravention",
      message: "Hooray! You've Joined the Unstoppable Family!",
      date: "26 Sep",
      read: true,
    },
    {
      id: 8,
      type: "Logout",
      message: "Hooray! You've Joined the Unstoppable Family!",
      date: "26 Sep",
      read: false,
    },
    {
      id: 9,
      type: "Insurance",
      message: "Hooray! You've Joined the Unstoppable Family!",
      date: "26 Sep",
      read: true,
    },
    {
      id: 10,
      type: "Insurance",
      message: "Hooray! You've Joined the Unstoppable Family!",
      date: "26 Sep",
      read: true,
    },
  ];

  const [notifications, setNotifications] = useState(notificationsData);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectAll, setSelectAll] = useState(false);
  const isMobile = useIsMobile();

  const itemsPerPage = 5;
  const totalNotifications = notifications.length;
  const totalPages = Math.ceil(totalNotifications / itemsPerPage);

  const currentNotifications = notifications.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      checked: !selectAll,
    }));
    setNotifications(updatedNotifications);
  };

  const handleCheckboxChange = (index) => {
    const updatedNotifications = [...notifications];
    updatedNotifications[index].checked = !updatedNotifications[index].checked;
    setNotifications(updatedNotifications);
  };

  return isMobile ? (
    // <div className="md:hidden bg-white flex flex-col px-2  py-2 rounded-[20px] border border-gray-200 ">
    <div className="bg-white px-1 py-2 md:p-4 rounded-[16px] shadow-md max-w-[396px] sm:max-w-md w-full">
      <div className="flex justify-between pt-[4px]">
        <h2 className={`text-[24px] ${groteskTextMedium.className}`}>
          Notifications
        </h2>
        <div className="flex items-center">
          <div className="flex items-center px-6">
            <input
              type="checkbox"
              className="form-checkbox w-4 h-4"
              onChange={handleSelectAll}
              checked={selectAll}
            />
          </div>
          <AiOutlineExpand size={24} onClick={() => console.log("expand")} />
        </div>
      </div>
      <div className="mt-4">
        {currentNotifications.map((notification) => (
          <div
            key={notification.id}
            className="py-1  rounded-lg flex items-center "
          >
            <div
              className={`w-[40px] h-[40px] bg-[#D9D9D9] rounded-full flex items-center justify-center text-[32px] font-bold text-gray-700 ${groteskText.className}`}
            >
              {notification.type.charAt(0)}
            </div>
            <div
              className={` ${
                notification.read ? "text-gray-400" : "text-gray-800"
              }`}
            >
              <div className="flex items-center space-x-1">
                <div>
                  {/* <label_important color="#D2B48C" className="text-5xl" /> */}
                  <LabelImportantSVG className="text-5xl" />
                </div>
                <p
                  className={`text-[16px] font-semibold  ${groteskText.className}`}
                >
                  {notification.type}
                </p>
              </div>
              <p className={`text-[16px]   ${groteskTextMedium.className}`}>
                {notification.message}
              </p>
            </div>
            <div className="flex flex-col items-center ">
              <span
                className={`text-xs text-gray-500 ${
                  groteskTextMedium.className
                }  ${notification.read ? "text-gray-400" : "text-gray-800"} `}
              >
                {notification.date}
              </span>
              <input
                type="checkbox"
                className="form-checkbox w-4 h-4"
                checked={notification.checked || false}
                onChange={() => handleCheckboxChange(notification.id)}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex px-2 justify-between items-center mt-4">
        <button
          onClick={handlePrevious}
          className="w-[97px] h-[28px] rounded-[0.25rem] border border-[#D0D5DD] text-[1rem] text-[#1C1B1B]"
        >
          &lt; Previous
        </button>
        <div className="flex space-x-1">
          {Array.from({ length: totalPages }, (_, index) => (
            <span
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentPage ? "bg-blue-500" : "bg-gray-300"
              }`}
            ></span>
          ))}
        </div>
        <button
          onClick={handleNext}
          className="w-[74px] h-[28px] rounded-[0.25rem] border border-[#D0D5DD] text-[1rem] text-[#1C1B1B]"
        >
          Next &gt;
        </button>
      </div>
    </div>
  ) : (
    <div className="hidden md:block  bg-white p-4 rounded-[20px] border border-gray-200 w-full">
      <div className="flex justify-between py-[12px]">
        <h2 className="text-2xl font-semibold">Notifications</h2>
        <AiOutlineExpand size={24} onClick={openNotificationsTable} />
      </div>
      <div className="rounded-[12px] border border-gray-200 overflow-hidden w-full">
        <div className="bg-white px-2 flex items-center justify-between bg-gray-100 w-full">
          <div className="flex items-center px-2 py-3">
            <input
              type="checkbox"
              className="form-checkbox"
              onChange={handleSelectAll}
              checked={selectAll}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <span className="text-sm text-gray-500">
              {`${currentPage * itemsPerPage + 1} - ${Math.min(
                (currentPage + 1) * itemsPerPage,
                totalNotifications
              )} of ${totalNotifications}`}
            </span>
            <div className="flex gap-5">
              <GoChevronLeft
                size={20}
                className={`cursor-pointer ${
                  currentPage === 0
                    ? "text-gray-400"
                    : "text-gray-900 hover:text-black"
                }`}
                onClick={handlePrevious}
              />
              <GoChevronRight
                size={20}
                className={`cursor-pointer ${
                  currentPage === totalPages - 1
                    ? "text-gray-400"
                    : "text-gray-900 hover:text-black"
                }`}
                onClick={handleNext}
              />
            </div>
          </div>
        </div>
        <table className="min-w-full w-full text-left ">
          <tbody>
            {currentNotifications.map((notification, index) => (
              <tr
                key={index}
                className={`border-t border-gray-300 cursor-pointer ${
                  notification.read ? "text-gray-400" : "text-black"
                }`}
              >
                <td className="pl-4 py-2">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    onChange={() => handleCheckboxChange(notification.id)}
                    checked={notification.checked || false}
                  />
                </td>
                <td className="px-2 py-2 flex items-center">
                  <div className=" px-2">
                    <LabelImportantSVG className="text-5xl" />
                  </div>

                  <span>{notification.type}</span>
                </td>
                <td className="px-4 py-2 w-[60%] ">{notification.message}</td>
                <td className="px-4 py-2 text-right">{notification.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NotificationsTable;
