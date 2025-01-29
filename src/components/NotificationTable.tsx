import { groteskText, groteskTextMedium } from "@/app/fonts";
import LabelImportantSVG from "@/assets/svg/label_important.svg";
import { MoveDiagonal } from "lucide-react";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import SliderButton from "./SliderButton";
import TruncatedText from "./ToggleComponent/TruncatedText";

interface NotificationProps {
  id: number;
  type: string;
  message: string;
  date: string;
  is_read: boolean;
  checked?: boolean;
}

interface MobileViewNotificationProps {
  hasCheckbox?: boolean;
  openNotificationsDrawer?: () => void;
  isDrawer: boolean;
  handleSelectAll: () => void;
  selectAll: boolean;
  currentNotifications: any;
  totalPages: number;
  currentPage: number;
  setCurrentPage?: (page: number) => void;
  handleNext: () => void;
  handlePrevious: () => void;
  handleSelectNotification?: any;
  selectedNotificationsList?: any;
  updateSelectedNotifications?: any;
  notificationStateMessage: any;
  selectedNotification?: any;
}

export const MobileViewNotification = ({
  notificationStateMessage,
  hasCheckbox = false,
  openNotificationsDrawer,
  isDrawer,
  handleSelectAll,
  selectAll,
  currentNotifications,
  totalPages,
  currentPage,
  setCurrentPage,
  handlePrevious,
  handleNext,
  handleSelectNotification,
  selectedNotificationsList,
  updateSelectedNotifications,
  selectedNotification,
}: MobileViewNotificationProps) => {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (_current: number, next: number) => setCurrentPage(next),
    arrows: false,
  };
  return (
    <>
      <div className="bg-white px-2 py-3 rounded-[16px] max-w-[396px]  sm:max-w-md md:max-w-[680px] w-full">
        {!isDrawer && (
          <div className="flex justify-between py-[10px]">
            <h2
              className={`text-[24px] text-black ${groteskTextMedium.className}`}
            >
              Notifications
            </h2>

            <div className="flex items-center ">
              {hasCheckbox && (
                <div className="flex items-center px-6">
                  <input
                    type="checkbox"
                    className="form-checkbox w-4 h-4"
                    onChange={handleSelectAll}
                    checked={selectAll}
                  />
                </div>
              )}
              <MoveDiagonal size={24} onClick={openNotificationsDrawer} />
            </div>
          </div>
        )}
        <div className="min-h-[200px] ">
          {notificationStateMessage}
          <Slider {...settings}>
            {Array.from({ length: totalPages }, (_, index) => (
              <div key={index} className=" w-full">
                {currentNotifications.map((notification) => {
                  const isSelected =
                    selectedNotification &&
                    selectedNotification.id === notification.id;
                  return (
                    <div
                      key={notification.id}
                      className={`${isSelected ? "bg-gray-200" : ""} rounded-lg flex items-center justify-between   w-full ${
                        isDrawer ? "py-2" : "py-1"
                      }`}
                      onClick={() =>
                        isDrawer
                          ? handleSelectNotification(notification)
                          : openNotificationsDrawer()
                      }
                    >
                      {/* Icon */}
                      <div
                        className={`w-[40px] h-[40px] bg-[#D9D9D9] rounded-full flex items-center justify-center text-[20px] font-bold text-gray-700 ${groteskText.className}`}
                      >
                        {notification?.notification_type?.charAt(0)}
                      </div>

                      {/* Text Details */}
                      <div className="flex-1 ml-1">
                        <div className="flex fle items-center ">
                          <div className="px-1 ">
                            <LabelImportantSVG className="" />
                          </div>
                          <p
                            className={`text-[16px]  ${
                              notification?.is_read
                                ? "text-gray-400"
                                : "text-black"
                            } ${groteskTextMedium.className}`}
                          >
                            {notification?.notification_type}
                          </p>
                        </div>
                        <p
                          className={`  text-[16px] ${
                            notification?.is_read
                              ? "text-gray-400"
                              : "text-black"
                          } ${groteskTextMedium.className}`}
                        >
                          <TruncatedText
                            text={notification?.message}
                            maxLength={40}
                            className={`${groteskTextMedium.className}`}
                            showFullOnHover={false}
                          />
                        </p>
                      </div>

                      {/* Date and Checkbox */}
                      <div
                        className="flex flex-col items-end "
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span
                          className={`text-[12px] ${
                            notification.is_read
                              ? "text-gray-400"
                              : "text-black"
                          } ${groteskTextMedium.className}`}
                        >
                          {notification.created_at}
                        </span>
                        {hasCheckbox && (
                          <input
                            type="checkbox"
                            className="form-checkbox w-4 h-4 mt-2"
                            checked={selectedNotificationsList?.some(
                              (n) => n.id === notification.id
                            )}
                            onChange={() =>
                              updateSelectedNotifications(notification)
                            }
                          />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </Slider>
        </div>
        {!isDrawer && (
          <div className="flex px-2 justify-between items-center mt-2">
            <SliderButton
              direction="previous"
              isDisabled={currentPage === 0}
              onClick={handlePrevious}
            />
            <div className="flex space-x-1">
              {Array.from({ length: totalPages }, (_, index) => (
                <span
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentPage ? "bg-blue-500" : "bg-gray-300"
                  }`}
                ></span>
              ))}
            </div>

            <SliderButton
              direction="next"
              isDisabled={currentPage === totalPages - 1}
              onClick={handleNext}
            />
          </div>
        )}
      </div>
    </>
  );
};

interface DesktopViewNotificationProps {
  hasCheckbox?: boolean;
  isDrawer?: boolean;
  handleSelectAll: any;
  selectAll: boolean;
  currentNotifications: any;
  totalPages: number;
  currentPage: number;
  setCurrentPage?: (page: number) => void;
  handleNext: () => void;
  handlePrevious: () => void;
  itemsPerPage: number;
  totalNotifications: number;
  handleSelectNotification?: any;
  textMaxLenght?: number;
  updateSelectedNotifications?: any;
  selectedNotificationsList?: any;
  openNotificationsTable?: any;
  notificationStateMessage: any;
  selectedNotification?: any;
}

export const DesktopViewNotification = ({
  notificationStateMessage,
  openNotificationsTable,
  hasCheckbox = false,
  isDrawer,
  currentNotifications,
  totalPages,
  currentPage,
  handleNext,
  handlePrevious,
  itemsPerPage,
  totalNotifications,
  handleSelectNotification,
  textMaxLenght,
  updateSelectedNotifications,
  selectedNotificationsList,
  selectedNotification,
}: DesktopViewNotificationProps) => {
  return (
    <>
      <div className="rounded-[12px] border border-gray-200  w-full">
        <div className="bg-white px-2 py-2 flex items-center justify-between w-full">
          <div className="ml-auto text-end flex justify-end space-x-2 items-center">
            <span className={`${groteskText.className}  text-gray-500`}>
              {`${currentPage * itemsPerPage + 1} - ${Math.min(
                (currentPage + 1) * itemsPerPage,
                totalNotifications
              )} of ${totalNotifications}`}
            </span>
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
        <div className="overflow-x-auto ">
          <table className=" mx-auto min-w-full text-left  mt-0">
            <tbody>
              {currentNotifications?.map((notification) => {
                const isSelected =
                  selectedNotification &&
                  selectedNotification.id === notification.id;
                return (
                  <tr
                    key={notification.id}
                    className={`border-t border-gray-300 cursor-pointer ${
                      notification.is_read ? "text-gray-400" : "text-black"
                    } hover:bg-gray-100 ${isSelected ? "bg-gray-300" : ""}`}
                    onClick={() => {
                      if (isDrawer) {
                        updateSelectedNotifications([]); // Reset selected notifications list
                      }
                      // Handle the rest of the row click logic
                      if (isDrawer) {
                        handleSelectNotification(notification);
                      } else {
                        openNotificationsTable();
                      }
                    }}
                  >
                    {hasCheckbox && (
                      <td
                        className="pl-2 py-2 w-[5%]"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="checkbox"
                          className="form-checkbox"
                          checked={selectedNotificationsList?.some(
                            (n) => n.id === notification.id
                          )}
                          onChange={() =>
                            updateSelectedNotifications(notification)
                          }
                        />
                      </td>
                    )}
                    <td className="px-1 py-2 md:text-[18px] w-[15%]">
                      <div className="flex items-center">
                        <div className="pl-2 pr-4">
                          <LabelImportantSVG />
                        </div>
                        <span className={`${groteskText.className}`}>
                          {notification.notification_type}
                        </span>
                      </div>
                    </td>
                    <td
                      className={`${groteskText.className} md:text-[18px] {isDrawer ? 'px-0' : 'px-2'} py-2 w-[50%]`}
                    >
                      <TruncatedText
                        text={notification.message}
                        maxLength={textMaxLenght}
                        className={`${groteskTextMedium.className}`}
                        showFullOnHover={false}
                      />
                    </td>
                    <td
                      className={`${groteskText.className} {isDrawer ? 'px-0' : 'px-2'} py-2 text-center w-[10%]`}
                    >
                      {notification.created_at}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex items-center justify-center">
            {notificationStateMessage}
          </div>
        </div>
      </div>
    </>
  );
};
