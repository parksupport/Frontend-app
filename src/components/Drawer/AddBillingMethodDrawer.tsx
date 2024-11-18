// AddBillingMethodDrawer.tsx
import React, { useState } from "react";
import DrawerHeader from "./DrawerHeader";
import InputField from "../InputField";
import Button from "../Buttons";
import { groteskText, groteskTextMedium } from "@/app/fonts";
import VisaIcon from "@/assets/svg/visa.svg"; // Replace with actual SVG imports
import MasterCardIcon from "@/assets/svg/mastercard.svg";
import AmexIcon from "@/assets/svg/amex.svg";
import DiscoverIcon from "@/assets/svg/discover.svg";
import DinersIcon from "@/assets/svg/diners.svg";

const AddBillingMethodDrawer = ({back, toggleDrawer }) => {
  const [formData, setFormData] = useState({
    cardNumber: "",
    firstName: "",
    lastName: "",
    expirationMonth: "",
    expirationYear: "",
    securityCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Save billing information logic
    alert("Payment card saved");
    toggleDrawer();
  };

  return (
    <>
      <DrawerHeader
        toggleDrawer={back}
        title="Add Billing Method"
        className="text-[24px]"
      />
      <div className="px-4 mt-4">
        <h2
          className={`${groteskTextMedium.className} text-[20px] mb-4`}
        >
          Payment card information
        </h2>
        <div className="flex space-x-2 mb-4">
          <VisaIcon />
          <MasterCardIcon />
          <AmexIcon />
          <DiscoverIcon />
          <DinersIcon />
        </div>
        <form>
          <InputField
            type="text"
            placeholder="1234 5678 9012 3456"
            label="Card Number"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            variant="individual"
            className={`w-full ${groteskText.className}`}
          />
          <div className="flex space-x-4">
            <InputField
              type="text"
              placeholder="First Name"
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              variant="individual"
              className={`w-1/2 ${groteskText.className}`}
            />
            <InputField
              type="text"
              placeholder="Last Name"
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              variant="individual"
              className={`w-1/2 ${groteskText.className}`}
            />
          </div>
          <div className="flex space-x-4">
            <InputField
              type="text"
              placeholder="MM"
              label="Expiration Month"
              name="expirationMonth"
              value={formData.expirationMonth}
              onChange={handleChange}
              variant="individual"
              className={`w-1/2 ${groteskText.className}`}
            />
            <InputField
              type="text"
              placeholder="YYYY"
              label="Expiration Year"
              name="expirationYear"
              value={formData.expirationYear}
              onChange={handleChange}
              variant="individual"
              className={`w-1/2 ${groteskText.className}`}
            />
          </div>
          <InputField
            type="text"
            placeholder="CVV"
            label="Security Code"
            name="securityCode"
            value={formData.securityCode}
            onChange={handleChange}
            variant="individual"
            className={`w-full ${groteskText.className}`}
          />
          <div className="flex space-x-4 mt-4">
            <Button variant="quinary" onClick={handleSave}>
              Save
            </Button>
            <Button variant="secondary" onClick={toggleDrawer}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddBillingMethodDrawer;
