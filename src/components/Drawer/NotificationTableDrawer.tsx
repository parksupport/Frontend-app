import { useState } from "react";
import {
  DesktopViewNotification,
  MobileViewNotification,
} from "../NotificationTable";
import DrawerHeader from "./DrawerHeader";
import useIsMobile from "@/hooks/useIsMobile";
import { groteskText, groteskTextMedium } from "@/app/fonts";


type NotificationProps = {
  id: number;
  type: string;
  message: string;
  date: string;
  read: boolean;
  details: string;
  checked?: boolean; }

const NotificationsTableDrawer = ({ back }) => {
  const notificationsData = [
    {
      id: 1,
      type: "Insurance",
      message:
        "Your insurance policy has been successfully updated with the latest changes.",
      date: "26 Sep",
      read: false,
      details:
        "Your insurance policy #12345 has been successfully updated. Please review the changes to ensure all information is correct and up to date. If you have any questions, contact your insurance provider.",
    },
    {
      id: 2,
      type: "Contravention",
      message:
        "A speeding violation was recorded in your name. Please take immediate action.",
      date: "26 Sep",
      read: false,
      details:
        "A speeding violation has been recorded at 123 Main St. on 25 Sep 2024. The violation is associated with your vehicle registration #ABC123. Please log into your account to view the details and take the necessary steps to resolve this matter.",
    },
    {
      id: 3,
      type: "Maintenance",
      message:
        "Upcoming maintenance scheduled for your vehicle. Please review the details.",
      date: "27 Sep",
      read: false,
      details:
        "Your vehicle has a scheduled maintenance appointment on 30 Sep 2024 at 10:00 AM. Please ensure the vehicle is delivered to the service center on time. Contact your service provider if you need to reschedule.",
    },
    {
      id: 4,
      type: "Payment",
      message:
        "Your payment for the service plan has been successfully processed.",
      date: "28 Sep",
      read: false,
      details:
        "We have received your payment for the monthly service plan. Payment reference #56789 has been processed for the amount of $150.00. Thank you for staying on track with your plan.",
    },
    {
      id: 5,
      type: "Recall",
      message:
        "Important safety recall issued for your vehicle. Immediate attention required.",
      date: "29 Sep",
      read: false,
      details:
        "A safety recall has been issued for your vehicle model XYZ123 due to potential issues with the braking system. Please contact your dealership immediately to schedule a free inspection and repair. This is a critical safety update.",
    },
    {
      id: 6,
      type: "Warranty",
      message:
        "Your vehicle warranty is about to expire. Renew now to avoid gaps in coverage.",
      date: "30 Sep",
      read: false,
      details:
        "Your vehicle's warranty coverage will expire on 15 Oct 2024. Renew your warranty now to ensure uninterrupted protection for repairs and maintenance. Contact our support team to discuss available options.",
    },
    {
      id: 7,
      type: "Reminder",
      message:
        "Friendly reminder to complete your annual vehicle inspection by the due date.",
      date: "01 Oct",
      read: false,
      details:
        "Your annual vehicle inspection is due by 10 Oct 2024. Failing to complete the inspection may result in penalties or restrictions. Schedule an appointment with your nearest inspection center today.",
    },
    {
      id: 8,
      type: "Insurance",
      message:
        "Your insurance premium payment is overdue. Please make payment immediately.",
      date: "02 Oct",
      read: false,
      details:
        "Your insurance premium payment, due on 30 Sep 2024, has not yet been received. Avoid policy cancellation by making the payment at your earliest convenience. Contact customer service if you need assistance.",
    },
  ];

  const [notifications, setNotifications] = useState<NotificationProps[]>(notificationsData);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const isMobile = useIsMobile();

  const itemsPerPage = 5;
  const totalNotifications = notifications.length;
  const totalPages = Math.ceil(totalNotifications / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(0);

  const handleCheckedAll = () => {
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

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    const updatedNotifications = notifications.map((n) =>
      n.id === notification.id ? { ...n, read: true } : n
    );
    setNotifications(updatedNotifications);
  };

  const handleSelectAll = () => {
    const updatedNotifications = notifications.map((n) => ({
      ...n,
      read: true,
    }));
    setNotifications(updatedNotifications);
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

  return (
    <>
      <DrawerHeader
        toggleDrawer={back}
        title="Notifications"
        subTitle="Stay updated with your latest contraventions and important alerts."
      />

      <div
        className={` ${groteskTextMedium.className} text-end text-[18px] mt-8 text-[#4169E1] cursor-pointer`}
        onClick={handleSelectAll}
      >
        Mark as read
      </div>
      {isMobile ? (
        <>
          <div className="border rounded-[20px] border-2">
            <MobileViewNotification
              isDrawer={true}
              handleSelectAll={handleCheckedAll}
              selectAll={selectAll}
              handleCheckboxChange={handleCheckboxChange}
              currentNotifications={currentNotifications}
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              handleNext={handleNext}
              handlePrevious={handlePrevious}
              onNotificationClick={handleNotificationClick}

            />
          </div>
        </>
      ) : (
        <div>
          <DesktopViewNotification
            isDrawer={true}
            handleSelectAll={handleCheckedAll}
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
            onNotificationClick={handleNotificationClick}
            textMaxLenght={40}
          />
        </div>
      )}

      {/* Display ReadNotification below the notification list */}
      {selectedNotification && (
        <ReadNotification selectedNotification={selectedNotification} />
      )}
    </>
  );
};

export default NotificationsTableDrawer;

const ReadNotification = ({ selectedNotification }) => {
  return (
    <div>
      {selectedNotification && (
        <div className="mt-4 p-4 border-t border-gray-300">
          <h3
            className={` ${groteskText.className} text-black text-lg font-semibold`}
          >
            {selectedNotification.type} Details
          </h3>
          <p className={` text-black ${groteskText.className} mt-2`}>
            {selectedNotification.details}
          </p>
        </div>
      )}
    </div>
  );
};
