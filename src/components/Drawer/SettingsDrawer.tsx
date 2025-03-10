// SettingsDrawer.tsx
import { groteskText, groteskTextMedium } from "@/app/fonts";
import PlusButtonSVG from "@/assets/svg/normal.svg";
import { Switch } from "@/components/ui/switch";
import { useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Button from "../Buttons";
import InputField from "../InputField";
import DrawerHeader from "./DrawerHeader";
import ModalComponent from "./ModalComponent";

import { useLogout, useResetPassword } from "@/hooks/mutations/auth";
import { useNotificationPreferences } from "@/hooks/queries/notifications";
import SubscriptionPlans from "../Subscription";

const SettingsDrawer = ({
  toggleDrawer,
  openAddBillingMethod,
  openCarProfile,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { logout } = useLogout();
  const { changePassword, status } = useResetPassword();
  const {
    preferences,
    isLoadingPrefs,
    prefsError,
    savePreferences,
    isSaving,
    success,
  } = useNotificationPreferences();

  // 3) We’ll keep local state for toggles
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(false);

  // 4) On load (or whenever preferences changes), sync the toggles
  useEffect(() => {
    if (preferences) {
      setSmsNotifications(preferences.prefers_sms);
      setEmailNotifications(preferences.prefers_email);
    }
  }, [preferences]);

  // 5) Function to handle toggling SMS
  const handleToggleSms = (checked: boolean) => {
    setSmsNotifications(checked);
  };

  const handleToggleEmail = (checked: boolean) => {
    setEmailNotifications(checked);
  };

  const handleSavePreferences = () => {
    savePreferences({
      prefers_sms: smsNotifications,
      prefers_email: emailNotifications,
    });
  };

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    new_password: "",
    confirm_password: "",
  });

  const handleButtonClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    changePassword(formData);
    // Call form submission logic manually if needed
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center mx-auto md:w-[900px]">
      <DrawerHeader
        toggleDrawer={toggleDrawer}
        title="Settings"
        subTitle="Welcome to the Settings page, where you can customize and manage your account preferences, notification settings, and vehicle management features."
      />
      <ModalComponent
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        type="subscription"
        display={
          <SubscriptionPlans
            onClick={(id) => {
              openAddBillingMethod(id);
              onClose();
            }}
          />
        }
      />

      <div className="px-4 mt-[3rem] mb-[200px]">
        {/* My Vehicles Settings */}
        <div className="mt-[40px]">
          <h2
            className={`${groteskTextMedium.className} text-[#000000] text-[22px] md:text-[30px] leading-none`}
          >
            My Vehicles Settings
          </h2>

          <div className="flex gap-2 items-center ">
            <Button
              variant="link"
              style={{ color: "#000000" }}
              className={`${groteskText.className}  text-[#000000] text-[20px] md:text-[24px] leading-none `}
            >
              Add a Notification Recipient
            </Button>
            <div className="cursor-pointer">
              <PlusButtonSVG onClick={openCarProfile} />
            </div>
          </div>
        </div>
        {/* Billing and Payment */}
        <div className="mt-[40px]">
          <h2
            className={`${groteskTextMedium.className} text-[#000000] leading-none text-[22px] md:text-[30px] leading-none`}
          >
            Billing and Payment
          </h2>
          <p
            className={`${groteskText.className}  text-[#667185] text-[16px] md:text-[18px] leading-none `}
          >
            Add, update, or remove your billing methods.
          </p>
          <div className="flex gap-2 items-center mt-[1rem]">
            <Button
              variant="link"
              className={`${groteskText.className}  text-[#000000] text-[20px] md:text-[24px] leading-none `}
            >
              Add payment method
            </Button>
            <PlusButtonSVG onClick={openAddBillingMethod} />
          </div>
        </div>
        {/* Notification Settings */}
        <div className="mt-[40px]">
          <h2
            className={`${groteskTextMedium.className} text-[#000000] text-[22px] md:text-[30px] leading-none`}
          >
            Notification Settings
          </h2>
          <p
            className={`${groteskText.className} text-[#667185] text-[16px] md:text-[18px] leading-none`}
          >
            Choose how you want receive your notification
          </p>

          {/* Toggles */}
          <div className="flex items-center gap-[3rem] mt-2">
            <div className="flex items-center gap-[1rem]">
              <label
                className={`text-[24px] text-[#000000] ${groteskText.className}`}
              >
                Sms
              </label>
              <Switch
                checked={smsNotifications}
                onCheckedChange={handleToggleSms}
              />
            </div>
            <div className="flex items-center gap-[1rem]">
              <label
                className={`text-[24px] text-[#000000] ${groteskText.className}`}
              >
                Email
              </label>
              <Switch
                checked={emailNotifications}
                onCheckedChange={handleToggleEmail}
              />
            </div>
          </div>

          {/* Save button */}
          <div className="mt-4 flex gap-4">
            <Button
              variant="quinary"
              onClick={handleSavePreferences}
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save Preferences"}
            </Button>
            {success && <p className="text-blue-500 mt-2">saved</p>}
          </div>

          {/* Error or loading states */}
          {prefsError && (
            <p className="text-red-500 mt-2">
              Error loading/updating preferences: {String(prefsError)}
            </p>
          )}
        </div>

        {/* Password and Security */}
        <div className="flex items-center gap-[1rem] mt-[40px]">
          <h2
            className={`${groteskTextMedium.className} text-[#000000] text-[22px] md:text-[30px] leading-none`}
          >
            Subscription
          </h2>
          <div className="cursor-pointer">
            <PlusButtonSVG onClick={onOpen} />
          </div>
        </div>

        <div className="mt-[40px] ">
          <h2
            className={`${groteskTextMedium.className} text-[#000000] text-[22px] md:text-[30px] leading-none`}
          >
            Password and Security
          </h2>
          <p
            className={`${groteskText.className}  text-[#667185] text-[16px] md:text-[18px] leading-none `}
          >
            You can change your password
          </p>
          <div className="mt-[1rem]">
            <h2
              className={`${groteskText.className} text-[#000000] text-[16px] md:text-[20px] leadining-none`}
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
                  name="new_password"
                  label="New Password"
                  placeholder="Enter new password"
                  value={formData.new_password}
                  onChange={handleChange}
                  className="py-4 md:py-3 w-[100%]"
                />

                <InputField
                  type="password"
                  name="confirm_password"
                  label="Confirm Password"
                  placeholder="Confirm new password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  className="py-4 md:py-3 w-[100%]"
                />
                <div className="mt-4 flex gap-4"></div>
                <Button
                  type="button"
                  className="w-[30%] mx-auto rounded-[0.75rem] whitespace-nowrap py-[8px] px-[12px] w-[60%] "
                  variant="quinary"
                  onClick={(e) => handleButtonClick(e)}
                >
                  {status === "pending" ? "Loading" : "Saved"}
                </Button>
              </form>
            )}
          </div>

          <div className="pt-10 flex flex-col gap-2">
            <h1 className={` ${groteskTextMedium.className} text-[24px]`}>
              Logout your account
            </h1>
            <div>
              <button
                className={` w-[60%]  ${groteskText.className} text-[16px] md:text-[18px] px-4 py-2 gap-2 border text-[#CB1A14] border-[#CB1A14] rounded-[8px]`}
                onClick={() => logout()}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsDrawer;
