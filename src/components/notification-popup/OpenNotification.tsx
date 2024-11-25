import React, { useState } from 'react';
import './OpenNotification.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faChevronDown, faUserAlt, faMapMarker, faCog, faSignOutAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { groteskText, groteskTextMedium } from '@/app/fonts';

const NotificationItem = ({  title, subTitle, timeStamp, onClick }) => (
  <li className="flex items-center justify-between border-b border-[#667185] cursor-pointer">
   
   <ul className="list-outside ml-[18px] lex items-center">
      <li className="flex items-center list-disc relative justify-between">
        <span className="absolute -left-4 mb-[5px] h-2.5 w-2.5 rounded-full bg-[#52FF58]"></span>
        <span className={`text-[#424242] text-[16px] ${groteskTextMedium.className}`}>{title}</span>
        <div className={`text-[#424242] text-[14px] ml-[4px]  ${groteskTextMedium.className}`}>{subTitle}</div>
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
    // setIsNotificationsActive(true);
    setIsPopupVisible(true);
  };
const handleClick =()=>{

}
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
            <div className='flex justify-between items-center border-b border-[#667185]'>
      <h1 className={`text-[#000000] text-[24px] ${groteskTextMedium.className}`}>Notificatons</h1>
      <h2  className={`text-[#4169E1] text-[22px] ${groteskText.className}`}>Mark as read</h2>
      </div>
              <ul className="notification-list max-h-[300px] overflow-y-auto">
                <NotificationItem title="Contravention" subTitle="Hooray! You’ve Joined the Unstoppable Family!" timeStamp="10:52am" onClick={handleClick} />
                <NotificationItem  title="Contravention" subTitle="Hooray! You’ve Joined the Unstoppable Family!" timeStamp="10:52am" onClick={handleClick}/>
                <NotificationItem  title="Contravention" subTitle="Hooray! You’ve Joined the Unstoppable Family!" timeStamp="10:52am" onClick={handleClick} />
                <NotificationItem title="Contravention" subTitle="Hooray! You’ve Joined the Unstoppable Family!" timeStamp="10:52am" onClick={handleClick}/>
                <NotificationItem  title="Contravention" subTitle="Hooray! You’ve Joined the Unstoppable Family!" timeStamp="10:52am" onClick={handleClick}/>
                <NotificationItem  title="Contravention" subTitle="Hooray! You’ve Joined the Unstoppable Family!" timeStamp="10:52am" onClick={handleClick}/>
                <NotificationItem title="Contravention" subTitle="Hooray! You’ve Joined the Unstoppable Family!" timeStamp="10:52am" onClick={handleClick}/>
                <NotificationItem  title="Contravention" subTitle="Hooray! You’ve Joined the Unstoppable Family!" timeStamp="10:52am" onClick={handleClick}/>
                <NotificationItem  title="Contravention" subTitle="Hooray! You’ve Joined the Unstoppable Family!" timeStamp="10:52am" onClick={handleClick}/>
                <NotificationItem  title="Contravention" subTitle="Hooray! You’ve Joined the Unstoppable Family!" timeStamp="10:52am" onClick={handleClick}/>
                <NotificationItem  title="Contravention" subTitle="Hooray! You’ve Joined the Unstoppable Family!" timeStamp="10:52am" onClick={handleClick}/>
                <li className="show_all">
                  <p className="link" onClick={handleShowAllClick}>Show All Notifications</p>
                </li>
              </ul>
            </div>
          </div>

       
        </div>
      </div>

    
    </div>
  );
};

export default ProfileAndNotificationsDropdown;
