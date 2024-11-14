// SettingsDrawer.tsx
import React, { useState } from "react";
import DrawerHeader from "./DrawerHeader";
import { groteskTextMedium } from "@/app/fonts";
import Button from "../Buttons";

const SettingsDrawer = ({ toggleDrawer, openAddBillingMethod }) => {
  const [smsNotifications, setSmsNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);

  return (
    <>
      <DrawerHeader
        toggleDrawer={toggleDrawer}
        title="Settings"
        subTitle="Welcome to the Settings page, where you can customize and manage your account preferences, notification settings, and vehicle management features."
      />
      <div className="px-4 mt-4">
        {/* My Vehicles Settings */}
        <div className="mt-6">
          <h2 className={`${groteskTextMedium.className} text-xl mb-2`}>
            My Vehicles Settings
          </h2>
          <Button variant="link">Add a third-party nominee</Button>
        </div>
        {/* Billing and Payment */}
        <div className="mt-6">
          <h2 className={`${groteskTextMedium.className} text-xl mb-2`}>
            Billing and Payment
          </h2>
          <Button variant="link" onClick={openAddBillingMethod}>
            Add payment method
          </Button>
        </div>
        {/* Notification Settings */}
        <div className="mt-6">
          <h2 className={`${groteskTextMedium.className} text-xl mb-2`}>
            Notification Settings
          </h2>
          <div className="flex items-center">
            <label className="mr-2">SMS Notifications</label>
            <input
              type="checkbox"
              checked={smsNotifications}
              onChange={() => setSmsNotifications(!smsNotifications)}
            />
          </div>
          <div className="flex items-center mt-2">
            <label className="mr-2">Email Notifications</label>
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={() => setEmailNotifications(!emailNotifications)}
            />
          </div>
        </div>
        {/* Password and Security */}
        <div className="mt-6">
          <h2 className={`${groteskTextMedium.className} text-xl mb-2`}>
            Password and Security
          </h2>
          <Button variant="link">Change your CarAlert password</Button>
        </div>
      </div>
    </>
  );
};

export default SettingsDrawer;
