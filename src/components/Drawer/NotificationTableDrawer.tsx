import { groteskText, groteskTextMedium } from "@/app/fonts";
import { useFetchNotifications } from "@/hooks/queries/notifications";
import useIsMobile from "@/hooks/useIsMobile";
import useNotifications from "@/hooks/useNotification";
import { FiTrash2 } from "react-icons/fi";
import {
  DesktopViewNotification,
  MobileViewNotification,
} from "../NotificationTable";
import DrawerHeader from "./DrawerHeader";

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
  const { notificationsData, isLoading, isError, error, refetch } =
    useFetchNotifications();

  const isMobile = useIsMobile();

  const notificationPerPage = isMobile ? 5 : 6;

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
    handleSelectNotification,
    handleCheckedAll,
    selectedNotification,
    selectedNotificationsList,
    updateSelectedNotifications,
    handleDeleteNotification,
  } = useNotifications(notificationsData, notificationPerPage);

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
      <DrawerHeader
        toggleDrawer={back}
        title="Notifications"
        subTitle="Stay updated with your latest contraventions and important alerts."
      />

      <div className="px-4 md:px-2 md:w-[900px] md:mx-auto flex justify-between items-center mt-8 ">
        {/* Add the FiTrash2 icon only when selectedNotification is true */}
        {selectedNotificationsList.length > 0 && (
          <FiTrash2
            className="ml-2 md:ml-0 cursor-pointer"
            size={20}
            color="red"
            onClick={handleDeleteNotification}
          />
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
                selectedNotification={selectedNotification}
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
                handleSelectNotification={handleSelectNotification}
                updateSelectedNotifications={updateSelectedNotifications}
                selectedNotificationsList={selectedNotificationsList}
                notificationStateMessage={getNotificationMessage({
                  isLoading,
                  isError,
                  error,
                })}
              />
            </div>
          </>
        ) : (
          <div className="w-[900px] mx-auto flex items-center">
            <DesktopViewNotification
            selectedNotification={selectedNotification}
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
              handleSelectNotification={handleSelectNotification}
              textMaxLenght={60}
              updateSelectedNotifications={updateSelectedNotifications}
              selectedNotificationsList={selectedNotificationsList}
              hasCheckbox
              notificationStateMessage={getNotificationMessage({
                isLoading,
                isError,
                error,
              })}
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
  const recipientsString = selectedNotification?.recipients
    ? selectedNotification.recipients
        .replace(/'/g, '"') // Replace single quotes with double quotes
        .replace(/^\[|\]$/g, "") // Remove outer square brackets (if needed)
    : ""; // Fallback to an empty string if recipients is null or undefined

  const recipientsArray = recipientsString
    ? JSON.parse(`[${recipientsString}]`)
    : []; // Parse as JSON if string is valid
  const mappedRecipients = recipientsArray?.map((email) => email.trim());

  return (
    <div className="flex items-center  md:w-[900px] mx-auto">
      {selectedNotification && (
        <div className="mt-4 p-4 border-t border-gray-300">
          <h3
            className={` ${groteskText.className} text-black md:text-[28px] font-semibold`}
          >
            {selectedNotification.notification_type} Details
          </h3>
          <h5
            className={` ${groteskText.className} text-black text-sm md:text-[16px]`}
          >
            {" "}
            {selectedNotification.time}
          </h5>
          {mappedRecipients?.length > 0 && (
            <div className="border border-gray-300 rounded-lg p-2">
              <div className="flex flex-wrap gap-2">
                {mappedRecipients.map((email) => (
                  <div
                    key={email}
                    className="flex flex-row bg-gray-200 text-gray-800 text-[12px] items-center rounded-full px-4 space-x-2"
                  >
                    <span>{email}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <p
            className={` text-black md:text-[18px] ${groteskText.className} mt-2`}
          >
            {selectedNotification.message}
          </p>
        </div>
      )}
    </div>
  );
};
