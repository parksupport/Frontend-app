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
import { useGetNotifications } from "@/hooks/queries/notification";

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
  const { notificationsData } = useGetNotifications();
  // const notificationsData = [
  //   {
  //     id: 1,
  //     type: "Insurance",
  //     message:
  //       "Your insurance policy has been successfully updated with the latest changes.",
  //     date: "26 Sep",
  //     time: "10:30 AM",
  //     read: false,
  //     details:
  //       "Your insurance policy #12345 has been successfully updated. Please review the changes to ensure all information is correct and up to date. If you have any questions, contact your insurance provider.",
  //   },
  //   {
  //     id: 2,
  //     type: "Contravention",
  //     message:
  //       "A speeding violation was recorded in your name. Please take immediate action.",
  //     date: "26 Sep",
  //     time: "02:45 PM",
  //     read: false,
  //     details:
  //       "A speeding violation has been recorded at 123 Main St. on 25 Sep 2024. The violation is associated with your vehicle registration #ABC123. Please log into your account to view the details and take the necessary steps to resolve this matter.",
  //   },
  //   {
  //     id: 3,
  //     type: "Maintenance",
  //     message:
  //       "Upcoming maintenance scheduled for your vehicle. Please review the details.",
  //     date: "27 Sep",
  //     time: "09:15 AM",
  //     read: false,
  //     details:
  //       "Your vehicle has a scheduled maintenance appointment on 30 Sep 2024 at 10:00 AM. Please ensure the vehicle is delivered to the service center on time. Contact your service provider if you need to reschedule.",
  //   },
  //   {
  //     id: 4,
  //     type: "Payment",
  //     message:
  //       "Your payment for the service plan has been successfully processed.",
  //     date: "28 Sep",
  //     time: "04:00 PM",
  //     read: false,
  //     details:
  //       "We have received your payment for the monthly service plan. Payment reference #56789 has been processed for the amount of $150.00. Thank you for staying on track with your plan.",
  //   },
  //   {
  //     id: 5,
  //     type: "Recall",
  //     message:
  //       "Important safety recall issued for your vehicle. Immediate attention required.",
  //     date: "29 Sep",
  //     time: "08:00 AM",
  //     read: false,
  //     details:
  //       "A safety recall has been issued for your vehicle model XYZ123 due to potential issues with the braking system. Please contact your dealership immediately to schedule a free inspection and repair. This is a critical safety update.",
  //   },
  //   {
  //     id: 6,
  //     type: "Warranty",
  //     message:
  //       "Your vehicle warranty is about to expire. Renew now to avoid gaps in coverage.",
  //     date: "30 Sep",
  //     time: "11:30 AM",
  //     read: false,
  //     details:
  //       "Your vehicle's warranty coverage will expire on 15 Oct 2024. Renew your warranty now to ensure uninterrupted protection for repairs and maintenance. Contact our support team to discuss available options.",
  //   },
  //   {
  //     id: 7,
  //     type: "Reminder",
  //     message:
  //       "Friendly reminder to complete your annual vehicle inspection by the due date.",
  //     date: "01 Oct",
  //     time: "01:00 PM",
  //     read: false,
  //     details:
  //       "Your annual vehicle inspection is due by 10 Oct 2024. Failing to complete the inspection may result in penalties or restrictions. Schedule an appointment with your nearest inspection center today.",
  //   },
  //   {
  //     id: 8,
  //     type: "Insurance",
  //     message:
  //       "Your insurance premium payment is overdue. Please make payment immediately.",
  //     date: "02 Oct",
  //     time: "05:15 PM",
  //     read: false,
  //     details:
  //       "Your insurance premium payment, due on 30 Sep 2024, has not yet been received. Avoid policy cancellation by making the payment at your earliest convenience. Contact customer service if you need assistance.",
  //   },
  // ];

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
    handleDeleteNotification,
  } = useNotifications(notificationsData, 5);

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
            {selectedNotification.notification_type} Details
          </h3>
          <h5
            className={` ${groteskText.className} text-black text-sm md:text-[16px]`}
          >
            {" "}
            {selectedNotification.time}
          </h5>
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
