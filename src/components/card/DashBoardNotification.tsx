"use client";

import React, { useState } from "react";

import { groteskTextMedium } from "@/app/fonts";
import { MoveDiagonal } from "lucide-react";
import useIsMobile from "@/hooks/useIsMobile";
import {
  DesktopViewNotification,
  MobileViewNotification,
} from "../NotificationTable";
import useNotifications from "@/hooks/useNotification";

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

  const {
    currentNotifications,
    currentPage,
    totalPages,
    isAllSelected,
    handleSelectAll,
    handleCheckboxChange,
    goToNextPage,
    goToPreviousPage,
    setCurrentPage,
    itemsPerPage,
    totalNotifications,
  } = useNotifications(notificationsData, 5);

  const isMobile = useIsMobile();

  return isMobile ? (
    <MobileViewNotification
      openNotificationsDrawer={openNotificationsTable}
      isDrawer={isDrawer}
      handleSelectAll={handleSelectAll}
      selectAll={isAllSelected}
      handleCheckboxChange={handleCheckboxChange}
      currentNotifications={currentNotifications}
      totalPages={totalPages}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      handleNext={goToNextPage}
      handlePrevious={goToPreviousPage}
      cardNotificationClick={openNotificationsTable}
    />
  ) : (
    <div className="hidden md:block bg-white p-4 rounded-[20px] border border-gray-200 w-full">
      <div className="flex justify-between py-[12px]">
        <h2
          className={` ${groteskTextMedium.className} text-[32px] leading-none text-black `}
        >
          Notifications
        </h2>
        <div className="p-1 cursor-pointer " onClick={openNotificationsTable}>
          <MoveDiagonal size={24} className=" " />
        </div>
      </div>
      <DesktopViewNotification
        isDrawer={isDrawer}
        handleSelectAll={handleSelectAll}
        selectAll={isAllSelected}
        currentNotifications={currentNotifications}
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        handleNext={goToNextPage}
        handlePrevious={goToPreviousPage}
        itemsPerPage={itemsPerPage}
        totalNotifications={totalNotifications}
        textMaxLenght={48}
        cardNotificationClick={openNotificationsTable}
      />
    </div>
  );
};

export default DashboardNotifications;
