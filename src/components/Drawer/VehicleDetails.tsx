import React, { useState } from "react";
import InputField from "../InputField";
import { groteskText } from "@/app/fonts";
import Button from "../Buttons";
import { IoMdCheckmark } from "react-icons/io";
import DrawerHeader from "./DrawerHeader";

const VehicleDetailsDrawer = ({ toggleDrawer }) => {
    console.log(toggleDrawer + "toood")
  const [formData, setFormData] = useState({
    vegRegNumber: "",
    license_number: "",
    car_model: "",
    car_color: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // login(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };



  return (
    <div>
        <DrawerHeader toggleDrawer={toggleDrawer} title="Add Your Vehicle Details" subTitle="Let’s get your vehicle set up for tracking contraventions and staying on top of payments."/>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 px-[161px]">
            <div className="flex flex-col gap-1">
          <InputField
            type="text"
            placeholder="Enter your vehicle registration number"
            label="Vehicle Registration Number"
            name="vegRegNumber"
            value={formData.vegRegNumber}
            onChange={handleChange}
            variant="individual"
            className={`  ${groteskText.className} `}
          />
          <p className={`text-[12px] text-[#98A2B3]  ${groteskText.className} `}>We'll use your registration number to pull any available contravention 
          information and keep you updated</p>
          </div>
          <InputField
            type="text"
            placeholder="Enter your driver's license number"
            label="Driver's license number"
            name="license_number"
            value={formData.license_number}
            onChange={handleChange}
            variant="individual"
            className={`  ${groteskText.className} `}
          />
          <InputField
            type="text"
            placeholder="Enter your car model"
            label="Car Model"
            name="car_model"
            value={formData.car_model}
            onChange={handleChange}
            variant="individual"
            className={`  ${groteskText.className} `}
          />
          <InputField
            type="text"
            placeholder="Color"
            label="Enter your vehicle color"
            name="car_color"
            value={formData.car_color}
            onChange={handleChange}
            variant="individual"
            className={`  ${groteskText.className} pb-2 `}
          />
     
            <Button
              type="submit"
              variant="quinary"
              className=" py-[10px] px-[12px] w-full"
              icon={<IoMdCheckmark size={25} />}
              iconPosition="right"
            >
              Save Vehicle
            </Button>
        
        </div>
      </form>
    </div>
  );
};

export default VehicleDetailsDrawer;
