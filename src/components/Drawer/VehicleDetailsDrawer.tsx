import React, { useState } from "react";
import InputField from "../InputField";
import { groteskText } from "@/app/fonts";
import Button from "../Buttons";
import { IoMdCheckmark } from "react-icons/io";
import { GrDocumentDownload } from "react-icons/gr";
import DrawerHeader from "./DrawerHeader";

const VehicleDetailsDrawer = ({ toggleDrawer }) => {
  console.log(toggleDrawer + "toood");
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
      <DrawerHeader
        toggleDrawer={toggleDrawer}
        title="Add Your Vehicle Details"
        subTitle="Let’s get your vehicle set up for tracking contraventions and staying on top of payments."
      />
      <form onSubmit={handleSubmit} className="pt-12">
        <div className="flex flex-col gap-4 items-center ">
          <div className="flex flex-col items-center">
            <InputField
              type="text"
              placeholder="Enter your vehicle registration number"
              label="Vehicle Registration Number"
              name="vegRegNumber"
              value={formData.vegRegNumber}
              onChange={handleChange}
              variant="individual"
              className={`  ${groteskText.className} w-[63%] `}
            />
            <p
              className={`text-[12px] text-[#98A2B3] w-[63%]   ${groteskText.className} `}
            >
             {' We will use your registration number to pull any available contravention information and keep you updated'}
            </p>
          </div>
          <InputField
            type="text"
            placeholder="Enter your driver's license number"
            label="Driver's license number"
            name="license_number"
            value={formData.license_number}
            onChange={handleChange}
            variant="individual"
            className={`  ${groteskText.className} w-[60%]  `}
          />
          <InputField
            type="text"
            placeholder="Enter your car model"
            label="Car Model"
            name="car_model"
            value={formData.car_model}
            onChange={handleChange}
            variant="individual"
            className={`  ${groteskText.className} w-[60%]  `}
          />
          <InputField
            type="text"
            placeholder="Color"
            label="Enter your vehicle color"
            name="car_color"
            value={formData.car_color}
            onChange={handleChange}
            variant="individual"
            className={`  ${groteskText.className} pb-4 w-[60%] `}
          />
          <div className="w-[60%]">

          <div
            className="w-[60%] border border-dashed border-gray-400 p-4 flex flex-col items-center cursor-pointer"
            onClick={() => console.log("clicked")}
          >
            <GrDocumentDownload size={50} color="#4169E1" />
            <p className="text-[28px]">CSV and XLS</p>
            <p className="text-[22px]">Click to browse</p>
          </div>

          <div className="cursor-pointer text-[#039BB7] underline self-start mt-2">
            Download CSV template
          </div>
            </div>

          <Button
            type="submit"
            variant="quinary"
            className=" py-[10px] px-[12px] w-[60%]  "
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
