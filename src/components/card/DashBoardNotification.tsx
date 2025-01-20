"use client";

import React, { useState } from "react";

import { groteskTextMedium } from "@/app/fonts";
import { MoveDiagonal, Plus } from "lucide-react";
import useIsMobile from "@/hooks/useIsMobile";
import {
  DesktopViewNotification,
  MobileViewNotification,
} from "../NotificationTable";
import { useFetchNotifications } from "@/hooks/queries/notifications";
import useNotifications from "@/hooks/useNotification";
import Image from "next/image";
import { Button } from "@chakra-ui/react";

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

  function getNotificationMessage({
    isLoading,
    isError,
    error,
  }: {
    isLoading: boolean;
    isError: boolean;
    error?: any;
  }): string {
    if (isLoading) {
      return "Loading notifications...";
    }
    if (isError) {
      return `Error loading notifications: ${String(error)}`;
    }
    return null;
  }

  return notificationsData?.length === 0 ? (
    <div className="max-w-[396px] min-h-[340px] w-full lg:max-w-[680px] bg-white rounded-[1.25rem] py-2 px-4 md:py-2 md:px-6 lg:px-8 flex items-center justify-center flex-col">
      <div className="flex flex-col items-center justify-center">
        <div className={`${groteskTextMedium.className} text-[32px]`}>
          No Notification Yet
        </div>
        <Image
          src={require(`@/assets/images/notification_emptyState.png`)}
          alt=""
          sizes="width: 200px"
        />
      </div>
    </div>
  ) : isMobile ? (
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
      notificationStateMessage={getNotificationMessage({
        isLoading,
        isError,
        error,
      })}
    />
  ) : (
    <div className="hidden md:block bg-white p-4 rounded-[20px] border border-gray-200 w-full">
      <div className="flex justify-between py-[12px]">
        <h2
          className={` ${groteskTextMedium.className} text-[32px] leading-none text-black `}
        >
          Notifications
        </h2>
        <div className="p-1 cursor-pointer" onClick={openNotificationsTable}>
          <MoveDiagonal size={24} />
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
        notificationStateMessage={getNotificationMessage({
          isLoading,
          isError,
          error,
        })}
      />
    </div>
  );
};

export default DashboardNotifications;
