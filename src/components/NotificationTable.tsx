import React, { useState } from "react";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { AiOutlineExpand } from "react-icons/ai";

interface NotificationProps {
  type: string;
  message: string;
  date: string;
  read?: boolean;
  checked?: boolean;
}

const NotificationsTable = () => {
  const notificationsData: NotificationProps[] = [
    {
      type: "Insurance",
      message: "Hooray! You've Joined the Unstoppable Family!",
      date: "26 Sept",
      read: "true",
    },
    {
      type: "Contravention",
      message: "Hooray! You've Joined the Unstoppable Family!",
      date: "26 Sept",
    },
    {
      type: "Login",
      message: "Hooray! You've Joined the Unstoppable Family!",
      date: "26 Sept",
      read: "true",
    },
    {
      type: "Insurance",
      message: "Hooray! You've Joined the Unstoppable Family!",
      date: "26 Sept",
      read: false,
    },
    {
      type: "Insurance",
      message: "Hooray! You've Joined the Unstoppable Family!",
      date: "26 Sept",
      read: true,
    },
    {
      type: "Insurance",
      message: "Hooray! You've Joined the Unstoppable Family!",
      date: "26 Sept",
      read: false,
    },
    {
      type: "Contravention",
      message: "Hooray! You've Joined the Unstoppable Family!",
      date: "26 Sept",
      read: true,
    },
    {
      type: "Logout",
      message: "Hooray! You've Joined the Unstoppable Family!",
      date: "26 Sept",
      read: false,
    },
    {
      type: "Insurance",
      message: "Hooray! You've Joined the Unstoppable Family!",
      date: "26 Sept",
      read: true,
    },
    {
      type: "Insurance",
      message: "Hooray! You've Joined the Unstoppable Family!",
      date: "26 Sept",
      read: true,
    },
  ];

  const [notifications, setNotifications] = useState(notificationsData);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectAll, setSelectAll] = useState(false);

  const itemsPerPage = 5;
  const totalNotifications = notifications.length;
  const totalPages = Math.ceil(totalNotifications / itemsPerPage);

  const currentNotifications = notifications.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

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

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      checked: !selectAll,
    }));
    setNotifications(updatedNotifications);
  };

  const handleCheckboxChange = (index) => {
    const updatedNotifications = [...notifications];
    updatedNotifications[index].checked = !updatedNotifications[index].checked;
    setNotifications(updatedNotifications);
  };

  return (
    <div className="bg-white p-4 rounded-[20px] border border-gray-200 ">
      <div className="flex justify-between py-[12px]">
        <h2 className="text-2xl font-semibold">Notifications</h2>
        <AiOutlineExpand size={24} />
      </div>
      <div className="rounded-[12px] border border-[#C5D5F8] overflow-hidden">
        <div className="bg-white p-2 flex items-center justify-between bg-gray-100">
          <div className="flex items-center px-2 py-3">
            <input
              type="checkbox"
              className="form-checkbox"
              onChange={handleSelectAll}
              checked={selectAll}
            />
          </div>
          <div className=" flex justify-end space-x-2 ">
            <span className="text-sm text-gray-500">{`${
              currentPage * itemsPerPage + 1
            } - ${Math.min(
              (currentPage + 1) * itemsPerPage,
              totalNotifications
            )} of ${totalNotifications}`}</span>
            <div className="flex gap-5">
              <GoChevronLeft
                size={20}
                className={`cursor-pointer ${
                  currentPage === 0
                    ? "text-gray-400"
                    : "text-gray-900 hover:text-black"
                }`}
                onClick={handlePrevious}
              />
              <GoChevronRight
                size={20}
                className={`cursor-pointer ${
                  currentPage === totalPages - 1
                    ? "text-gray-400"
                    : "text-gray-900 hover:text-black"
                }`}
                onClick={handleNext}
              />
            </div>
          </div>
        </div>

        <table className="min-w-full text-left table-auto  ">
          <tbody className="">
            {currentNotifications.map((notification, index) => (
              <tr
                key={index}
                className={`border-t border-[#C5D5F8] cursor-pointer ${
                  notification.read ? "text-gray-400" : "text-black"
                }`}
              >
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    onChange={() =>
                      handleCheckboxChange(currentPage * itemsPerPage + index)
                    }
                    checked={notification.checked || false}
                  />
                </td>
                <td className="px-4 py-2 flex items-center ">
                  <div className="w-4 h-4 bg-yellow-400 rounded-full mr-2"></div>
                  <span>{notification.type}</span>
                </td>
                <td className="px-4 py-2">{notification.message}</td>
                <td className="px-4 py-2 text-right">{notification.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NotificationsTable;
