// SettingsDrawer.tsx
import React, { useRef, useState } from "react";
import DrawerHeader from "./DrawerHeader";
import { groteskText, groteskTextMedium } from "@/app/fonts";
import Button from "../Buttons";
import PlusButtonSVG from "@/assets/svg/normal.svg";
import { Switch } from "@/components/ui/switch";
import InputField from "../InputField";
import { useRouter } from "next/navigation";
import ModalComponent from "../ModalComponent";
import {  useDisclosure } from "@chakra-ui/react";
import ThirdPartyNominees from "../card/ThirdPartyNominee";
import Drawer from "./Drawer";

const SettingsDrawer = ({ toggleDrawer, openAddBillingMethod, openNotificationRep }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [isOpen, setIsOpen] = useState(false);


  const [smsNotifications, setSmsNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [isPopup, setIsPopup] = useState(false);
  const router = useRouter();


  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  // const openDrawer = () => {
  //   if (!isOpen) {
  //     setIsOpen(true);
  //   }
  // };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubcription = () => {
    console.log("subscribed");
  };

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  

  return (
    <div className="">
      <DrawerHeader
        toggleDrawer={toggleDrawer}
        title="Settings"
        subTitle="Welcome to the Settings page, where you can customize and manage your account preferences, notification settings, and vehicle management features."
      />
      <ModalComponent
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        toggleDrawer={toggleDrawer}
      />

      <div className="px-4 mt-[3rem] mb-[200px]">
        {/* My Vehicles Settings */}
        <div className="mt-[40px]">
          <h2
            className={`${groteskTextMedium.className} text-[#000000] text-[22px] `}
          >
            My Vehicles Settings
          </h2>

          <div className="flex gap-2 items-center ">
            <Button
              variant="link"
              style={{ color: "#000000" }}
              className={`${groteskText.className}  text-[#000000] text-[20px] `}
            >
              Add a Notification Recipient
            </Button>
            <div className="cursor-pointer">
            <PlusButtonSVG onClick={openNotificationRep} />
            </div>
          </div>
        </div>
        {/* Billing and Payment */}
        <div className="mt-[40px]">
          <h2
            className={`${groteskTextMedium.className} text-[#000000] leading-none text-[22px]`}
          >
            Billing and Payment
          </h2>
          <p
            className={`${groteskText.className}  text-[#667185] text-[16px] leading-none `}
          >
            Add, update, or remove your billing methods.
          </p>
          <div className="flex gap-2 items-center mt-[1rem]">
            <Button
              variant="link"
              className={`${groteskText.className}  text-[#000000] text-[20px] leading-none `}
            >
              Add payment method
            </Button>
            <PlusButtonSVG onClick={openAddBillingMethod} />
          </div>
        </div>
        {/* Notification Settings */}
        <div className="mt-[40px]">
          <h2
            className={`${groteskTextMedium.className} text-[#000000] text-[22px] leading-none`}
          >
            Notification Settings
          </h2>
          <p
            className={`${groteskText.className}  text-[#667185] text-[16px] leading-none `}
          >
            Choose how you want receive your notification
          </p>

          <div className="flex items-center gap-[3rem]">
            <div className="flex items-center gap-[1rem]">
              <label
                className={`text-[24px] text-[#000000] ${groteskText.className} `}
              >
                Sms
              </label>
              <Switch />

              {/* <input
              type="checkbox"
              checked={smsNotifications}
              onChange={() => setSmsNotifications(!smsNotifications)}
            /> */}
            </div>
            <div className="flex items-center gap-[1rem] ">
              <label
                className={`text-[24px] text-[#000000] ${groteskText.className} `}
              >
                Email{" "}
              </label>
              <Switch />
              {/* <input
              type="checkbox"
              checked={emailNotifications}
              onChange={() => setEmailNotifications(!emailNotifications)}
            /> */}
            </div>
          </div>
        </div>

        {/* Password and Security */}
        <div className="flex items-center gap-[1rem] mt-[40px]">
          <h2
            className={`${groteskTextMedium.className} text-[#000000] text-[22px] leading-none`}
          >
            Subscription
          </h2>
          <div className="cursor-pointer">
            <PlusButtonSVG onClick={onOpen} />
          </div>
        </div>

        <div className="mt-[40px] ">
          <h2
            className={`${groteskTextMedium.className} text-[#000000] text-[22px] leading-none`}
          >
            Password and Security
          </h2>
          <p
            className={`${groteskText.className}  text-[#667185] text-[16px] leading-none `}
          >
            You can change your password
          </p>
          <div className="mt-[1rem]">
            <h2
              className={`${groteskText.className} text-[#000000] text-[16px] md:text-[18px] leadining-none`}
            >
              You`ve set a CarAlert password
              <a
                href="#"
                onClick={toggleForm}
                className={`${groteskText.className} leading-none underline ml-[6px] text-[#4169E1] text-[16px] md:text-[18px] cursor-pointer`}
              >
                Change password
              </a>
            </h2>

            {showForm && (
              <form className="flex flex-col items-center md:items-start justify-center mt-[1rem]">
                <InputField
                  type="password"
                  name="newPassword"
                  label="New Password"
                  placeholder="Enter new password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="py-4 md:py-3 w-[400px]"
                />

                <InputField
                  type="password"
                  name="confirmPassword"
                  label="Confirm Password"
                  placeholder="Confirm new password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="py-4 md:py-3 w-[400px]"
                />
                <Button
                  type="button"
                  className="w-[30%] rounded-[0.75rem] whitespace-nowrap py-[8px] md:ml-[100px] px-[12px] "
                  variant="quinary"
                  // onClick={CheckVehicleOwner}
                >
                  Save
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
   
    </div>
  );
};

export default SettingsDrawer;


