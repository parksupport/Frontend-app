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
  selectAll: boolean;
  handleSelectAll: () => void;
  handleCheckboxChange: (id: number) => void;
  handleNext: () => void;
  handlePrevious: () => void;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
  totalNotifications: number;
  handleCheckedAll: () => void;
  selectedNotification: Notification | null;
  handleNotificationClick: (notification: Notification) => void;
}

const useNotifications = (
  initialNotifications: Notification[],
  itemsPerPage: number
): UseNotificationsReturn => {
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedNotification, setSelectedNotification] = useState(null);

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
    setSelectAll(!selectAll);
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      checked: !selectAll,
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

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    const updatedNotifications = notifications.map((n) =>
      n.id === notification.id ? { ...n, read: true } : n
    );
    setNotifications(updatedNotifications);
  };

  return {
    currentNotifications,
    currentPage,
    totalPages,
    selectAll,
    handleSelectAll,
    handleCheckboxChange,
    handleNext,
    handlePrevious,
    setCurrentPage,
    itemsPerPage,
    totalNotifications,
    handleCheckedAll,
    handleNotificationClick,
    selectedNotification,
  };
};

export default useNotifications;
