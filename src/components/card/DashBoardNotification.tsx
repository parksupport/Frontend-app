"use client";

import React, { useState } from "react";

import { groteskTextMedium } from "@/app/fonts";
import { MoveDiagonal } from "lucide-react";
import useIsMobile from "@/hooks/useIsMobile";
import {
  DesktopViewNotification,
  MobileViewNotification,
} from "../NotificationTable";
import { useFetchNotifications } from "@/hooks/queries/notifications";
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
  const {
    notificationsData = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useFetchNotifications();
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
  } = useNotifications(notificationsData, 7);

  const isMobile = useIsMobile();

  if (isLoading) {
    return <div>Loading notifications...</div>;
  }

  if (isError) {
    return (
      <div className="text-red-600">
        Error loading notifications: {String(error)}
      </div>
    );
  }

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
        textMaxLenght={40}
        cardNotificationClick={openNotificationsTable}
      />
    </div>
  );
};

export default DashboardNotifications;
