"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { useState, useRef } from "react";
import { AiOutlineExpand } from "react-icons/ai";
import LabelImportantSVG from "@/assets/svg/label_important.svg";
import { groteskTextMedium, groteskText } from "@/app/fonts";
import useIsMobile from "@/hooks/useIsMobile";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import ReactTooltip from "react-tooltip";

interface NotificationProps {
  id: number;
  type: string;
  message: string;
  date: string;
  read: boolean;
  checked?: boolean;
  details: string; // Added for detailed message
}

const NotificationsTableDrawer = ({ openNotificationsTable }) => {
  const notificationsData = [
    {
      id: 1,
      type: "Insurance",
      message: "Your policy has been updated",
      date: "26 Sep",
      read: true,
      details: "Your insurance policy #12345 has been successfully updated.",
    },
    {
      id: 2,
      type: "Contravention",
      message: "Speeding violation recorded",
      date: "26 Sep",
      read: true,
      details: "You have a new speeding violation on Main St.",
    },
    // ... more notifications
  ];

  const [notifications, setNotifications] = useState<NotificationProps[]>(notificationsData);

  const [selectAll, setSelectAll] = useState(false);
  const isMobile = useIsMobile();

  const itemsPerPage = 5;
  const totalNotifications = notifications.length;
  const totalPages = Math.ceil(totalNotifications / itemsPerPage);

  const chunks = [];
  for (let i = 0; i < notifications.length; i += itemsPerPage) {
    chunks.push(notifications.slice(i, i + itemsPerPage));
  }

  const sliderRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      checked: !selectAll,
    }));
    setNotifications(updatedNotifications);
  };

  const handleCheckboxChange = (id) => {
    const updatedNotifications = notifications.map((notification) =>
      notification.id === id
        ? { ...notification, checked: !notification?.checked }
        : notification
    );
    setNotifications(updatedNotifications);
  };

  const [selectedNotification, setSelectedNotification] = useState<NotificationProps | null>(null);

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    // Optionally mark as read
    const updatedNotifications = notifications.map((n) =>
      n.id === notification.id ? { ...n, read: true } : n
    );
    setNotifications(updatedNotifications);
  };

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    ref: sliderRef,
    beforeChange: (current, next) => {
      setCurrentPage(next);
    },
    arrows: false,
  };

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

  const currentNotifications = notifications.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return isMobile ? (
    <div className="bg-white px-1 py-2 md:p-4 rounded-[16px] shadow-md max-w-[396px] sm:max-w-md w-full">
      {/* Header */}
      <div className="flex justify-between pt-[4px]">
        <h2 className={`text-[24px] ${groteskTextMedium.className}`}>Notifications</h2>
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
      {/* Slider */}
      <Slider {...settings}>
        {chunks.map((chunk, index) => (
          <div key={index} className="mt-4">
            {chunk.map((notification) => (
              <div
                key={notification.id}
                className={`py-1 rounded-lg flex items-center cursor-pointer ${
                  notification.read ? "bg-gray-100" : "bg-white"
                }`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div
                  className={`w-[40px] h-[40px] bg-[#D9D9D9] rounded-full flex items-center justify-center text-[32px] font-bold text-gray-700 ${groteskText.className}`}
                >
                  {notification.type.charAt(0)}
                </div>
                <div className="flex-1 px-2">
                  <div className="flex items-center space-x-1">
                    <LabelImportantSVG className="text-5xl" />
                    <p
                      className={`text-[16px] font-semibold ${groteskText.className} ${
                        notification.read ? "text-gray-400" : "text-gray-800"
                      }`}
                    >
                      {notification.type}
                    </p>
                  </div>
                  <p
                    className={`text-[16px] ${groteskTextMedium.className} ${
                      notification.read ? "text-gray-400" : "text-gray-800"
                    }`}
                  >
                    {notification.message}
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <span
                    className={`text-xs ${groteskTextMedium.className} ${
                      notification.read ? "text-gray-400" : "text-gray-800"
                    }`}
                  >
                    {notification.date}
                  </span>
                  <input
                    type="checkbox"
                    className="form-checkbox w-4 h-4"
                    checked={notification.checked || false}
                    onChange={() => handleCheckboxChange(notification.id)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </Slider>
      {/* Pagination */}
      <div className="flex px-2 justify-between items-center mt-4">
        <button
          onClick={handlePrevious}
          className={`w-[97px] h-[28px] rounded-[0.25rem] border text-[1rem] ${
            currentPage === 0
              ? "border-gray-300 text-gray-400 cursor-not-allowed"
              : "border-[#D0D5DD] text-[#1C1B1B]"
          }`}
          disabled={currentPage === 0}
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
          className={`w-[74px] h-[28px] rounded-[0.25rem] border text-[1rem] ${
            currentPage === totalPages - 1
              ? "border-gray-300 text-gray-400 cursor-not-allowed"
              : "border-[#D0D5DD] text-[#1C1B1B]"
          }`}
          disabled={currentPage === totalPages - 1}
        >
          Next &gt;
        </button>
      </div>
      {/* Inbox Section */}
      {selectedNotification && (
        <div className="mt-4 p-4 border-t border-gray-300">
          <h3 className={`text-lg font-semibold ${groteskTextMedium.className}`}>
            {selectedNotification.type} Details
          </h3>
          <p className={`mt-2 ${groteskText.className}`}>{selectedNotification.details}</p>
        </div>
      )}
    </div>
  ) : (
    <div className="bg-white p-4 rounded-[20px] border border-gray-200 w-full">
      {/* Header */}
      <div className="flex justify-between py-[12px]">
        <h2 className="text-2xl font-semibold">Notifications</h2>
        <AiOutlineExpand size={24} onClick={openNotificationsTable} />
      </div>
      {/* Table */}
      <div className="rounded-[12px] border border-gray-200 overflow-hidden w-full">
        <div className=" px-2 flex items-center justify-between bg-gray-100 w-full">
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
                  currentPage === 0 ? "text-gray-400" : "text-gray-900 hover:text-black"
                }`}
                onClick={handlePrevious}
              />
              <GoChevronRight
                size={20}
                className={`cursor-pointer ${
                  currentPage === totalPages - 1 ? "text-gray-400" : "text-gray-900 hover:text-black"
                }`}
                onClick={handleNext}
              />
            </div>
          </div>
        </div>
        <table className="min-w-full w-full text-left">
          <tbody>
            {currentNotifications.map((notification, index) => (
              <tr
                key={index}
                className={`border-t border-gray-300 cursor-pointer  ${
                  notification.read ? "text-gray-400" : "text-black"
                }`}
                onClick={() => handleNotificationClick(notification)}
              >
                <td className="pl-4 py-2">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={notification.checked || false}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleCheckboxChange(notification.id);
                    }}
                  />
                </td>
                <td className="px-2 py-2 flex items-center">
                  <div className="px-2">
                    <LabelImportantSVG className="text-5xl" />
                  </div>
                  <span>{notification.type}</span>
                </td>
                <td className="px-4 py-2 align-middle w-[60%]">{notification.message}</td>
                <td className="px-4 py-2 text-right align-middle whitespace-nowrap  ">{notification.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Inbox Section */}
      {selectedNotification && (
        <div className="mt-4 p-4 border-t border-gray-300">
          <h3 className="text-lg font-semibold">{selectedNotification.type} Details</h3>
          <p className="mt-2">{selectedNotification.details}</p>
        </div>
      )}
    </div>
  );
};

export default NotificationsTableDrawer;
