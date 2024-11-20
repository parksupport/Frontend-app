"use client";

import React, { useState } from "react";

import { groteskTextMedium } from "@/app/fonts";
import { MoveDiagonal } from "lucide-react";
import useIsMobile from "@/hooks/useIsMobile";
import { DesktopViewNotification, MobileViewNotification } from "../NotificationTable";

interface NotificationProps {
  id: number;
  type: string;
  message: string;
  date: string;
  read: boolean;
  checked?: boolean;
}

const DashboardNotifications = ({ openNotificationsTable, isDrawer }) => {
  const notificationsData = [
    {
      id: 1,
      type: "Insurance",
      message:
        "Congratulations! You’re now a part of the Unstoppable Family. Start exploring your new benefits and coverage today.",
      date: "26 Sep",
      read: true,
    },
    {
      id: 2,
      type: "Contravention",
      message:
        "Your recent traffic violation has been logged. Please check your account for further details and actions.",
      date: "26 Sep",
      read: true,
    },
    {
      id: 3,
      type: "Login",
      message:
        "We noticed a login to your account from a new device. If this wasn’t you, secure your account immediately.",
      date: "26 Sep",
      read: true,
    },
    {
      id: 4,
      type: "Insurance",
      message:
        "Reminder: Your insurance policy renewal is due soon. Ensure your coverage stays uninterrupted by renewing now.",
      date: "26 Sep",
      read: false,
    },
    {
      id: 5,
      type: "Insurance",
      message:
        "Thank you for choosing Unstoppable Insurance! Explore our app to manage your policies with ease.",
      date: "26 Sep",
      read: true,
    },
    {
      id: 6,
      type: "Insurance",
      message:
        "We’re offering an exclusive discount on new policies! Don’t miss out—contact us to learn more.",
      date: "26 Sep",
      read: false,
    },
    {
      id: 7,
      type: "Contravention",
      message:
        "Your contravention appeal has been reviewed. Visit your account to see the outcome and next steps.",
      date: "26 Sep",
      read: true,
    },
    {
      id: 8,
      type: "Logout",
      message:
        "You’ve successfully logged out. Remember to log in again to access your account securely at any time.",
      date: "26 Sep",
      read: false,
    },
    {
      id: 9,
      type: "Insurance",
      message:
        "We’ve updated our terms and conditions for insurance coverage. Visit our site to review the latest changes.",
      date: "26 Sep",
      read: true,
    },
    {
      id: 10,
      type: "Insurance",
      message:
        "Your recent claim has been processed successfully. Check your email for confirmation and further details.",
      date: "26 Sep",
      read: true,
    },
  ];
  

  const [notifications, setNotifications] =
    useState<NotificationProps[]>(notificationsData);

  const [selectAll, setSelectAll] = useState(false);
  const isMobile = useIsMobile();
  const itemsPerPage = 5;

  const totalNotifications = notifications.length;
  const totalPages = Math.ceil(totalNotifications / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(0);

  const handleSelectAll = () => {
    setSelectAll((prevState) => !prevState);
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) => ({
        ...notification,
        checked: !selectAll,
      }))
    );
  };

  const handleCheckboxChange = (id: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id
          ? { ...notification, checked: !notification.checked }
          : notification
      )
    );
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const currentNotifications = notifications.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return isMobile ? (
    <MobileViewNotification
      openNotificationsDrawer={openNotificationsTable}
      isDrawer={isDrawer}
      handleSelectAll={handleSelectAll}
      selectAll={selectAll}
      handleCheckboxChange={handleCheckboxChange}
      currentNotifications={currentNotifications}
      totalPages={totalPages}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      handleNext={handleNext}
      handlePrevious={handlePrevious}
    />
  ) : (
    <div className="hidden md:block bg-white p-4 rounded-[20px] border border-gray-200 w-full">
      <div className="flex justify-between py-[12px]">
        <h2 className={` ${groteskTextMedium.className} text-[32px] leading-none text-black `}>
          Notifications
        </h2>
        <MoveDiagonal size={24} onClick={openNotificationsTable} className="cursor-pointer"/>
      </div>
      <DesktopViewNotification
        isDrawer={isDrawer}
        handleSelectAll={handleSelectAll}
        selectAll={selectAll}
        handleCheckboxChange={handleCheckboxChange}
        currentNotifications={currentNotifications}
        totalPages={totalPages}
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        itemsPerPage={itemsPerPage}
        totalNotifications={totalNotifications}
        textMaxLenght={48}
      />
    </div>
  )
};

export default DashboardNotifications;


















