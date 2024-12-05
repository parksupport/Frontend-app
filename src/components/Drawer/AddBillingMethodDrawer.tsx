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
import Card from '@/assets/svg/card.svg'
import IconRight from '@/assets/svg/iconRight.svg'
import IconCode from '@/assets/svg/securitycode.svg'
import { CircleHelp } from "lucide-react";


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
        title="Billing and Method"
        subTitle="Add, update, or remove your billing methods."
        
      />

      <div className="rounded-[1rem] border border-[#D0D5DD] py-[20px] px-[17px] mt-[48px]">
     <div className="flex  justify-between">
     <h2
          className={`${groteskTextMedium.className} text-[1.75rem] text-[#000000] `}
        >
          Add a billing methods
        </h2>
        <button className={` ${groteskText.className} border border-[#4169E1] rounded-[8px] w-[77px] h-[36px] text-[#000000] text-[20px] `}>Cancel</button>
     </div>
     <div className="flex items-center mt-[20px]">
      <h2  className={`${groteskTextMedium.className} text-[1.25rem] text-[#000000] `}>Payment card <span  className={`${groteskText.className} text-[14px] text-[#667185] `}>Visa, Mastercard, American express, Express, Diners</span>
      </h2>
      
      
     </div>

 <div className="flex justify-between items-center mt-[77px]">
  <h2 className={`text-[#000000] text-[16px] ${groteskText.className}`}>Card number</h2>
 <div className="flex space-x-2">
          <VisaIcon />
          <MasterCardIcon />
          <AmexIcon />
          <DiscoverIcon />
          <DinersIcon />
        </div>
 </div>
       
        <form>

        <InputField
            type="text"
            placeholder="1234 5678 9012 3456"
            // label="Card Number"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            variant="individual"
            className="w-full"
            iconLeft={<Card />} // Pass the icon here
            iconRight={<IconRight />}
            textRight="Securely stored"
          />
        
          <div className="flex space-x-4 mt-[20px]">
       
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
          <div className="flex space-x-4 mt-[20px]">
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
          <div className="flex items-center gap-[8px] mt-[20px]">
        <h2 className={`text-[#000000] text-[16px] ${groteskText.className}`}>Security code</h2>
        <CircleHelp />
        </div>
        <div className=" flex items-center justify-between">
     


        <InputField
            type="text"
            placeholder="CVV"
            // label="Security Code"
            name="securityCode"
            value={formData.securityCode}
            onChange={handleChange}
            variant="individual"
            className={`w-[318px] ${groteskText.className}`}
          />
            <div className="flex  ">
            <Button style={{width: 77, height: 36, padding: 0}} variant="quinary" onClick={handleSave} className="w-full">
              Save
            </Button>
            {/* <Button variant="secondary" onClick={toggleDrawer}>
              Cancel
            </Button> */}
          </div>
        </div>
        
        </form>
      </div>
    </>
  );
};

export default AddBillingMethodDrawer;
