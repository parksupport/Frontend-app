import { useState } from "react";
import {
  DesktopViewNotification,
  MobileViewNotification,
} from "../NotificationTable";
import DrawerHeader from "./DrawerHeader";
import useIsMobile from "@/hooks/useIsMobile";
import { groteskText, groteskTextMedium } from "@/app/fonts";
import useNotifications from "@/hooks/useNotification";
import { FiTrash2 } from "react-icons/fi";
import { useFetchNotifications } from "@/hooks/queries/notifications";

type NotificationProps = {
  id: number;
  type: string;
  message: string;
  date: string;
  read: boolean;
  details: string;
  checked?: boolean;
};

const NotificationsTableDrawer = ({ back }) => {
  const {
    data: notificationsData = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useFetchNotifications();

  const isMobile = useIsMobile();

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
    handleNotificationClick,
    handleCheckedAll,
    selectedNotification,
    selectedNotificationsList,
    updateSelectedNotifications,
  } = useNotifications(notificationsData, 5);

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

  return (
    <>
      <DrawerHeader
        toggleDrawer={back}
        title="Notifications"
        subTitle="Stay updated with your latest contraventions and important alerts."
      />

    
      <div className="px-4 md:px-2 md:w-[900px] md:mx-auto flex justify-between items-center mt-8 ">
        {/* Add the FiTrash2 icon only when selectedNotification is true */}
        {selectedNotificationsList.length > 0 && (
          <FiTrash2 className="ml-2 md:ml-0 cursor-pointer" size={20} color="red"  />
        )}

        {/* Use flex-grow or margins to push "Mark as read" to the right */}
        <div
          className={`ml-auto ${groteskTextMedium.className} text-end text-[18px] text-[#4169E1] cursor-pointer`}
          onClick={handleSelectAll}
        >
          Mark as read
        </div>
      </div>
      <div className="flex flex-col items-center">

      {isMobile ? (
        <>
          <div className="border rounded-[20px] border-2">
            <MobileViewNotification
              hasCheckbox
              isDrawer={true}
              handleSelectAll={handleCheckedAll}
              selectAll={isAllSelected}
              currentNotifications={currentNotifications}
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              handleNext={goToNextPage}
              handlePrevious={goToPreviousPage}
              onNotificationClick={handleNotificationClick}
              updateSelectedNotifications={updateSelectedNotifications}
              selectedNotificationsList={selectedNotificationsList}
            />
          </div>
        </>
      ) : (
        <div className="w-[900px] mx-auto flex items-center">
          <DesktopViewNotification
            isDrawer={true}
            handleSelectAll={handleCheckedAll}
            selectAll={isAllSelected}
            currentNotifications={currentNotifications}
            totalPages={totalPages}
            currentPage={currentPage}
            handleNext={goToNextPage}
            handlePrevious={goToPreviousPage}
            itemsPerPage={itemsPerPage}
            totalNotifications={totalNotifications}
            onNotificationClick={handleNotificationClick}
            textMaxLenght={60}
            updateSelectedNotifications={updateSelectedNotifications}
            selectedNotificationsList={selectedNotificationsList}
            hasCheckbox
          />
        </div>
      )}

      {/* Display ReadNotification below the notification list */}
      {selectedNotification && (
        <ReadNotification selectedNotification={selectedNotification} />
      )}
        </div>
    </>
  );
};

export default NotificationsTableDrawer;

const ReadNotification = ({ selectedNotification }) => {
  return (
    <div className="flex items-center  md:w-[900px] mx-auto">
      {selectedNotification && (
        <div className="mt-4 p-4 border-t border-gray-300">
          <h3
            className={` ${groteskText.className} text-black md:text-[28px] font-semibold`}
          >
            {selectedNotification.type} Details
          </h3>
          <h5 className={` ${groteskText.className} text-black text-sm md:text-[16px]`}>
            {" "}
            {selectedNotification.time}
          </h5>
          <p className={` text-black md:text-[18px] ${groteskText.className} mt-2`}>
            {selectedNotification.details}
          </p>
        </div>
      )}
    </div>
  );
};
