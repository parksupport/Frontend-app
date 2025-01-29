import { useEffect, useState } from "react";
import {
  useDeleteNotification,
  useMarkAllRead,
  useMarkRead,
} from "./mutations/notification";

interface Notification {
  id: number;
  type: string;
  message: string;
  date: string;
  is_read: boolean;
  checked?: boolean;
}

interface UseNotificationsReturn {
  currentNotifications: Notification[];
  currentPage: number;
  totalPages: number;
  isAllSelected: boolean;
  handleSelectAll: () => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
  totalNotifications: number;
  handleCheckedAll: () => void;
  selectedNotification: Notification | null;
  handleSelectNotification: (notification: Notification) => void;
  handleDeleteNotification: () => void;
  selectedNotificationsList: Notification[];
  updateSelectedNotifications: (notification: Notification) => void;
}

const useNotifications = (
  initialNotifications: Notification[],
  itemsPerPage: number
): UseNotificationsReturn => {
  const [notifications, setNotifications] = useState<Notification[]>(
    initialNotifications || []
  );
  const [isAllSelected, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [selectedNotificationsList, SetselectedNotificationsList] = useState(
    []
  );

  const { markAsRead } = useMarkRead();
  const { markAllAsRead } = useMarkAllRead();
  const { deleteNotification } = useDeleteNotification();



  useEffect(() => {
    // Check if the notifications have changed before setting state
    if (
      JSON.stringify(initialNotifications) !== JSON.stringify(notifications)
    ) {
      setNotifications(initialNotifications);
    }
  }, [initialNotifications, notifications]);

  const totalNotifications = notifications?.length;
  const totalPages = Math.ceil(totalNotifications / itemsPerPage);


  const handleDeleteNotification = () => {
    try {
      // Create a copy of the original list to update it without reassignment
      let updatedNotificationsList = [...selectedNotificationsList];

      // Iterate over the array and delete each notification by its id
      for (const notification of selectedNotificationsList) {
        const { id } = notification; // Extract the id from each object

        deleteNotification({ id });

        // Remove the deleted notification from the copy of the list
        updatedNotificationsList = updatedNotificationsList.filter(
          (item) => item.id !== id
        );
        SetselectedNotificationsList(updatedNotificationsList);
      }


      console.log("All selected notifications deleted successfully");
    } catch (error) {
      console.error("Error deleting notifications:", error);
    }
  };

  const handleSelectAll = () => {
    markAllAsRead();
    const updatedNotifications = notifications?.map((n) => ({
      ...n,
      is_read: true,
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

  const currentNotifications = notifications?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );


  const handleSelectNotification = (notification) => {
    setSelectedNotification(notification);


    // Update the local state to reflect the read status
    markAsRead(notification.id); // Assuming markAsRead is a function to call the API
    const updatedNotifications = notifications.map((n) =>
      n.id === notification.id ? { ...n, is_read: true } : n
    );
    console.log("updated", updatedNotifications);
    setNotifications(updatedNotifications);
  };

 
  const updateSelectedNotifications = (notificationOrList) => {
    SetselectedNotificationsList((prevSelected) => {
      if (Array.isArray(notificationOrList)) {
        // Reset the selected list if an array is passed
        return notificationOrList;
      }
      const isAlreadySelected = prevSelected.find(
        (n) => n.id === notificationOrList.id
      );
      if (isAlreadySelected) {
        // Remove if already selected
        return prevSelected.filter((n) => n.id !== notificationOrList.id);
      } else {
        // Add if not selected
        return [...prevSelected, notificationOrList];
      }
    });
  };

  return {
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
    handleCheckedAll,
    handleSelectNotification,
    selectedNotification,
    selectedNotificationsList,
    updateSelectedNotifications,
    handleDeleteNotification,
  };
};

export default useNotifications;
