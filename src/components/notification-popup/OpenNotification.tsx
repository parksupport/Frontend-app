import React, { useState } from 'react';
import './OpenNotification.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faChevronDown, faUserAlt, faMapMarker, faCog, faSignOutAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { groteskText, groteskTextMedium } from '@/app/fonts';

const NotificationItem = ({  title, subTitle, timeStamp }) => (
  <li className="flex items-center justify-between">
   
   <ul className="list-outside ml-[18px] lex items-center">
      <li className="flex items-center list-disc relative justify-between">
        <span className="absolute -left-4 mb-[5px] h-2.5 w-2.5 rounded-full bg-[#52FF58]"></span>
        <span className={`text-[#424242] text-[16px] ${groteskTextMedium.className}`}>{title}</span>
        <div className={`text-[#424242] text-[14px] ml-[1rem] ${groteskTextMedium.className}`}>{subTitle}</div>
      </li>
    </ul>
    <div className="">
      <p className={`text-[#424242] text-[14px] ${groteskTextMedium.className}`}>{timeStamp}</p>
    </div>
  </li>
);

const ProfileAndNotificationsDropdown = () => {
  const [isProfileActive, setIsProfileActive] = useState(false);
  const [isNotificationsActive, setIsNotificationsActive] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleProfileClick = () => {
    setIsProfileActive(!isProfileActive);
    setIsNotificationsActive(false);
  };

  const handleNotificationsClick = () => {
    setIsNotificationsActive(!isNotificationsActive);
    setIsProfileActive(false);
  };

  const handleShowAllClick = () => {
    setIsNotificationsActive(false);
    setIsPopupVisible(true);
  };

  const handleClosePopupClick = () => {
    setIsPopupVisible(false);
  };

  return (
    <div className="wrapper">
     
      <div className="navbar">
     

        <div className="navbar_right">
          <div className={`notifications ${isNotificationsActive ? 'active' : ''}`}>
            <div className="icon_wrap" onClick={handleNotificationsClick}>
              <FontAwesomeIcon icon={faBell} />
            </div>
            
            <div className="notification_dd py-[20px] px-[20px]">
            <div className='flex justify-between items-center '>
      <h1 className={`text-[#000000] text-[24px] ${groteskTextMedium.className}`}>Notificatons</h1>
      <h2  className={`text-[#4169E1] text-[22px] ${groteskText.className}`}>Mark as unread</h2>
      </div>
              <ul className="">
                <NotificationItem title="Contravention" subTitle="Hooray! You’ve Joined the Unstoppable Family!" timeStamp="10:52am" />
                <NotificationItem  title="Contravention" subTitle="Hooray! You’ve Joined the Unstoppable Family!" timeStamp="10:52am" />
                <NotificationItem  title="Contravention" subTitle="Hooray! You’ve Joined the Unstoppable Family!" timeStamp="10:52am" />
                <NotificationItem title="Contravention" subTitle="Hooray! You’ve Joined the Unstoppable Family!" timeStamp="10:52am" />
                <NotificationItem  title="Contravention" subTitle="Hooray! You’ve Joined the Unstoppable Family!" timeStamp="10:52am" />
                <li className="show_all">
                  <p className="link" onClick={handleShowAllClick}>Show All Activities</p>
                </li>
              </ul>
            </div>
          </div>

          <div className={`profile ${isProfileActive ? 'active' : ''}`}>
            {/* <div className="icon_wrap" onClick={handleProfileClick}>
              <img src="profile_pic.png" alt="profile_pic" />
              <span className="name">John Alex</span>
              <FontAwesomeIcon icon={faChevronDown} />
            </div> */}
            <div className="profile_dd">
              <ul className="profile_ul">
                <li className="profile_li">
                  <a className="profile" href="#">
                    <span className="picon"><FontAwesomeIcon icon={faUserAlt} /></span>
                    Profile
                  </a>
                  <div className="btn">My Account</div>
                </li>
                <li>
                  <a className="address" href="#">
                    <span className="picon"><FontAwesomeIcon icon={faMapMarker} /></span>
                    Address
                  </a>
                </li>
                <li>
                  <a className="settings" href="#">
                    <span className="picon"><FontAwesomeIcon icon={faCog} /></span>
                    Settings
                  </a>
                </li>
                <li>
                  <a className="logout" href="#">
                    <span className="picon"><FontAwesomeIcon icon={faSignOutAlt} /></span>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {isPopupVisible && (
        <div className="popup">
          <div className="shadow"></div>
          <div className="inner_popup">
            <div className="notification_dd">
              <ul className="notification_ul">
                <li className="title">
                  <p>All Notifications</p>
                  <p className="close" onClick={handleClosePopupClick}><FontAwesomeIcon icon={faTimes} /></p>
                </li>
                <NotificationItem  title="Contravention" subTitle="Hooray! You’ve Joined the Unstoppable Family!" timeStamp="10:52am" />
                <NotificationItem title="Contravention" subTitle="Hooray! You’ve Joined the Unstoppable Family!" timeStamp="10:52am" />
                <NotificationItem  title="Contravention" subTitle="Hooray! You’ve Joined the Unstoppable Family!" timeStamp="10:52am" />
                <NotificationItem  title="Contravention" subTitle="Hooray! You’ve Joined the Unstoppable Family!" timeStamp="10:52am" />
                <NotificationItem  title="Contravention" subTitle="Hooray! You’ve Joined the Unstoppable Family!" timeStamp="10:52am" />
                <NotificationItem  title="Contravention" subTitle="Hooray! You’ve Joined the Unstoppable Family!" timeStamp="10:52am" />
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileAndNotificationsDropdown;
