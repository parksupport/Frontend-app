// SettingsDrawer.tsx
import React, { useState } from "react";
import DrawerHeader from "./DrawerHeader";
import { groteskText, groteskTextMedium } from "@/app/fonts";
import Button from "../Buttons";
import PlusButtonSVG from '@/assets/svg/normal.svg'
import { Switch } from "@/components/ui/switch"
import InputField from "../InputField";
import { useRouter } from "next/navigation";
import ModalComponent from "../ModalComponent";
import { useDisclosure } from "@chakra-ui/react";


    const SettingsDrawer = ({ toggleDrawer, openAddBillingMethod,  }) => {
      const { isOpen, onOpen, onClose } = useDisclosure()

  const [smsNotifications, setSmsNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [isPopup, setIsPopup] = useState(false)
  const router = useRouter()

  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleSubcription =()=> {
    console.log('subscribed')
  }





  return (
    <div className="mt-[70px]">
      <DrawerHeader
        toggleDrawer={toggleDrawer}

        title="Settings"
        subTitle="Welcome to the Settings page, where you can customize and manage your account preferences, notification settings, and vehicle management features."
      />
            <ModalComponent isOpen={isOpen} onClose={onClose} onOpen={onOpen} toggleDrawer={toggleDrawer} />

      <div className="px-4 mt-[3rem]">
        {/* My Vehicles Settings */}
        <div className="mt-[40px]">
      
       <h2 className={`${groteskTextMedium.className} text-[#000000] text-[28px] `}>
            My Vehicles Settings
          </h2>
         
<div className="flex gap-2 items-center ">
  
<Button variant="link" style={{ color: '#000000' }} className={`${groteskText.className}  text-[#000000] text-[24px] `}>Add a third-party nominee</Button>
          <PlusButtonSVG />
</div>
        </div>
        {/* Billing and Payment */}
        <div className="mt-[40px]">
          <h2 className={`${groteskTextMedium.className} text-[#000000] text-[28px]`}>
            Billing and Payment
          </h2>
          <p className={`${groteskText.className}  text-[#667185] text-[18px] `}>Add, update, or remove your billing methods.</p>
      <div className="flex gap-2 items-center mt-[1rem]">
      <Button variant="link"  className={`${groteskText.className}  text-[#000000] text-[24px] `}>
            Add payment method
          </Button>
          <PlusButtonSVG onClick={openAddBillingMethod} />
      </div>
        </div>
        {/* Notification Settings */}
        <div className="mt-[40px]">
          <h2 className={`${groteskTextMedium.className} text-[#000000] text-[28px]`}>
            Notification Settings
          </h2>
          <p className={`${groteskText.className}  text-[#667185] text-[18px] `}>Choose how you want receive your notification</p>

          <div className="flex items-center gap-[3rem]">
          <div className="flex items-center gap-[1rem]">
            <label className={`text-[24px] text-[#000000] ${groteskText.className} `}>Sms</label>
            <Switch />

            {/* <input
              type="checkbox"
              checked={smsNotifications}
              onChange={() => setSmsNotifications(!smsNotifications)}
            /> */}
          </div>
          <div className="flex items-center gap-[1rem] ">
            <label className={`text-[24px] text-[#000000] ${groteskText.className} `}>Email </label>
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
      <h2 className={`${groteskTextMedium.className} text-[#000000] text-[28px]`}>
            Subscription
          </h2>
          <div className="cursor-pointer" >
          <PlusButtonSVG  onClick={onOpen}/>
          </div>
      </div>

        <div className="mt-[40px] ">
          <h2 className={`${groteskTextMedium.className} text-[#000000] text-[28px]`}>
            Password and Security
          </h2>
          <p className={`${groteskText.className}  text-[#667185] text-[18px] `}>You can change your password</p>

          <div className="mt-[1rem]">
            <p className={`${groteskText.className}  text-[#000000] text-[24px] `}>You`ve set an CarAlert password <a href="" className={`${groteskText.className} underline ml-[10px] text-[#4169E1] text-[24px] `}>Change password</a></p> 
          </div>
        </div>
        <form action="">
        <InputField
              type="text"
              name="newPassword"
              label="New Password"
              placeholder="Enter new password"
              value={formData.newPassword}
              onChange={handleChange}
              className="py-4 md:py-3 w-[400px]"
            />

<InputField
              type="text"
              name="confirmpassword"
              label="Confirm Password"
              placeholder="Enter new password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="py-4 md:py-3 w-[400px]"
              
            />

        </form>
       
       </div>
    </div>
  );
};

export default SettingsDrawer;
