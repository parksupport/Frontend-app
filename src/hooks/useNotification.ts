import { useState } from "react";

interface Notification {
  id: number;
  type: string;
  message: string;
  date: string;
  read: boolean;
  checked?: boolean;
}

interface UseNotificationsReturn {
  currentNotifications: Notification[];
  currentPage: number;
  totalPages: number;
  isAllSelected: boolean;
  handleSelectAll: () => void;
  handleCheckboxChange: (id: number) => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
  totalNotifications: number;
  handleCheckedAll: () => void;
  selectedNotification: Notification | null;
  handleNotificationClick: (notification: Notification) => void;
  selectedNotificationsList: Notification[];
  updateSelectedNotifications: (notification: Notification) => void;
}

const useNotifications = (
  initialNotifications: Notification[],
  itemsPerPage: number
): UseNotificationsReturn => {
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);
  const [isAllSelected, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [selectedNotificationsList, SetselectedNotificationsList] = useState(
    []
  );

  const totalNotifications = notifications.length;
  const totalPages = Math.ceil(totalNotifications / itemsPerPage);

  const handleSelectAll = () => {
    const updatedNotifications = notifications.map((n) => ({
      ...n,
      read: true,
    }));
    setNotifications(updatedNotifications);
  };

  const handleCheckedAll = () => {
    setSelectAll(!isAllSelected);
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      checked: !isAllSelected,
    }));
    setNotifications(updatedNotifications);
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

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const currentNotifications = notifications.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // const handleNotificationClick = (notification) => {
  //   setSelectedNotification(notification);
  //   const updatedNotifications = notifications.map((n) =>
  //     n.id === notification.id ? { ...n, read: true } : n
  //   );
  //   setNotifications(updatedNotifications);
  // };

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);

    // Mark the notification as read
    const updatedNotifications = notifications.map((n) =>
      n.id === notification.id ? { ...n, read: true } : n
    );
    setNotifications(updatedNotifications);
  };

  const updateSelectedNotifications = (notification: Notification) => {
    SetselectedNotificationsList((prevSelected) => {
      const isAlreadySelected = prevSelected.find(
        (n) => n.id === notification.id
      );
      if (isAlreadySelected) {
        // Remove if already selected
        return prevSelected.filter((n) => n.id !== notification.id);
      } else {
        // Add if not selected
        return [...prevSelected, notification];
      }
    });
  };

  return {
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
    handleCheckedAll,
    handleNotificationClick,
    selectedNotification,
    selectedNotificationsList,
    updateSelectedNotifications,
  };
};

export default useNotifications;



