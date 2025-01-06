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
  handleCheckboxChange: (id: number) => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
  totalNotifications: number;
  handleCheckedAll: () => void;
  selectedNotification: Notification | null;
  handleNotificationClick: (notification: Notification) => void;
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

  // const handleDeleteNotification = () => {
  //   // setSelectedNotification(notification);

  //   // Call the API or hook to mark as read

  //   // Update the local state to reflect the read status
  //   deleteNotification(selectedNotification.id); // Assuming markAsRead is a function to call the API
  //   const updatedNotifications = notifications.filter(
  //     (n) => n.id !== selectedNotification.id
  //   );
  //   setNotifications(updatedNotifications);
  // };

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

      // Optionally update the original list (if it's stored in a state or store)
      // For example, if you're using Zustand:
      // setSelectedNotificationsList(updatedNotificationsList);

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

  const handleCheckboxChange = (id: number) => {
    // setNotifications((prevNotifications) => {
    //   const updatedNotifications = prevNotifications.map((notification) =>
    //     notification.id === id
    //       ? { ...notification, checked: !notification.checked }
    //       : notification
    //   );
    //   // Find and set the checked notification using the updated state
    //   const checkedNotification = updatedNotifications.find(
    //     (notification) => notification.id === id
    //   );
    //   if (checkedNotification) {
    //     setCheckedNotification(checkedNotification);
    //   }
    //   console.log("first",updatedNotifications)
    //   return updatedNotifications;
    // });
  };

  const handleDelete = (id) => {};

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

  // const handleNotificationClick = (notification) => {
  //   setSelectedNotification(notification);
  //   const updatedNotifications = notifications.map((n) =>
  //     n.id === notification.id ? { ...n, read: true } : n
  //   );
  //   setNotifications(updatedNotifications);
  // };

  // const handleNotificationClick = (notification) => {
  //   setSelectedNotification(notification);

  //   // Mark the notification as read
  //   const updatedNotifications = notifications.map((n) =>

  //     n.id === notification.id ? { ...n, read: true } : n
  //   );
  //   setNotifications(updatedNotifications);
  // };

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);

    // Call the API or hook to mark as read

    // Update the local state to reflect the read status
    markAsRead(notification.id); // Assuming markAsRead is a function to call the API
    const updatedNotifications = notifications.map((n) =>
      n.id === notification.id ? { ...n, is_read: true } : n
    );
    console.log("updated", updatedNotifications);
    setNotifications(updatedNotifications);
  };

  // const updateSelectedNotifications = (notification: Notification) => {
  //   SetselectedNotificationsList((prevSelected) => {
  //     const isAlreadySelected = prevSelected.find(
  //       (n) => n.id === notification.id
  //     );
  //     if (isAlreadySelected) {
  //       // Remove if already selected
  //       return prevSelected.filter((n) => n.id !== notification.id);
  //     } else {
  //       // Add if not selected
  //       return [...prevSelected, notification];
  //     }
  //   });
  // };

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
    handleDeleteNotification,
  };
};

export default useNotifications;

// import { useEffect, useState, useCallback, useMemo } from "react";
// import { useMarkRead } from "./mutations/notification";

// interface Notification {
//   id: number;
//   type: string;
//   message: string;
//   date: string;
//   read: boolean;
//   checked?: boolean;
// }

// interface UseNotificationsReturn {
//   currentNotifications: Notification[];
//   currentPage: number;
//   totalPages: number;
//   isAllSelected: boolean;
//   handleSelectAll: () => void;
//   handleCheckboxChange: (id: number) => void;
//   goToNextPage: () => void;
//   goToPreviousPage: () => void;
//   setCurrentPage: (page: number) => void;
//   itemsPerPage: number;
//   totalNotifications: number;
//   handleCheckedAll: () => void;
//   selectedNotification: Notification | null;
//   handleNotificationClick: (notification: Notification) => void;
//   selectedNotificationsList: Notification[];
//   updateSelectedNotifications: (notification: Notification) => void;
// }

// const useNotifications = (
//   initialNotifications: Notification[],
//   itemsPerPage: number
// ): UseNotificationsReturn => {
//   const [notifications, setNotifications] = useState<Notification[]>(initialNotifications || []);
//   const [isAllSelected, setSelectAll] = useState(false);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
//   const [selectedNotificationsList, SetselectedNotificationsList] = useState<Notification[]>([]);

//   const { markAsRead } = useMarkRead();

//   useEffect(() => {
//     // Check if the notifications have changed before setting state
//     if (JSON.stringify(initialNotifications) !== JSON.stringify(notifications)) {
//       setNotifications(initialNotifications);
//     }
//   }, [initialNotifications, notifications]);

//   const totalNotifications = notifications?.length;
//   const totalPages = useMemo(() => Math.ceil(totalNotifications / itemsPerPage), [totalNotifications, itemsPerPage]);

//   const handleSelectAll = useCallback(() => {
//     const updatedNotifications = notifications.map((n) => ({ ...n, read: true }));
//     setNotifications(updatedNotifications);
//   }, [notifications]);

//   const handleCheckedAll = useCallback(() => {
//     setSelectAll((prev) => !prev);
//     const updatedNotifications = notifications.map((notification) => ({
//       ...notification,
//       checked: !isAllSelected,
//     }));
//     setNotifications(updatedNotifications);
//   }, [isAllSelected, notifications]);

//   const handleCheckboxChange = useCallback((id: number) => {
//     setNotifications((prevNotifications) =>
//       prevNotifications.map((notification) =>
//         notification.id === id ? { ...notification, checked: !notification.checked } : notification
//       )
//     );
//   }, []);

//   const goToNextPage = useCallback(() => {
//     if (currentPage < totalPages - 1) {
//       setCurrentPage((prevPage) => prevPage + 1);
//     }
//   }, [currentPage, totalPages]);

//   const goToPreviousPage = useCallback(() => {
//     if (currentPage > 0) {
//       setCurrentPage((prevPage) => prevPage - 1);
//     }
//   }, [currentPage]);

//   const currentNotifications = useMemo(() => notifications.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage), [notifications, currentPage, itemsPerPage]);

//   const handleNotificationClick = useCallback((notification: Notification) => {

//     setSelectedNotification(notification);

//     const updatedNotifications = notifications.map((n) =>
//       n.id === notification.id ? { ...n, read: true } : n
//     );
//     setNotifications(updatedNotifications);
//   }, [notifications]);

//   const updateSelectedNotifications = useCallback((notificationOrList: Notification | Notification[]) => {
//     SetselectedNotificationsList((prevSelected) => {
//       if (Array.isArray(notificationOrList)) {
//         return notificationOrList;
//       }
//       const isAlreadySelected = prevSelected.find((n) => n.id === notificationOrList.id);
//       if (isAlreadySelected) {
//         return prevSelected.filter((n) => n.id !== notificationOrList.id);
//       } else {
//         return [...prevSelected, notificationOrList];
//       }
//     });
//   }, []);

//   return {
//     currentNotifications,
//     currentPage,
//     totalPages,
//     isAllSelected,
//     handleSelectAll,
//     handleCheckboxChange,
//     goToNextPage,
//     goToPreviousPage,
//     setCurrentPage,
//     itemsPerPage,
//     totalNotifications,
//     handleCheckedAll,
//     handleNotificationClick,
//     selectedNotification,
//     selectedNotificationsList,
//     updateSelectedNotifications,
//   };
// };

// export default useNotifications;
