"use client";


import { groteskTextMedium } from "@/app/fonts";
import { useFetchNotifications } from "@/hooks/queries/notifications";
import useIsMobile from "@/hooks/useIsMobile";
import useNotifications from "@/hooks/useNotification";
import { Spinner } from "@chakra-ui/react";
import { MoveDiagonal } from "lucide-react";
import Image from "next/image";
import {
  DesktopViewNotification,
  MobileViewNotification,
} from "../NotificationTable";

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
  } = useFetchNotifications();
  const {
    currentNotifications,
    currentPage,
    totalPages,
    isAllSelected,
    handleSelectAll,
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

  return (
    <>
      {isLoading ? (
        <div className="max-w-[396px] min-h-[340px] w-full lg:max-w-[680px] bg-white rounded-[1.25rem] py-2 px-4 md:py-2 md:px-6 lg:px-8 flex items-center justify-center flex-col">
          <Spinner size="lg" color="blue" />
        </div>
      ) : notificationsData?.length === 0 ? (
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
          currentNotifications={currentNotifications}
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          handleNext={goToNextPage}
          handlePrevious={goToPreviousPage}
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
              className={`${groteskTextMedium.className} text-[32px] leading-none text-black`}
            >
              Notifications
            </h2>
            <div
              className="p-1 cursor-pointer"
              onClick={openNotificationsTable}
            >
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
            openNotificationsTable={openNotificationsTable}
            notificationStateMessage={getNotificationMessage({
              isLoading,
              isError,
              error,
            })}
          />
        </div>
      )}
    </>
  );
};
export default DashboardNotifications;
